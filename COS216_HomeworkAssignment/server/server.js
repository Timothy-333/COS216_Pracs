const WebSocket = require('ws');
const readline = require('readline');
const e = require('cors');
const { time, clear } = require('console');
const { getEnvironmentData } = require('worker_threads');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const rl = readline.createInterface(
{
    input: process.stdin,
    output: process.stdout
});

function isPortReserved(port) 
{
    return port <= 1023 || port >= 49152;
}
function promptForPort() 
{
    return new Promise((resolve) => 
    {
        rl.question('Enter the port number (1024-49151): ', (port) =>
        {
            port = parseInt(port);
            if (isNaN(port) || isPortReserved(port)) 
            {
                console.log('Invalid port number. Please choose a valid port.');
                promptForPort().then(resolve);
            } 
            else 
            {
                resolve(port);
            }
        });
    });
}
const timers = new Map();
const guessTimer = new Map();
let nextSocketId = 0;
function createServer(port) 
{
    const wss = new WebSocket.Server({ port });
    wss.on('error', (err) =>
    {
        if (err.code === 'EADDRINUSE') 
        {
            console.log(`Port ${port} is already in use.`);
            promptForPort().then(async (port) => 
            {
                createServer(port);
            });
        }
        else 
        {
            console.log(err);
        }
    });
    const clients = new Map();
    const games = new Map();
    wss.on('connection', (ws) =>
    {
        const socketId = nextSocketId;
        let username = "";
        let userGame;
        ws.on('message', (message) =>
        {
            try
            {
                message = JSON.parse(message);
                if(message.type == "username")
                {
                    let usernameExists = false;
                    username = message.username;
                    clients.forEach((client) =>
                    {
                        if(client.username == username)
                        {
                            usernameExists = true;
                        }
                    });
                    if(!usernameExists)
                    {
                        const socketId = nextSocketId++;
                        clients.set(socketId, {ws, username});
                        console.log(`Player ${username} Connected`);
                        ws.send(JSON.stringify({type : "username", username : "accepted"}));
                    }
                    else
                    {
                        ws.send(JSON.stringify({type : "username", username : "taken"}));
                        ws.close();
                    }
                }
                else if(message.type == "create")
                {
                    const code = generateRandomCode();
                    games.set(code, {players : [{player : clients.get(socketId), score : 0}], code, brands : [], currentBrand : 0});
                    userGame = games.get(code);
                    timers.set(code, 6);
                    ws.send(JSON.stringify({type : "create", code}));
                    updateLobby(games.get(code), clients.get(socketId), true);
                }
                else if(message.type == "join")
                {
                    let gameExists = false;
                    games.forEach((game) =>
                    {
                        if(game.code == message.code)
                        {
                            gameExists = true;
                        }
                    });
                    if(gameExists)
                    {
                        if(games.get(message.code).players.length >= 4)
                        {
                            ws.send(JSON.stringify({type : "join", code : "full"}));
                            return;
                        }
                        if(timers.get(message.code) <= 5)
                        {
                            ws.send(JSON.stringify({type : "join", code : "started"}));
                            return;
                        }
                        ws.send(JSON.stringify({type : "join", code : message.code}));
                        games.forEach((game) =>
                        {
                            if(game.code == message.code)
                            {
                                game.players.push({player : clients.get(socketId), score : 0});
                                userGame = game;
                                updateLobby(game, clients.get(socketId), true);
                            }
                        });
                    }
                    else
                    {
                        ws.send(JSON.stringify({type : "join", code : "invalid"}));
                    }
                }
                else if(message.type == "start")
                {
                    userGame.players.forEach((player) =>
                    {
                        player.player.ws.send(JSON.stringify({type : "start"}));
                    });
                    getBrands(userGame);
                    timer(5, userGame);
                }
                else if(message.type == "leave")
                {
                    if(userGame != undefined)
                    {
                        userGame.players.forEach((player) =>
                        {
                            if(player.player.username == username)
                            {
                                userGame.players.splice(userGame.players.indexOf(player), 1);
                            }
                        });
                        if(userGame.players.length == 0)
                        {
                            games.delete(userGame.code);
                            timers.delete(userGame.code);
                        }
                        else
                        {
                            updateLobby(userGame, clients.get(socketId), false);
                        }
                    }
                }
                else if(message.type == "chat")
                {
                    userGame.players.forEach((player) =>
                    {
                        player.player.ws.send(JSON.stringify({type : "chat", username:username, message:message.message}));
                    });
                }
                else if(message.type == "guess")
                {
                    if(message.guess == undefined || message.guess == null || message.guess == "" || timers.get(userGame.code) == undefined || timers.get(userGame.code) > 0)
                    {
                        return;
                    }
                    currentBrand = userGame.currentBrand;
                    brands = userGame.brands;
                    brandName = brands[currentBrand].brand;
                    if(message.guess == brandName)
                    {
                        userGame.players.forEach((player) =>
                        {
                            if(player.player.username == username)
                            {
                                player.score++;
                            }
                        });
                        userGame.currentBrand++;
                        userGame.players.forEach((player) =>
                        {
                            player.player.ws.send(JSON.stringify({type : "guess", correct:true, username:username, correctBrand:brandName, time:guessTimer.get(userGame.code)}));
                        });
                        if(userGame.currentBrand >= userGame.brands.length)
                        {
                            var highestScore = 0;
                            winner = "";
                            userGame.players.forEach((player) =>
                            {
                                if(player.score > highestScore)
                                {
                                    highestScore = player.score;
                                }
                            });
                            userGame.players.forEach((player) =>
                            {
                                if(player.score == highestScore)
                                {
                                    winner += player.player.username + " and ";
                                }
                            });
                            winner = winner.substring(0, winner.length - 4);
                            winner += " won the game with a score of " + highestScore + " points!";
                            userGame.players.forEach((player) =>
                            {
                                player.player.ws.send(JSON.stringify({type : "end" , winner : winner}));
                            });
                            timers.set(userGame.code, 6);
                            userGame.currentBrand = 0;
                        }
                        else
                        {
                            timer(5, userGame);
                        }
                    }
                    else
                    {
                        ws.send(JSON.stringify({type : "guess", correct:false}));
                    }
                }
            }
            catch(err)
            {
                console.log(err);
            }
        });
        ws.on('error', (err) =>
        {
            console.log(err);
        });
        ws.on('close', () => 
        {
            if(userGame != undefined)
            {
                userGame.players.forEach((player) =>
                {
                    if(player.player.username == username)
                    {
                        userGame.players.splice(userGame.players.indexOf(player), 1);
                    }
                });
                if(userGame.players.length == 0)
                {
                    games.delete(userGame.code);
                    timers.delete(userGame.code);
                }
                else
                {
                    updateLobby(userGame, clients.get(socketId), false);
                }
            }
            console.log(`Player ${username} Disconnected`);
            clients.delete(socketId);
        });
    });
    rl.on('line', (input) => 
    {
        const [command, ...args] = input.trim().split(' ');
        handleCommand(command, args);
    });
    function handleCommand(command, args) 
    {
        if (command === 'kill') 
        {
            const username = args[0];
            kill(username);
        }
        else if (command === 'list') 
        {
            list();
        } 
        else if (command === 'quit')
        {
            quit();
        }
        else if (command === 'games')
        {
            listgames();
        }
        else 
        {
            console.log('Unknown command.');
        }
    }
    function kill(username)
    {
        if(username == undefined || username == null || username == "")
        {
            console.log("Please enter a username next time!");
            return;
        }
        clients.forEach((client) =>
        {
            if(client.username == username)
            {
                client.ws.send(JSON.stringify({type : "quit", message : "You have been kicked from the server"}));
                console.log(username + " fought valiantly, but was slain in battle");
                client.ws.close();
                return;
            }
        });
    }
    function list()
    {
        console.log("Players:");
        for(const [key, value] of clients)
        {
            console.log("\tClient: " + value.username + " Socket ID: " + key);
        }
    }
    function quit()
    {
        clients.forEach((client) =>
        {
            client.ws.send(JSON.stringify({type : "quit", message : "Server is shutting down"}));
            client.ws.close();
        });
        process.exit();
    }
    function listgames()
    {
        console.log("Games:");
        games.forEach((game) =>
        {
            console.log("Game Code: " + game.code);
            game.players.forEach((player) =>
            {
                console.log("\tPlayer: " + player.player.username);
            });
        });
    }
    console.log(`Server started and listening on port ${port}`);
}
function generateRandomCode()
{
    let code = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < 10; i++)
    {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}
function updateLobby(game, newPlayer, joined) 
{
    const out = 
    {
        type: "updateLobby",
        players: [],
        joined: joined,
        player: newPlayer.username
    };
    game.players.forEach((playerObj) => 
    {
        out.players.push(playerObj.player.username);
    });
    game.players.forEach((playerObj) => 
    {
        playerObj.player.ws.send(JSON.stringify(out));
    });
}
function timer(time, game)
{
    timers.set(game.code, time);
    var interval = setInterval(() =>
    {
        timers.set(game.code, timers.get(game.code) - 1);
        if(timers.get(game.code) <= 0)
        {
            clearInterval(interval);
            guessTimerFunc(game);
            game.players.forEach((player) =>
            {
                player.player.ws.send(JSON.stringify({type : "brand", brand : game.brands[game.currentBrand].image}));
            });
        }
    }, 1000);
}
var interval2;
function guessTimerFunc(game)
{
    clearInterval(interval2);
    guessTimer.set(game.code, 0);
    interval2 = setInterval(() =>
    {
        guessTimer.set(game.code, guessTimer.get(game.code) + 1);
        if(guessTimer.get(game.code) >= 30)
        {
            clearInterval(interval2);
        }
    }, 1000);
}
function getBrands(game)
{
    var req = new XMLHttpRequest();
    req.open("POST", "https://wheatley.cs.up.ac.za/u22744968/brandsApi.php", true);
    var username = process.env.COS216_USERNAME;
    var password = process.env.COS216_PASSWORD;
    var authHeader = "Basic " + btoa(username + ":" + password);
    req.setRequestHeader("Authorization", authHeader);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var curBrands = JSON.parse(this.responseText);
            game.brands = curBrands;
            return curBrands;
        }
        else
        {
        }
    }
    var data = 
    {
        "type" : "GetRandomBrands"
    }
    req.send(JSON.stringify(data));
}
promptForPort().then((port) => 
{
    createServer(port);
});