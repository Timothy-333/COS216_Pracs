<!-- Timothy_Whitaker_u22744968 -->
<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
<div class = "background" id = "background">
    <?php include 'php/header.php'; ?>
    <div class = "signup" id = "signup">
        <h1>Login</h1>
        <form action="php/validate-login.php" method="post">
            <input type="email" id="email" name="email" placeholder="Email..." required><br>
            <input type="password" id="password" name="password" placeholder="Password..." required><br>
            <div class="findFilter">
                <button type="submit" name="submit" value="Login">Login</button>
            </div>
        </form>
        <?php
        if (isset($_GET["error"])) 
        {
            if ($_GET["error"] == "emptyinput") 
            {
                echo "<h2>Fill in all fields</h2>";
            }
            else if ($_GET["error"] == "wronglogin")
            {
                echo "<h2>Incorrect login information</h2>";
            }
        }
        ?>
    </div>
    <div>
        <?php include 'php/footer.php'; ?>
    </div> 
</div>
  </body>
</html>