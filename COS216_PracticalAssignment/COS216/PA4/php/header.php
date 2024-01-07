<?php
//Timothy_Whitaker_u22744968
session_start();
require_once 'config.php';
$current_page = basename($_SERVER['PHP_SELF']);
$menu_items = array(
  'Cars' => 'index.php',
  'Brands' => 'Brands.php',
  'Find me a car' => 'FindCar.php',
  'Compare' => 'Compare.php',
);
if(isset($_SESSION["useremail"]))
{
  $menu_items['Logout'] = 'php/logout.php';
  $menu_items[$_SESSION["name"] . ' ' . $_SESSION["surname"]] = 'Profile.php';
}
else
{
  setcookie('API_Key', '', time() - 3600, '/', '', false, true);
  $menu_items['Sign Up'] = 'signup.php';
  $menu_items['Login'] = 'login.php';
}
?>
  <img src="img/logo.png" class="logo" alt="logo" id = "logo">
  <nav class="navbar">
    <ul>
      <?php
      foreach ($menu_items as $title => $url) 
      {
        $is_current = ($url == $current_page);
        if ($is_current) 
        {
          echo '<li><a href="' . $url . '" class="underlineNav">' . $title . '</a></li>';
        } 
        else
        {
          echo '<li><a href="' . $url . '">' . $title . '</a></li>';
        }
      }
      ?>
    </ul>
  </nav>
  <?php
  if(isset($_SESSION["useremail"]))
  {
  ?>
    <script>
      let warningTimeout = 1000 * 60 * 15;
      let warningTimerID;
      logoutUrl = "php/logout.php";
      function startTimer() 
      {
        warningTimerID = window.setTimeout(idleLogout, warningTimeout);
      }

      function resetTimer() 
      {
        window.clearTimeout(warningTimerID);
        startTimer();
      }

      function idleLogout() 
      {
        alert("You have been logged out due to inactivity");
        window.location = logoutUrl;
      }

      document.addEventListener("mousemove", resetTimer);
      document.addEventListener("mousedown", resetTimer);
      document.addEventListener("keypress", resetTimer);
      document.addEventListener("touchmove", resetTimer);
      document.addEventListener("onscroll", resetTimer);
      document.addEventListener("wheel", resetTimer);

      startTimer();
    </script>
  <?php
  }
  ?>