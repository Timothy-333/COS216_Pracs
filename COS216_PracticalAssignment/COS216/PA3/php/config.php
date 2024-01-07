<?php
//Timothy_Whitaker_u22744968
$serverName = "";
$dbusername = "";
$dbpassword = "";
$dbName = "";

$conn = mysqli_connect($serverName, $dbusername, $dbpassword, $dbName);

if(!$conn)
{
    die("Connection failed: ".mysqli_connect_error());
}