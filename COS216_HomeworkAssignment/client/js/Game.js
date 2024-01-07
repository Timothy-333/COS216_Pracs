$(document).ready(function() 
{
    $("#createUser").on("submit",function(event)
    {
        event.preventDefault();
        let username = $("#username").val();
        if(username == "")
        {
            return;
        }
        else if(username.length > 10)
        {
            username = username.substring(0, 10);
            document.getElementById("username").value = username;
        }
        establishConnection(username);
    });
    $("#usernameScreen").show();
    $("#gameScreen").hide();
    $("#createScreen").hide();
});
let socket;
var playerUsername = "";
var sessionStarted = false;
function establishConnection(username)
{
    socket = new WebSocket('ws://localhost:3000');
    socket.onopen = function()
    {
        console.log('Connection Established');
        send({type : "username", username : username});
    }
    socket.onmessage = function(e)
    {
        e = JSON.parse(e.data);
        if(e.type == "username" && e.username == "taken")
        {
            console.log("Username Taken");
            document.getElementById("username").value = "";
            $("#usernameTakenAlert").show();
        }
        else if(e.type == "username" && e.username == "accepted")
        {
            console.log("Username Accepted");
            playerUsername = document.getElementById("username").value;
            console.log(username);
            sessionStarted = true;
            goToCreate();
        }
        else if(e.type == "create")
        {
            console.log("Game Created");
            code = e.code;
            goToLobby();
        }
        else if(e.type == "join")
        {
            if(e.code == "invalid")
            {
                $("#gameFullAlert").hide();
                $("#gameStartedAlert").hide();
                $("#invalidCodeAlert").show();
            }
            else if(e.code == "full")
            {
                $("#invalidCodeAlert").hide();
                $("#gameStartedAlert").hide();
                $("#gameFullAlert").show();
            }
            else if(e.code == "started")
            {
                $("#invalidCodeAlert").hide();
                $("#gameFullAlert").hide();
                $("#gameStartedAlert").show();
            }
            else
            {
                console.log("Game Joined");
                code = e.code;
                goToLobby();
            }
        }
        else if(e.type == "updateLobby")
        {
            $("#players-list").empty();
            e.players.forEach((player) =>
            {
                $("#players-list").append(`<div class="col-12"><h5 class="text-center">`+player+`</h5></div>`);
            });
            if(!e.joined)
            {
                $("#chat-messages").append(`<div class="col-12"><h5 class="text-center">`+e.player+` has left the lobby</h5></div>`);
            }
            else if(e.joined)
            {
                $("#chat-messages").append(`<div class="col-12"><h5 class="text-center">`+e.player+` has joined the lobby</h5></div>`);
            }
        }
        else if(e.type == "chat")
        {
            $("#chat-messages").append(`<div class="col-12"><h5 class="text-center">`+e.username+` : `+e.message+`</h5></div>`);
            const chatMessages = document.getElementById("chat-messages");
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        else if(e.type == "start")
        {
            goToStart();
        }
        else if(e.type == "brand")
        {
            setBrand(e.brand);
        }
        else if(e.type == "guess")
        {
            if(e.correct)
            {
                $("#chat-messages").append(`<div class="col-12"><h5 class="text-center">`+e.username+` has guessed the brand correctly in `+ (e.time >= 30 ? `over 30 seconds!` : e.time + ` seconds!`)  +`\n Answer: ` + e.correctBrand + `</h5></div>`);
                $("#invalidGuessAlert").hide();
                if(e.username == playerUsername)
                {
                    $("#correctGuessAlert").show();
                }
                timer(5);
            }
            else
            {
                $("#correctGuessAlert").hide();
                $("#invalidGuessAlert").show();
            }
        }
        else if(e.type == "end")
        {
            $("#chat-messages").append(`<div class="col-12 alert alert-success" role = "alert"><h5 class="text-center">`+e.winner+`</h5></div>`);
            $("#correctGuessAlert").hide();
            $("#invalidGuessAlert").hide();
            $("#timer").hide();
            $("#brandImage").attr("src", "");
            goToLobby();
        }
        else
        {
            console.log(e);
        }
    }
    socket.onclose = function()
    {
        if(sessionStarted)
        {
            alert("Connection Closed");
            location.reload();
        }
    }
    socket.onerror = function()
    {
        console.log('Error Occured');
    }
    function send(message)
    {
        socket.send(JSON.stringify(message));
    }
}
function goToCreate()
{
    document.getElementById("content").setAttribute("class", "container-fluid");
    $("#chat-messages").empty();
    $("#usernameScreen").hide();
    $("#gameScreen").hide();
    $("#createScreen").show();
    $("#welcome").text("Welcome "+playerUsername+"!");
    $("#create").off("click");
    $("#joinForm").off("submit");
    $("#create").click(function()
    {
        socket.send(JSON.stringify({type : "create"}));
    });
    $("#joinForm").on("submit",function(e)
    {
        e.preventDefault();
        socket.send(JSON.stringify({type : "join", code : $("#joinCode").val()}));
    });
}
function goToLobby()
{
    $("#usernameScreen").hide();
    $("#createScreen").hide();
    $("#timer").hide();
    $("#brandImage").attr("src", "img/Glasses.png");
    $("#gameScreen").show();
    $("#startContent").show();
    $("#welcome1").text("Welcome "+playerUsername+"!");
    $("#gameCode").text("Code : "+code);
    $("#startBtn").off("click");
    $("#leave").off("click");
    $("#chat-form").off("submit");
    $("#startBtn").click(function()
    {
        socket.send(JSON.stringify({type : "start"}));
    });
    $("#leave").click(function()
    {
        socket.send(JSON.stringify({type : "leave"}));
        goToCreate();
    });
    $("#chat-form").submit(function(event)
    {
        event.preventDefault();
        if($("#chat-input").val() != "")
        {
            socket.send(JSON.stringify({type : "chat", message : $("#chat-input").val()}));
        }
        $("#chat-input").val("");
    });
}
function goToStart()
{
    $("#startContent").hide();
    $("#brand_guess").off("submit");
    $("#brand_guess").on("submit",function(event)
    {
        event.preventDefault();
        socket.send(JSON.stringify({type : "guess", guess : $("#guess_text").val()}));
    });
    timer(5);
}
function timer(time)
{
    var timer = time;
    $("#timer").show();
    $("#timer").text(timer);
    var interval = setInterval(function()
    {
        timer--;
        $("#timer").text(timer);
        if(timer <= 0)
        {
            clearInterval(interval);
            $("#timer").text("0");
        }
    }, 1000);
}
function setBrand(brandImage)
{
    var brand = new Image();
    brand.onload = function()
    {
        document.getElementById("brandImage").src = brand.src;
    }
    brand.src = brandImage;
}