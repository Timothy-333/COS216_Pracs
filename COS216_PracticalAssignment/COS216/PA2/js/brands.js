//Timothy_Whitaker_u22744968
//Used Asynchronous request to get all models as this is the fastest solution
window.onload = function()
{
    getBrands();
    var content = document.getElementById("brandContent");
    function setBrand(make)
    {
        var brand = document.createElement("div");
        brand.setAttribute("class", "brands");
        content.appendChild(brand);
        var brandName = document.createElement("h1");
        brand.appendChild(brandName);
        brandName.innerHTML = make;
        var brandImg = document.createElement("img");
        brandImg.setAttribute("class", "brandImg");
        brandImg.setAttribute("alt", make);
        brand.appendChild(brandImg);

        getImg(brandImg, make);
    }
    function getImg(brandImg, make)
    {
        var reqPhoto = new XMLHttpRequest();
        var url = new URL("https://wheatley.cs.up.ac.za/api/getimage");
        reqPhoto.onreadystatechange = function()
        {
            if (reqPhoto.readyState == 4 && reqPhoto.status == 200)
            {
                var photo = reqPhoto.responseText;
                brandImg.setAttribute("src", photo);
            }
        };
        url.searchParams.append("brand", make);
        reqPhoto.open("GET", url, true);
        reqPhoto.send();
    }
    function getBrands()
    {
        var req = new XMLHttpRequest();
        req.open("POST", "https://wheatley.cs.up.ac.za/api/", true);
        var brands;
        req.onreadystatechange = function()
        {
            if (req.readyState == 4 && req.status == 200)
            {
                brands = JSON.parse(req.responseText);
                for(var i = 0; i < brands.data.length; i++)
                {
                    setBrand(
                        brands.data[i],
                    )
                }
            }
        };
        var data = 
        {
            "studentnum": "u22744968",
            "type": "GetAllMakes",
            "apikey": "a9198b68355f78830054c31a39916b7f",
            "limit": 50
        };
        req.send(JSON.stringify(data));
    }

}