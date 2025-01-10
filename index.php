<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./assets/style.css">
  <!-- <link rel="stylesheet" href="./src/input.css"> -->
  <!-- <link rel="stylesheet" href="./src/output.css"> -->
  <title>Snake - dev-ross.com</title>
  <audio id="point">
    <source src="/snake/assets/sounds/score+.mp3" type="audio/mp3">
  </audio>
  <audio id="gameover">
    <source src="/snake/assets/sounds/gameover.wav" type="audio/wav">
  </audio>
</head>

<body class="flex flex-row justify-center" id="body">
  <div>
  <canvas class="hidden lg:inline" id="canvas" width="700px" height="700px"></canvas>
  <canvas id="input_canvas"width="700px" height="700px"></canvas>
  <div class="hidden lg:inline " id="white-space"></div>
</div>
<div>
  
  <div class="flex flex-col lg:flex-row">
    <div id="vertical-center">
      <a href="./../../index.php" class="underline text-2xl">Home</a><br>
      <button onclick="hide_input()">Show Touch Controls</button>
    <div class="hidden lg:inline">User:<br> <input placeholder="dip" id="name" value="DIP" maxlength="3"></input></div>
    <div id="score">Score: 0</div>
    <!-- <div id="dirc">Direction: up</div> -->
    <div id="leader-board"></div>
    <div id="leader-board-touch"></div>
    <form action="" method="get">
      <select name="cc">
        <option value="120">100 CC</option>
        <option value="100">150 CC</option>
        <option value="80">200 CC</option>
      </select>
      <input type="submit" value="Submit">
    </form>
  </div>
  </div>
</div>

</body>
<script src="script_1.js"></script>
<script>
  
</script>

</html>