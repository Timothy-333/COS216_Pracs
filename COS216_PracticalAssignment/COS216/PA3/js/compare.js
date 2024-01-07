//Timothy_Whitaker_u22744968
//Used Asynchronous request to get all models as they are called multiple times and this is the fastest solution
var sortBy = "make";
var orderBy = "ASC";
var searchInputs = ["", "", "", "", "", "", "", "", "", ""];
function setCar(make, model, year_from, transmission,body_type, max_speed_km_per_h, engine_type, number_of_cylinders, drive_wheels, number_of_seats, search, image)
{
    var car = document.getElementById("car" + search);
    car.innerHTML = "";
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
    carImg.setAttribute("alt", model + " " + make);
    car.appendChild(carImg);

    if(image != undefined)
    {
        carImg.setAttribute("src", image);
    }
}
function fillSearch(make, model, search, id_trim, image)
{
    var popUpBar = document.getElementById("popUpBar" + search);
    popUpBar.style.display = "";
    var popUp = document.createElement("div");
    popUp.setAttribute("class", "popUp");
    popUp.setAttribute("id", id_trim);
    popUpBar.appendChild(popUp);
    document.getElementById(id_trim).addEventListener("click", function()
    {
        getCar(this.id, search);
        clearPopUp(search);
    });
    var carDetails = document.createElement("div");
    carDetails.setAttribute("class", "carDetails");
    popUp.appendChild(carDetails);
    var carMake = document.createElement("h1");
    carMake.setAttribute("class", "carMake");
    carDetails.appendChild(carMake);
    carMake.innerHTML = make + " " + model;
    var carImg = document.createElement("img");
    carImg.setAttribute("class", "carImg");
    carImg.setAttribute("alt", model + " " + make);
    popUp.appendChild(carImg);
    if(image != undefined)
    {
        carImg.setAttribute("src", image);
    }
}
function getCar(id, search)
{
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
                        search,
                        cars.data[i].image
                    )
                }
            }
        }
    };
    var data = 
    {
        "studentnum": "u22744968",
        "type": "GetAllCars",
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "limit": 1,
        "sort": sortBy,
        "order": orderBy,
        "search": {"id_trim": id},
        "fuzzy": true,
        "return": 
        [
            "make", "model", "year_from", "transmission", "body_type", "max_speed_km_per_h", "engine_type", "number_of_cylinders", "drive_wheels", "number_of_seats", "id_trim", "image"
        ]
    };
    req.send(JSON.stringify(data));
}
function searchForCar(searchInputs, search)
{
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
                for(var i = 0; i < cars.data.length; i++)
                {
                    fillSearch(
                        cars.data[i].make,
                        cars.data[i].model,
                        search,
                        cars.data[i].id_trim,
                        cars.data[i].image
                    )
                }
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
    var data = 
    {
        "studentnum": "u22744968",
        "type": "GetAllCars",
        "apikey": "a9198b68355f78830054c31a39916b7f",
        "limit": 40,
        "sort": sortBy,
        "order": orderBy,
        "fuzzy": "true",
        "return": 
        [
            "make", "model", "id_trim", "image"
        ]
    };
    if(Object.keys(searches).length > 0)
        data.search = searches;
    req.send(JSON.stringify(data));
}
function clearPopUp(search)
{
    document.getElementById("popUpBar" + search).innerHTML = "";
    document.getElementById("popUpBar" + search).style.display = "none";
}
function search1(search)
{
    console.log("search1");
    var input = document.getElementById("searchInput" + search).value;
    if(input == "")
    {
        clearPopUp(search);
        return;
    }
    var inputs = input.split(" ");
    clearPopUp(search);
    searchInputs[0] = inputs[0];
    searchInputs[1] = "";
    if(inputs.length == 2)
        searchInputs[1] = inputs[1];
    searchForCar(searchInputs, search);
}
// document.getElementById("create").addEventListener("keyDown", function(e)
// {
//     var wrapper = document.getElementById("wrapper3");
//     var form = document.createElement("form");
//     form.setAttribute("id", "createCar");
// });
