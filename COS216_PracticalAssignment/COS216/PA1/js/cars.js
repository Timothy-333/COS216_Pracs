//Timothy_Whitaker_u22744968
window.onload = function()
{
    getCars();

    var content = document.getElementById("carContent");
    function setCar(make, model, year_from, transmission,body_type, max_speed_km_per_h, engine_type, number_of_cylinders, drive_wheels)
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
    function getCars()
    {
        var req = new XMLHttpRequest();
        req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
        var cars;
        req.onreadystatechange = function()
        {
            if (req.readyState == 4 && req.status == 200)
            {
                cars = JSON.parse(req.responseText);
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
                    )
                }
            }
        };
        var data = 
        {
            "studentnum": "u22744968",
            "type": "GetAllCars",
            "apikey": "a9198b68355f78830054c31a39916b7f",
            "limit": 50,
            "sort": "year_from",
            "order": "DESC",
            "fuzzy": "true",
            "return": 
            [
                "make", "model", "year_from", "transmission", "body_type", "max_speed_km_per_h", "engine_type", "number_of_cylinders", "drive_wheels",
            ]
        };
        req.send(JSON.stringify(data));
    }
    function getCar(car)
    {
        var req = new XMLHttpRequest();
        req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
        var cars;
        req.onreadystatechange = function()
        {
            if (req.readyState == 4 && req.status == 200)
            {
                cars = JSON.parse(req.responseText);
                for(var i = 0; i < cars.data.length; i++)
                {
                    console.log(cars.data[i].make);
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
                    )
                }
            }
        };
        var data = 
        {
            "studentnum": "u22744968",
            "type": "GetAllCars",
            "apikey": "a9198b68355f78830054c31a39916b7f",
            "limit": 50,
            "search": 
            {
                "make": car[0],
                "model": car[1],
                "year_from": car[2],
                "transmission": car[3],
                "body_type": car[4],
                "max_speed_km_per_h": car[5],
                "engine_type": car[6], 
                "number_of_cylinders": car[7],
                "drive_wheels": car[8],
            },
            "sort": "year_from",
            "order": "DESC",
            "fuzzy": "true",
            "return": 
            [
                "make", "model", "year_from", "transmission", "body_type", "max_speed_km_per_h", "engine_type", "number_of_cylinders", "drive_wheels",
            ]
        };
        req.send(JSON.stringify(data));
    }
    function clearCars()
    {
        var content = document.getElementById("carContent");
        content.innerHTML = "";
    }
    document.getElementById("search").addEventListener("submit", function(e)
    {
        e.preventDefault();
        clearCars();
        var input = document.getElementById("searchInput").value;
        var carSearch = ["", "", "", "", "", "", "", "", ""]
        var inputs = input.split(" ");
        if(input != "")
        {
            for(var i = 0; i < 9; i++)
            {
                carSearch[i] = inputs[0];
                getCar(carSearch);
                carSearch[i] = "";
            }
        }
        else
        {
            getCars();
        }
    }, false);
}