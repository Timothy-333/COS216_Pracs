<?php
//Timothy_Whitaker_u22744968
session_start();
require_once 'config.php';
$current_page = basename($_SERVER['PHP_SELF']);
$menu_items = array(
  'Cars' => 'index.php',
  'Brands' => 'Brands.php',
  'Find me a car' => 'FindCar.php',
  'Compare' => 'Compare.php'
);
?>
  <img src="img/logo.png" class="logo" alt="logo">
  <nav class="navbar">
    <ul>
      <?php
      foreach ($menu_items as $title => $url) 
      {
        $is_current = ($url == $current_page);
        if ($is_current) 
        {
          echo '<li><a href="' . $url . '" class="underlineNav">' . $title . '</a></li>';
        } else 
        {
          echo '<li><a href="' . $url . '">' . $title . '</a></li>';
        }
      }
      if (isset($_SESSION["useremail"])) 
      {
        echo '<li><a href="php/logout.php">Logout</a></li>';
        echo '<li><a href="index.php">' . $_SESSION["name"] . ' ' . $_SESSION["surname"] . '</li>';
      }
      else 
      {
        echo '<li><a href="php/signup.php">Sign Up</a></li>';
        echo '<li><a href="php/login.php">Login</a></li>';
      }
      ?>
    </ul>
  </nav>