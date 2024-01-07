<?php
//Timothy_Whitaker_u22744968
if (isset($_POST["submit"])) 
{
  // Get the form data
  $name = $_POST["name"];
  $surname = $_POST["surname"];
  $email = $_POST["email"];
  $password = $_POST["password"];
  $confirm_password = $_POST["confirm_password"];
  require_once 'config.php';
  require_once 'functions.php';
  if (emptyInputSignup($name, $surname, $email, $password, $confirm_password) !== false) 
  {
    header("Location: signup.php?error=emptyinput");
    exit();
  }
  if (invalidEmail($email) !== false) 
  {
    header("Location: signup.php?error=invalidemail");
    exit();
  }
  if (passwordMatch($password, $confirm_password) !== false)
  {
    header("Location: signup.php?error=passwordsdontmatch");
    exit();
  }
  if (emailExists($conn, $email) !== false)
  {
    header("Location: signup.php?error=emailtaken");
    exit();
  }
  if (passwordStrength($password) !== false)
  {
    header("Location: signup.php?error=passwordstrength");
    exit();
  }
  creatUser($conn, $name, $surname, $email, $password);
}
else
{
  header("Location: signup.php");
  exit();
}