<!-- Timothy_Whitaker_u22744968 -->
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/findCar.js"></script>
  <title>Find Car Page</title>
</head>
<body>
  <div class="loading" id="loading"><img src = "img/loading.svg" alt ="loading"></div>
  <div class = "background">
    <?php
      include 'php/header.php';
    ?>
      <form class = "sidebar" id ="submit">
        <h1> 
          Find me a car:
        </h1>
        <div class="findFilter" id = "body_type">
          <h2>Type?</h2>
          <select name="carType" required>
            <option></option>
            <option value="">Any</option>
            <option value="Cabriolet">Cabriolet</option>
            <option value="Coupe">Coupe</option>
            <option value="Roadster">Roadster</option>
            <option value="Crossover">Crossover</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Liftback">Liftback</option>
            <option value="Wagon">Wagon</option>
            <option value="Minivan">Minivan</option>
            <option value="Fastback">Fastback</option>
            <option value="Pickup">Pickup</option>
            <option value="hardtop">Hardtop</option>
            <option value="Targa">Targa</option>
            <option value="Limousine">Limousine</option>
          </select>
        </div>
        <div class="findFilter" id = "engine">
          <h2>Engine type?</h2>
          <select name="fuel" required>
            <option></option>
            <option value="">Any</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div class="findFilter" id = "transmission">
          <h2>Transmission type?</h2>
          <select name="transmission" required>
            <option></option>
            <option value="">Any</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div class="findFilter" id = "seats">
          <h2>Number of seats?</h2>
          <select name="seats" required>
            <option></option>
            <option value="">Any</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        <div class="findFilter" id = "cylinders">
          <h2>Number of cylinders?</h2>
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
        <div class="findFilter" id = "wheels">
          <h2>Drive wheels?</h2>
          <select name="drive_wheels">
            <option value="">Any</option>
            <option value="Rear wheel drive">Rear wheel drive</option>
            <option value="Front wheel drive">Front wheel drive</option>
            <option value="All wheel drive (AWD)">All wheel drive (AWD)</option>
          </select>
        </div>
        <div class="findFilter">
          <button type="submit">Find me a car</button>
        </div>
      </form>
      <div class = "content" id="carContent">
      </div>
    <?php
      include 'php/footer.php';
    ?>
  </div>
</body>
</html>
