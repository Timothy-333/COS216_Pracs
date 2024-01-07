//Timothy_Whitaker_u22744968
//Used Asynchronous request to get all models as they are called multiple times and this is the fastest solution
window.onload = function()
{
    document.getElementById("loading").style.display = "none";
    var content = document.getElementById("carContent");
    var noCars = document.createElement("h1");
    noCars.setAttribute("class", "noCars");
    noCars.innerHTML = "No Cars Found";
    var sortBy = "make";
    var orderBy = "ASC";
    var searchInputs = ["", "", "", "", "", "", "", "", "", ""];
    var apikey = "a9198b68355f78830054c31a39916b7f";
    var loggedIn = false;
    if(getCookie("API_Key") != null)
    {
        loggedIn = true;
        apikey = getCookie("API_Key");
    }
    function setCar(make, model, year_from, transmission,body_type, max_speed_km_per_h, engine_type, number_of_cylinders, drive_wheels, number_of_seats, carImgUrl, id_trim)
    {
        var car = document.createElement("div");
        car.setAttribute("class", "car");
        content.appendChild(car);
        var carDetails = document.createElement("div");
        carDetails.setAttribute("class", "carDetails");
        car.appendChild(carDetails);
        var carMake = document.createElement("h1");
        carMake.setAttribute("class", "carMake");
        carDetails.appendChild(carMake);
        carMake.innerHTML = make + " " + model;
        carDetails.appendChild(document.createElement("br"));
        var carYear = document.createElement("h2");
        carYear.setAttribute("class", "carYear");
        carDetails.appendChild(carYear);
        carYear.innerHTML = "Year: " + year_from;
        var carTransmission = document.createElement("h2");
        carTransmission.setAttribute("class", "carTransmission");
        carDetails.appendChild(carTransmission);
        carTransmission.innerHTML = "Transmission: " + transmission;
        var carBodyType = document.createElement("h2");
        carBodyType.setAttribute("class", "carBodyType");
        carDetails.appendChild(carBodyType);
        carBodyType.innerHTML = "Body Type: " + body_type;
        var carMaxSpeed = document.createElement("h2");
        carMaxSpeed.setAttribute("class", "carMaxSpeed");
        carDetails.appendChild(carMaxSpeed);
        carMaxSpeed.innerHTML = "Max Speed: " + max_speed_km_per_h + "km/h";
        var carEngineType = document.createElement("h2");
        carEngineType.setAttribute("class", "carEngineType");
        carDetails.appendChild(carEngineType);
        carEngineType.innerHTML = "Engine Type: " + engine_type;
        var carCylinders = document.createElement("h2");
        carCylinders.setAttribute("class", "carCylinders");
        carDetails.appendChild(carCylinders);
        carCylinders.innerHTML = "Cylinders: " + number_of_cylinders;
        var carDriveWheels = document.createElement("h2");
        carDriveWheels.setAttribute("class", "carDriveWheels");
        carDetails.appendChild(carDriveWheels);
        carDriveWheels.innerHTML = "Drive Wheels: " + drive_wheels;
        var carSeats = document.createElement("h2");
        carSeats.setAttribute("class", "carSeats");
        carDetails.appendChild(carSeats);
        carSeats.innerHTML = "Seats: " + number_of_seats;
        var carImg = document.createElement("img");
        carImg.setAttribute("class", "carImg");
        carImg.setAttribute("alt", make + " " + model);
        if(carImgUrl != undefined)
        {
            carImg.setAttribute("src", carImgUrl);
        };
        car.appendChild(carImg);
        var container = document.createElement("div");
        container.setAttribute("class", "rating");
        container.setAttribute("id", "rating-container");
        carDetails.appendChild(container);
        updateRating("get", 0, id_trim, container);
    }
    function searchForCar(searchInputs)
    {
        document.getElementById("loading").style.display = "";
        var req = new XMLHttpRequest();
        req.open("POST", "https://wheatley.cs.up.ac.za/u22744968/api.php", true);
        var cars;
        req.onreadystatechange = function()
        {
            if (req.readyState == 4 && req.status == 200)
            {
                cars = JSON.parse(req.responseText);
                if(cars.data[0] != undefined)
                {
                    noCars.style.display = "none";
                    for(var i = 0; i < cars.data.length; i++)
                    {
                        setCar(
                            cars.data[i].make,
                            cars.data[i].model,
                            cars.data[i].year_from,
                            cars.data[i].transmission,
                            cars.data[i].body_type,
                            cars.data[i].max_speed_km_per_h,
                            cars.data[i].engine_type,
                            cars.data[i].number_of_cylinders,
                            cars.data[i].drive_wheels,
                            cars.data[i].number_of_seats,
                            cars.data[i].image,
                            cars.data[i].id_trim
                        )
                    }
                    document.getElementById("loading").style.display = "none";
                }
                else 
                {
                    document.getElementById("loading").style.display = "none";
                }
            }
        };
        var searches = {};
        if(searchInputs[0] != "")
            searches.make = searchInputs[0];
        if(searchInputs[1] != "")
            searches.model = searchInputs[1];
        if(searchInputs[2] != "")
            searches.year_from = searchInputs[2];
        if(searchInputs[3] != "")
            searches.transmission = searchInputs[3];
        if(searchInputs[4] != "")
            searches.body_type = searchInputs[4];
        if(searchInputs[5] != "")
            searches.max_speed_km_per_h = searchInputs[5];
        if(searchInputs[6] != "")
            searches.engine_type = searchInputs[6];
        if(searchInputs[7] != "")   
            searches.number_of_cylinders = searchInputs[7];
        if(searchInputs[8] != "")
            searches.drive_wheels = searchInputs[8];
        if(searchInputs[9] != "")
            searches.number_of_seats = searchInputs[9];
        var data = 
        {
            "type": "GetAllCars",
            "apikey": apikey,
            "limit": 8,
            "sort": sortBy,
            "order": orderBy,
            "fuzzy": true,
            "return": 
            [
                "make", "model", "year_from", "transmission", "body_type", "max_speed_km_per_h", "engine_type", "number_of_cylinders", "drive_wheels", "number_of_seats", "image", "id_trim"
            ]
        };
        if(Object.keys(searches).length > 0)
            data.search = searches;
        req.send(JSON.stringify(data));
    }
    async function updateRating(type, rating, id_trim, container)
    {
        var req = new XMLHttpRequest();
        req.open("POST", "https://wheatley.cs.up.ac.za/u22744968/api.php", true);
        req.onreadystatechange = function()
        {
            if (req.readyState == 4 && req.status == 200)
            {
                if(type == "get")
                {
                    var rating = JSON.parse(req.responseText).data;
                    if(rating != undefined)
                    {
                        var stars = [];
                        var prevIndex = -1;
                        for (var i = 0; i < 5; i++) 
                        {
                            var star = document.createElement("span");
                            star.classList.add("star");
                            star.innerHTML = "★";
                            stars.push(star);
                            container.appendChild(star);
                            star.classList.toggle("filled", i < Math.round(rating));
                            if(loggedIn) 
                            {
                                star.addEventListener("click", function(e) 
                                {
                                    var index = stars.indexOf(e.target);
                                    var rating = index + 1;
                                    var button = document.createElement("button");
                                    var button = container.querySelector('.rate'); // check if button already exists
                                    if (!button) 
                                    {
                                        button = document.createElement("button");
                                        button.classList.add("rate");
                                        button.innerHTML = "Rate";
                                        container.appendChild(button);
                                        button.addEventListener("click", function(e)
                                        {
                                            updateRating("set", rating, id_trim, container);
                                            container.removeChild(button);
                                            for (var i = 0; i < stars.length; i++)
                                            {
                                                stars[i].classList.toggle("rating", false);
                                            }
                                            alert("Thank you for rating this car (refresh to see changes)");
                                        });
                                    }
                                    if(index == prevIndex)
                                    {
                                        rating = 0;
                                        prevIndex = -1;
                                        container.removeChild(button);
                                    }
                                    else
                                    {
                                        prevIndex = index;
                                    }
                                    for (var i = 0; i < stars.length; i++)
                                    {
                                        stars[i].classList.toggle("rating", i < rating);
                                    }
                                });
                            }
                        }
                        var ratingValue = document.createElement("p");
                        ratingValue.setAttribute("class", "star");
                        ratingValue.innerHTML = rating + "/5"
                        container.appendChild(ratingValue);
                    }
                }
            }
        };
        var data =
        {
            "type": "rate",
            "reason": type,
            "apikey": apikey,
            "id_trim": id_trim,
            "rating": rating,
            "avg": true
        };
        req.send(JSON.stringify(data));
    }
    function clearCars()
    {
        content.innerHTML = "";
        content.appendChild(noCars);
        noCars.style.display = "";
    }
    function search()
    {
        clearCars();
        searchForCar(searchInputs);
    }
    document.getElementById("body_type").addEventListener("change", function(e)
    {
        searchInputs[4] = e.target.value;
    });
    document.getElementById("transmission").addEventListener("change", function(e)
    {
        searchInputs[3] = e.target.value;
    });
    document.getElementById("engine").addEventListener("change", function(e)
    {
        searchInputs[6] = e.target.value;
    });
    document.getElementById("cylinders").addEventListener("change", function(e)
    {
        searchInputs[7] = e.target.value;
    });
    document.getElementById("seats").addEventListener("change", function(e)
    {
        searchInputs[9] = e.target.value;
    });
    document.getElementById("wheels").addEventListener("change", function(e)
    {
        searchInputs[8] = e.target.value;
    });
    document.getElementById("submit").addEventListener("submit", function(e)
    {
        e.preventDefault();
        console.log("submit");
        search();
    },false);
    function getCookie(name) 
    {
        const cookieString = document.cookie;
        const cookies = cookieString.split(';');
        for(let i = 0; i < cookies.length; i++) 
        {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(name + '=')) 
          {
            return cookie.substring(name.length + 1);
          }
        }
        return null;
    }
}