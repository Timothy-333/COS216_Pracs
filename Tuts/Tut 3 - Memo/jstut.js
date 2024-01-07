//task 1
document.getElementById("mybox").addEventListener("mouseenter", function() {
    document.getElementById("mybox").style.backgroundColor = "red";
})

document.getElementById("mybox").addEventListener("mouseleave", function() {
    document.getElementById("mybox").style.backgroundColor = "blue";
})

//task 2
document.body.addEventListener("keypress",function(event){
    if(document.getElementById("lastpressed").innerHTML.length > 20){
        document.getElementById("lastpressed").innerHTML =  "";
        document.getElementById("hiddenimg").style.display="inline";//any display that displays the image should be fine
        setTimeout(() => {
            document.getElementById("hiddenimg").style.display="none";
        }, 2000);
    }
    else {
        document.getElementById("lastpressed").innerHTML +=  event.key;
    }
})


//task 2
boxheight = 100;
boxwidth = 100;

function boxchange(){

    if(boxwidth >= 350|| boxheight >= 350){
        boxheight = 100;
        boxwidth = 100;
    }
    else {
        boxheight = boxheight + 1;
        boxwidth = boxwidth + 1;
        
    }
    document.getElementById("movingblock").style.height = boxheight + "px";
    document.getElementById("movingblock").style.width = boxwidth + "px";
    setTimeout(boxchange, 10)
    //note setTimeout(boxchange(), 10) will not work
    
}

// boxchange(); //uncomment this to start the box moving