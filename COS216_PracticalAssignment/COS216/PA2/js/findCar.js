//Timothy_Whitaker_u22744968
//Used Asynchronous request to get all models as they are called multiple times and this is the fastest solution
window.onload = function()
{
    document.getElementById("loading").style.display = "none";
    var content = document.getElementById("carContent");
    var sortBy = "make";
    var orderBy = "ASC";
    var searchInputs = ["", "", "", "", "", "", "", "", "", ""];
    function setCar(make, model, year_from, transmission,body_type, max_speed_km_per_h, engine_type, number_of_cylinders, drive_wheels, number_of_seats)
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
        carImg.setAttribute("alt", model + " " + make);
        car.appendChild(carImg);

        getImg(carImg, make, model);
    }
    function getImg(carImg, make, model)
    {
        var reqPhoto = new XMLHttpRequest();
        var url = new URL("https://wheatley.cs.up.ac.za/api/getimage");
        reqPhoto.onreadystatechange = function()
        {
            if (reqPhoto.readyState == 4 && reqPhoto.status == 200)
            {
                var photo = reqPhoto.responseText;
                carImg.setAttribute("src", photo);
            }
        };
        url.searchParams.append("brand", make);
        url.searchParams.append( "model", model);
        reqPhoto.open("GET", url, true);
        reqPhoto.send();
    }
    function searchForCar(searchInputs)
    {
        document.getElementById("loading").style.display = "";
        var req = new XMLHttpRequest();
        req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
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
                        )
                    }
                    document.getElementById("loading").style.display = "none";
                }
                else
                {
                    var noCars = document.createElement("h1");
                    noCars.setAttribute("class", "noCars");
                    noCars.innerHTML = "No cars found";
                    content.appendChild(noCars);
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
        var data = 
        {
            "studentnum": "u22744968",
            "type": "GetAllCars",
            "apikey": "a9198b68355f78830054c31a39916b7f",
            "limit": 8,
            "sort": sortBy,
            "order": orderBy,
            "fuzzy": "true",
            "return": 
            [
                "make", "model", "year_from", "transmission", "body_type", "max_speed_km_per_h", "engine_type", "number_of_cylinders", "drive_wheels", "number_of_seats"
            ]
        };
        if(Object.keys(searches).length > 0)
            data.search = searches;
        req.send(JSON.stringify(data));
    }
    function clearCars()
    {
        content.innerHTML = "";
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
}