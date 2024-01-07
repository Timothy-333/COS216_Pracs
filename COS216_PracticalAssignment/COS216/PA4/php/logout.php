<?php
//Timothy_Whitaker_u22744968
session_start();
setcookie('API_Key', '', time() - 3600, '/', '', false, true);
session_unset();
session_destroy();
header("Location: ../index.php");
exit();