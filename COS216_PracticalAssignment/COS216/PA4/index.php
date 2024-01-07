<!-- Timothy_Whitaker_u22744968 -->
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/cars.js"></script>
  <title>Cars Page</title>
</head>
<body>
  <div class="loading" id="loading"><img src = "img/loading.svg" alt ="loading"></div>
  <div class = "background" id ="background">
    <?php include 'php/header.php'; ?>
    <div class="sidebar">
      <form class = "search" id = "search">
        <input type="text" placeholder="Search.." name="search" id="searchInput">
        <button type= "submit" id="searchBtn"><img src="img/search.png" alt ="."></button>
      </form>
      <form class="sort">
        <h1>Sort By:</h1>
        <select name="sort" id = "sort">
          <option value="make">Make</option>
          <option value="model">Model</option>
          <option value="year_from">Year</option>
          <option value="max_speed_km_per_h">Max Speed</option>
        </select>
      </form>
      <form class = "sort">
        <h1>Order By:</h1>
        <select name="order" id = "order">
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </form>
      <form class = "filters">
        <h1>Filter By:</h1>
        <div class="filter">
          <h2>Car Type</h2>
          <select id="body_type" name="body_type">
              <option value="">Any</option>
              <option value="Cabriolet">Cabriolet</option>
              <option value="Coupe">Coupe</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Roadster">Roadster</option>
              <option value="Crossover">Crossover</option>
              <option value="Wagon">Wagon</option>
              <option value="Minivan">Minivan</option>
              <option value="Pickup">Pickup</option>
              <option value="Fastback">Fastback</option>
              <option value="Limousine">Limousine</option>
              <option value="Hardtop">Hardtop</option>
              <option value="Targa">Targa</option>
          </select>
        </div>
        <div class="filter">
          <h2>Transmission</h2>
          <select name="transmission" id = "transmission">
            <option value="">Any</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div class="filter">
          <h2>Fuel Type</h2>
          <select name="engine_type" id = "engine">
            <option value="">Any</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div class="filter">
          <h2>Number of Cylinders</h2>
          <select name="cylinders" id ="cylinders">
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
        <div class="findFilter">
          <button type="button" id = "clearFilters">Clear Filters</button>
        </div>
        <?php
        if(isset($_SESSION["useremail"]))
        {
          echo  '<div class="findFilter">
                  <button type="button" id = "savePreferences">Save Preferences</button>
                </div>';
        }
        ?>
      </form>
    </div>
    <div class = "content" id = "carContent">
    </div>
    <?php include 'php/footer.php'; ?>
  </div>
</body>
</html>
