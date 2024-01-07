<!-- Timothy Whitaker_u22744968 -->
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/compare.js"></script>
  <title>Compare Page</title>
</head>
<body>
  <div class = "background">
    <?php
      include 'php/header.php';
    ?>
    <div class = "contentCompare" id = "carContent">
      <div class="wrapper" id = "wrapper0">
        <form class = "search" id ="search0">
          <input type="text" placeholder="Search.." name="search" id ="searchInput0" oninput="search1(0)">
        </form>
        <div class = popUpBar id="popUpBar0" style="display: none;">

        </div>
        <div class="car" id = "car0">

        </div>
      </div>
      <div class="wrapper" id = "wrapper1">
        <form class = "search" id ="search1">
          <input type="text" placeholder="Search.." name="search" id ="searchInput1" oninput="search1(1)">
        </form>
        <div class = popUpBar id="popUpBar1" style="display: none;">

        </div>
        <div class="car" id = "car1">

        </div>
      </div>
      <!-- <div class="wrapper" id = "wrapper3">
        <button type="button" id = "create" style="text-align: center;width: 50px; height: 50px; border-radius: 30%;">+</button>
      </div> -->
    </div>
    <?php 
      include 'php/footer.php';
    ?>
  </div>
</body>
</html>
