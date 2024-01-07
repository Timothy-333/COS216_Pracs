<!-- Timothy_Whitaker_u22744968 -->
<?php ?>
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/cars.js"></script>
  <title>Cars Page</title>
</head>
<body>
  <div class="loading" id="loading"><img src = "img/loading.gif" alt ="loading"></div>
  <div class = "background" id ="background">
    <?php include 'php/header.php'; ?>
    <div class="sidebar">
      <form class = "search" id = "search">
        <input type="text" placeholder="Search.." name="search" id="searchInput">
        <button type= "submit" id="searchBtn"><img src="img/search.png" alt ="."></button>
      </form>
      <form class="sort" id = "sort">
        <h1>Sort By:</h1>
        <select name="sort">
          <option value="make">Make</option>
          <option value="model">Model</option>
          <option value="year_from">Year</option>
          <option value="max_speed_km_per_h">Max Speed</option>
        </select>
      </form>
      <form class = "sort" id = "order">
        <h1>Order By:</h1>
        <select name="order">
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </form>
      <form class = "filters">
        <h1>Filter By:</h1>
        <div class="filter" id="body_type">
          <h2>Car Type</h2>
          <input type="checkbox" id="0" name="filter" value="Cabriolet">
          <label for="0">Cabriolet</label><br>
          <input type="checkbox" id="1" name="filter" value="Coupe">
          <label for="1">Coupe</label><br>
          <input type="checkbox" id="2" name="filter" value="Sedan">
          <label for="2">Sedan</label><br>
          <input type="checkbox" id="3" name="filter" value="Hatchback">
          <label for="3">Hatchback</label><br>
          <input type="checkbox" id="4" name="filter" value="Roadster">
          <label for="4">Roadster</label><br>
          <input type="checkbox" id="5" name="filter" value="Crossover">
          <label for="5">Crossover</label><br>
          <input type="checkbox" id="6" name="filter" value="Wagon">
          <label for="6">Wagon</label><br>
          <input type="checkbox" id="7" name="filter" value="Minivan">
          <label for="7">Minivan</label><br>
          <input type="checkbox" id="8" name="filter" value="Pickup">
          <label for="8">Pickup</label><br>
          <input type="checkbox" id="9" name="filter" value="Fastback">
          <label for="9">Fastback</label><br>
          <input type="checkbox" id="10" name="filter" value="Limousine">
          <label for="10">Limousine</label><br>
          <input type="checkbox" id="11" name="filter" value="hardtop">
          <label for="11">Hardtop</label><br>
          <input type="checkbox" id="12" name="filter" value="Targa">
          <label for="12">Targa</label><br>
        </div>
        <div class="filter" id = "transmission">
          <h2>Transmission</h2>
          <select name="transmission">
            <option value="">Any</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div class="filter" id = "engine">
          <h2>Fuel Type</h2>
          <select name="engine_type">
            <option value="">Any</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div class="filter" id ="cylinders">
          <h2>Number of Cylinders</h2>
          <select name="cylinders">
            <option value="">Any</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
        </div>
      </form>
    </div>
    <div class = "content" id = "carContent">
    </div>
    <?php include 'php/footer.php'; ?>
  </div>
</body>
</html>
