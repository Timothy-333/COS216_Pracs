<?php
//Timothy_Whitaker_u22744968
session_start();
session_unset();
session_destroy();
header("Location: ../index.php");
exit();