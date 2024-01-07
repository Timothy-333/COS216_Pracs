document.getElementById("mybox").addEventListener("mouseenter", mouseenter);
document.getElementById("mybox").addEventListener("mouseleave", mouseleave);
document.getElementById("movingblock").addEventListener("mouseenter", mouseenter);
document.getElementById("movingblock").addEventListener("mouseleave", mouseleave);
function mouseenter()
{
    document.getElementById("mybox").style.backgroundColor = "red";
    document.getElementById("movingblock").style.backgroundColor = "red";
}
function mouseleave()
{
    document.getElementById("mybox").style.backgroundColor = "blue";
    document.getElementById("movingblock").style.backgroundColor = "blue";
}
document.body.addEventListener("keypress",keyPressed);
function keyPressed(event)
{
    if(document.getElementById("lastpressed").innerHTML.length > 20)
    {
        document.getElementById("lastpressed").innerHTML =  "";
        document.getElementById("hiddenimg").style.display="inline";//any display that displays the image should be fine
        setTimeout(() => {
            document.getElementById("hiddenimg").style.display="none";
        }, 2000);
    }
    else {
        document.getElementById("lastpressed").innerHTML +=  event.key;
    }
}
boxheight = 100;
boxwidth = 100;
increaseSize();
function increaseSize()
{
    if(boxheight >= 350 || boxwidth >= 350)
    {
        boxheight = 100;
        boxwidth = 100;
    }
    else
    {
        boxheight += 1;
        boxwidth += 1;
    }
    document.getElementById("movingblock").style.height = boxheight +"px";
    document.getElementById("movingblock").style.width = boxwidth +"px";
    setTimeout(increaseSize, 10);
}