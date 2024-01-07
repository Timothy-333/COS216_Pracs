<?php
if (isset($_POST["submit"])) 
{
    $fname = $_POST["firstname"];
    $lname = $_POST["lastname"];
    $about = $_POST["about"];
    $hobbies = $_POST["hobbies"];
    $displayMsg = "<p>";
    if(empty($fname))
    {
        $displayMsg .= "First name is required<br>";
    }
    if(empty($lname))
    {
        $displayMsg .= "Last name is required<br>";
    }
    if(empty($about))
    {
        $displayMsg .= "About is required<br>";
    }
    if(empty($hobbies))
    {
        $displayMsg .= "Hobbies is required<br>";
    }
    if(!empty($displayMsg))
    {
        $displayMsg .= "Please fix these errors</p>";
        echo $displayMsg;
    }
    else
    {
        echo "First name: $fname<br>";
        echo "Last name: $lname<br>";
        echo "About: $about<br>";
        $hobbies = explode(",", $hobbies);
        echo "Hobbies: <br>";
        foreach($hobbies as $hobby)
        {
            echo "$hobby<br>";
        }
    }
}