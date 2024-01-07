<!-- Timothy_Whitaker_u22744968 -->
<!DOCTYPE html>
<html>
<head>
    <title>Signup Page</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div class = "background" id = "background">
    <?php include 'php/header.php'; ?>
    <div class = "signup" id = "signup">
      <h1>Sign Up</h1>
      <form action="php/validate-signup.php" method="post" onsubmit="return validateForm();">
        <input type="text" id="name" name="name"  placeholder="Name..." required><br>
        <input type="text" id="surname" name="surname" placeholder="Surname..." required><br>
        <input type="email" id="email" name="email" placeholder="Email..." required><br>
        <input type="password" id="password" name="password" placeholder="Password..." required><br>
        <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password..." required><br>
        <div class="findFilter">
          <button type="submit" name="submit" value="Signup">Submit</button>
        </div>
        <script>
          function validateForm() 
          {
            const emailInput = document.getElementById("email");
            const email = emailInput.value;
            const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
            
            if (!emailRegex.test(email)) 
            {
              alert("Invalid email address");
              emailInput.focus();
              return false;
            }
            const passwordInput = document.getElementById("password");
            const password = passwordInput.value;
            const passwordRegex = /^(?=.*\d)(?=.*[^\w\s])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

            if (!passwordRegex.test(password)) 
            {
              alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit and one symbol");
              passwordInput.focus();
              return false;
            }

            const confirmPasswordInput = document.getElementById("confirm_password");
            if (password !== confirmPasswordInput.value) 
            {
              alert("Passwords do not match");
              confirmPasswordInput.focus();
              return false;
            }
          return true;
          }
        </script>
      </form>
    <?php
    if (isset($_GET["error"]))
    {
        if ($_GET["error"] == "emptyinput")
        {
          echo "<h2>Fill in all fields</h2>";
        }
        else if ($_GET["error"] == "invalidemail")
        {
          echo "<h2>Choose a proper email</h2>";
        }
        else if ($_GET["error"] == "passwordsdontmatch")
        {
          echo "<h2>Passwords don't match</h2>";
        }
        else if ($_GET["error"] == "stmtfailed")
        {
          echo "<h2>Something went wrong, try again</h2>";
        }
        else if ($_GET["error"] == "emailtaken")
        {
          echo "<h2>Email already taken</h2>";
        }
        else if ($_GET["error"] == "passwordstrength")
        {
          echo "<h2>Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit and one symbol</h2>";
        }
        else if ($_GET["error"] == "none")
        {
          echo "<h2>You have signed up</h2>";
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