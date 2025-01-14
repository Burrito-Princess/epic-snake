let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let input_canvas = document.getElementById("input_canvas");
const ctx = input_canvas.getContext("2d");

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// array variables

let squares = [
  25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400,
  425, 450, 475, 500, 525, 550, 575, 600, 625, 650,
];
let mode_array = [
  "blue",
  "rainbow",
  "aaaaaa",
  "speed",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
];

let apple_mode_array = [
  "portal",
  "portal",
  "phantom",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
];
//  let cc = [
  
//  ]

const triangles = [
  {
    id: "up",
    color: "rgba(0,0,0,0.3)", // Top triangle
    points: [
      { x: input_canvas.width / 2, y: input_canvas.height / 2 }, // Tip at the center
      { x: 0, y: 0 }, // Top-left
      { x: input_canvas.width, y: 0 }, // Top-right
    ],
  },
  {
    id: "right",
    color: "rgba(255,255,255,0.3)", // Right triangle
    points: [
      { x: input_canvas.width / 2, y: input_canvas.height / 2 }, // Tip at the center
      { x: input_canvas.width, y: 0 }, // Top-right
      { x: input_canvas.width, y: input_canvas.height }, // Bottom-right
    ],
  },
  {
    id: "down",
    color: "rgba(0,0,0,0.3)", // Bottom triangle
    points: [
      { x: input_canvas.width / 2, y: input_canvas.height / 2 }, // Tip at the center
      { x: input_canvas.width, y: input_canvas.height }, // Bottom-right
      { x: 0, y: input_canvas.height }, // Bottom-left
    ],
  },
  {
    id: "left",
    color: "rgba(255,255,255,0.3)", // Left triangle
    points: [
      { x: input_canvas.width / 2, y: input_canvas.height / 2 }, // Tip at the center
      { x: 0, y: input_canvas.height }, // Bottom-left
      { x: 0, y: 0 }, // Top-left
    ],
  },
];

// standard variables
let ex_p = [];
let direc = "up";
let loopcount = 0;
let score = 2;
let previousScore = 2;
let p_size = 25;
let g_size = 28;
let tik = 10;
let mode = "normal";
let clicked = false;
let interval;
let apple_mode = apple_mode_array.sample();
let edition;

const displayStyle = window.getComputedStyle(input_canvas).display;

// console.log(displayStyle);
if (displayStyle !== "block") {
  edition = "key";
} else {
  edition = "touch";
}
// let point = document.getElementById("point");
// let gameover_sound = document.getElementById("gameover");

// positional variables

let p_x_pos = [];
let p_y_pos = [];
let phantom_x = [];
let phantom_y = [];
let a_x;
let a_y;
let p_x;
let p_y;
let portal_x1 = squares.sample();
let portal_x2 = squares.sample();
let portal_y1 = squares.sample();
let portal_y2 = squares.sample();
let random_x;
let random_y;

let url = window.location.href;
let cc;

if (typeof(url.split('?')[1]) == 'undefined'){
  cc = 100;
} else {
  cc = parseInt(url.split('?')[1].split('=')[1]);
}

// console.log(cc);


drawApple();

let obstacle_array = [1, 1, 1, 2, 2, 3];

function drawApple(player) {
  if (score > 10) {
    // console.log("drawing apple");
    apple_mode = apple_mode_array.sample();
    // console.log(apple_mode);
  } else {
    apple_mode = "normal";
  }
  switch (apple_mode) {
    case "portal":
      // console.log("portal");
      portal_x1 = squares.sample();
      portal_y1 = squares.sample();
      portal_x2 = squares.sample();
      portal_y2 = squares.sample();
      a_x = -50;

      context.beginPath();
      context.rect(portal_x1, portal_y1, p_size, p_size);
      context.fillStyle = "#FFA500";
      context.closePath();
      context.fill();

      context.beginPath();
      context.rect(portal_x2, portal_y2, p_size, p_size);
      context.fillStyle = "#ADD8E6";
      context.closePath();
      context.fill();
      break;
    case "normal":
      if (mode == "rainbow" || mode == "speed") {
        a_x = squares.sample();
        a_y = squares.sample();
        context.beginPath();
        context.rect(a_x, a_y, p_size, p_size);
        context.fillStyle = "#ff0000";
        context.closePath();
        context.fill();
      } else {
        mode = mode_array.sample();
        startTimer();
        a_x = squares.sample();
        a_y = squares.sample();
        portal_x1 = -50;
        portal_x2 = -50;
        context.beginPath();
        context.rect(a_x, a_y, p_size, p_size);
        context.fillStyle = "#ff0000";
        context.closePath();
        context.fill();
      }
      if (player == true) {
        drawPlayer();
      }
      break;
    case "phantom":
      for (let i = 0; i < 4; i++) {
        if (mode == "rainbow" || mode == "speed") {
          phantom_x[i] = squares.sample();
          phantom_y[i] = squares.sample();
          context.beginPath();
          context.rect(phantom_x[i], phantom_y[i], p_size, p_size);
          context.fillStyle = "#ff0000";
          context.closePath();
          context.fill();
        } else {
          mode = mode_array.sample();
          startTimer();
          phantom_x[i] = squares.sample();
          phantom_y[i] = squares.sample();
          portal_x1 = -50;
          portal_x2 = -50;
          context.beginPath();
          context.rect(phantom_x[i], phantom_y[i], p_size, p_size);
          context.fillStyle = "#ff0000";
          context.closePath();
          context.fill();
        }
      }
      if (mode == "rainbow" || mode == "speed") {
        a_x = squares.sample();
        a_y = squares.sample();
        context.beginPath();
        context.rect(a_x, a_y, p_size, p_size);
        context.fillStyle = "#ff0000";
        context.closePath();
        context.fill();
      } else {
        mode = mode_array.sample();
        startTimer();
        a_x = squares.sample();
        a_y = squares.sample();
        portal_x1 = -50;
        portal_x2 = -50;
        context.beginPath();
        context.rect(a_x, a_y, p_size, p_size);
        context.fillStyle = "#00ff00";
        context.closePath();
        context.fill();
      }
      break;
  }
  for (let i = 0; i < score; i++) {
    if (
      (p_x_pos[p_x_pos.length - 2 - i] == a_x &&
        p_y_pos[p_y_pos.length - 2 - i] == a_y) ||
      (p_x_pos[p_x_pos.length - 2 - i] == portal_x1 &&
        p_y_pos[p_y_pos.length - 2 - i] == portal_y1) ||
      (p_x_pos[p_x_pos.length - 2 - i] == portal_x2 &&
        p_y_pos[p_y_pos.length - 2 - i] == portal_y2)
    ) {
      // console.log("inside you");
      drawApple();
    }
  }
}
drawPlayerStart();

function drawPlayerStart() {
  p_x = squares.sample();
  p_y = squares.sample();
  drawPlayer();
}

function drawPlayer() {
  if (p_x == a_x && p_y == a_y) {
    drawPlayerStart();
  } else {
    context.beginPath();
    context.rect(p_x, p_y, p_size, p_size);
    context.fillStyle = "#00ff00";
    context.closePath();
    context.fill();
  }
}

function reDrawPlayer() {
  context.beginPath();
  context.rect(p_x, p_y, p_size, p_size);
  context.fillStyle = "#00ff00";
  context.closePath();
  context.fill();
}

/////////////// touch input ///////////////

// Function to draw a triangle
function drawTriangle(points, color) {
  ctx.beginPath();
  context.moveTo(points[0].x, points[0].y); // Start at the first point
  points.forEach((point) => ctx.lineTo(point.x, point.y)); // Draw lines to other points
  ctx.closePath(); // Close the path
  ctx.fillStyle = color;
  ctx.fill(); // Fill the triangle
}

// Function to check if a point is inside a triangle
function isPointInTriangle(point, triangle) {
  const [A, B, C] = triangle;

  // Calculate the area of a triangle given 3 points
  function area(P1, P2, P3) {
    return Math.abs(
      (P1.x * (P2.y - P3.y) + P2.x * (P3.y - P1.y) + P3.x * (P1.y - P2.y)) / 2
    );
  }

  // Calculate the total area of the triangle
  const triangleArea = area(A, B, C);

  // Calculate the sum of the areas of the three triangles formed with the point
  const area1 = area(point, B, C);
  const area2 = area(A, point, C);
  const area3 = area(A, B, point);

  // If the sum of the sub-areas equals the total area, the point is inside
  return Math.abs(triangleArea - (area1 + area2 + area3)) < 0.01;
}

// Draw all triangles
triangles.forEach((triangle) => {
  drawTriangle(triangle.points, triangle.color);
});

// Add event listener for click detection
input_canvas.addEventListener("click", (e) => {
  // Get the canvas bounding box and scaling factors
  const rect = input_canvas.getBoundingClientRect();
  const scaleX = input_canvas.width / rect.width; // Horizontal scaling factor
  const scaleY = input_canvas.height / rect.height; // Vertical scaling factor

  // Adjust mouse position for scaling
  const pos = {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };

  // Check if the mouse click is inside any triangle
  triangles.forEach((triangle) => {
    if (isPointInTriangle(pos, triangle.points)) {
      switch (triangle.id) {
        case "up":
          if (direc != "down") {
            direc = "up";
            if (p_y < 0) {
              p_y = g_size * p_size - p_size;
            }
          }
          break;
        case "down":
          if (direc != "up") {
            direc = "down";
            if (p_y > g_size * p_size - p_size) {
              p_y = 0;
            }
          }
          break;
        case "left":
          if (direc != "right") {
            direc = "left";
            if (p_x < 0) {
              p_x = g_size * p_size - p_size;
            }
          }
          break;
        case "right":
          if (direc != "left") {
            direc = "right";
            if (p_x > g_size * p_size - p_size) {
              p_x = 0;
            }
          }
          break;
      }
    }
  });
});

/////////////// keyboard input //////////////
document.addEventListener("keydown", function (event) {
  // console.log(edition);
  if (edition == "key") {
    if (clicked == false) {
      clicked = true;
      if (event.keyCode == 37 || event.keyCode == 74) {
        if (direc != "right") {
          direc = "left";
          if (p_x < 0) {
            p_x = g_size * p_size - p_size;
          }
        }
      } else if (event.keyCode == 38 || event.keyCode == 73) {
        if (direc != "down") {
          direc = "up";
          if (p_y < 0) {
            p_y = g_size * p_size - p_size;
          }
        }
      } else if (event.keyCode == 39 || event.keyCode == 76) {
        if (direc != "left") {
          direc = "right";
          if (p_x > g_size * p_size - p_size) {
            p_x = 0;
          }
        }
      } else if (event.keyCode == 40 || event.keyCode == 75) {
        if (direc != "up") {
          direc = "down";
          if (p_y > g_size * p_size - p_size) {
            p_y = 0;
          }
        }
      }
    }
  }
});
let rainbow_array = ["red", "orange", "yellow", "green", "blue", "purple"];
let speed_array = ["white", "white", "grey", "grey"];
let colour;
let count = 0;

const getHighscores = async () => {
  return await fetch("php-database/get_highscore.php", {
    method: "GET",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

let highscores;

highscores = getHighscores();
highscores
  .then((data) => {
    dataArray = data;
  })
  .catch((error) => {
    console.error(error);
  });

let loop_delay = 1;
let loop = 0;
setInterval(function () {
  if (loop < 1) {
    tableCreate();
  }
  loop++;
}, 300 * loop_delay);
let done = false;
startTimer();
timer();
// mode = "speed";
/////////////// Timer ///////////////
function startTimer() {
  clearInterval(interval);
    let inner_mode = mode;
    if (inner_mode != "speed"){
      inner_mode = 100;
    } else {
      inner_mode = 98;
    }


    interval = setInterval(timer, 100 * (cc/100) * (inner_mode/100));
    // console.log("cc", cc)
    // console.log( 100 * (cc/100) * (inner_mode/100));
  
  return;
}

function timer() {
  clicked = false;
  dirc = direc;
  // drawObstacle();
  if (mode == "rainbow" || mode == "speed") {
    count++;
    if (count == 100) {
      mode = "normal";
      count = 0;
      startTimer();
    }
  }
  if (dirc == "left") {
    p_x += -p_size;
    if (p_x < 0 && mode != "blue") {
      p_x = g_size * p_size - p_size;
    } else if (mode == "blue" && p_x < 0) {
      gameover();
    }
  } else if (dirc == "up") {
    p_y += -p_size;
    if (p_y < 0 && mode != "blue") {
      p_y = g_size * p_size - p_size;
    } else if (mode == "blue" && p_y < 0) {
      gameover();
    }
  } else if (dirc == "right") {
    p_x += p_size;
    if (p_x > g_size * p_size - p_size && mode != "blue") {
      p_x = 0;
    } else if (mode == "blue" && p_x > g_size * p_size - p_size) {
      gameover();
    }
  } else if (dirc == "down") {
    p_y += p_size;
    if (p_y > g_size * p_size - p_size && mode != "blue") {
      p_y = 0;
    } else if (mode == "blue" && p_y > g_size * p_size - p_size) {
      gameover();
    }
  }
  ctx.clearRect(0, 0, p_size * g_size, p_size * g_size);
  context.clearRect(0, 0, p_size * g_size, p_size * g_size);
  // drawApple
  switch (apple_mode) {
    case "portal":
      context.beginPath();
      context.rect(portal_x1, portal_y1, p_size, p_size);
      context.fillStyle = "#FFA500";
      context.closePath();
      context.fill();

      context.beginPath();
      context.rect(portal_x2, portal_y2, p_size, p_size);
      context.fillStyle = "#ADD8E6";
      context.closePath();
      context.fill();
      break;
    case "normal":
      context.beginPath();
      context.rect(a_x, a_y, p_size, p_size);
      context.fillStyle = "#ff0000";
      context.closePath();
      context.fill();
      break;
    case "phantom":
      for (let i = 0; i < 4; i++) {
        if (mode == "rainbow" || mode == "speed") {
          context.beginPath();
          context.rect(phantom_x[i], phantom_y[i], p_size, p_size);
          context.fillStyle = "#ff0000";
          context.closePath();
          context.fill();
        } else {
          context.beginPath();
          context.rect(phantom_x[i], phantom_y[i], p_size, p_size);
          context.fillStyle = "#ff0000";
          context.closePath();
          context.fill();
        }
      }
      if (mode == "rainbow" || mode == "speed") {
        context.beginPath();
        context.rect(a_x, a_y, p_size, p_size);
        context.fillStyle = "#ff0000";
        context.closePath();
        context.fill();
      } else {
        context.beginPath();
        context.rect(a_x, a_y, p_size, p_size);
        context.fillStyle = "#ff0000";
        context.closePath();
        context.fill();
      }
      break;
  }
  triangles.forEach((triangle) => {
    drawTriangle(triangle.points, triangle.color);
  });

  // drawPlayer
  if (apple_mode === "portal") {
    if (p_x === portal_x1 && p_y === portal_y1) {
      // Entered Portal 1
      // console.log("Entered portal 1");
      p_x = portal_x2; // Teleport to Portal 2
      p_y = portal_y2;
      // console.log("Teleported to portal 2: p_x =", p_x, ", p_y =", p_y);
    } else if (p_x === portal_x2 && p_y === portal_y2) {
      // console.log("Entered portal 2");
      p_x = portal_x1; // Teleport to Portal 1
      p_y = portal_y1;
      // console.log("Teleported to portal 1: p_x =", p_x, ", p_y =", p_y);
    }
  }
  if (
    (p_x == a_x && p_y == a_y) ||
    (p_x === portal_x2 && p_y === portal_y2) ||
    (p_x === portal_x1 && p_y === portal_y1)
  ) {
    score++;
    // console.log("previous score: " + previousScore + " current sore: " + score);
    if (score == previousScore + 1 || score == previousScore + 2) {
      previousScore = score;
    } else {
      console.log("cheater");
      gameover(true);
    }

    // point.play();
    if (mode == "rainbow") {
      score++;
    }
    document.getElementById("score").innerHTML = "Score: " + score;
    drawApple();
  } else {
    context.beginPath();
    context.rect(p_x, p_y, p_size, p_size);
    context.fillStyle = "#00ff00";
    context.closePath();
    context.fill();
  }
  p_x_pos.push(p_x);
  p_y_pos.push(p_y);
  let c = 0;

  ///////// self collision /////////

  for (let i = 0; i < score; i++, c++) {
    if (
      p_x_pos[p_x_pos.length - 2 - i] == p_x &&
      p_y_pos[p_y_pos.length - 2 - i] == p_y
    ) {
      if (mode != "aaaaaa") {
        // console.log("game-over");
        gameover();
      }
    }
    // apple collision

    context.beginPath();
    context.rect(
      p_x_pos[p_x_pos.length - 1 - i],
      p_y_pos[p_y_pos.length - 1 - i],
      p_size,
      p_size
    );

    if (mode == "rainbow") {
      if (c > 5) {
        c = 0;
      }
      context.fillStyle = rainbow_array[c];
    } else if (mode == "normal") {
      context.fillStyle = "#00ff00";
    } else if (mode == "blue") {
      context.fillStyle = "#0000ff";
    } else if (mode == "aaaaaa") {
      context.fillStyle = "#aaaaaa";
    } else if (mode == "speed") {
      if (c > 3) {
        c = 0;
      }
      context.fillStyle = speed_array[c];
    }
    context.closePath();
    context.fill();
  }
}

const setHighscore = async (name, score, edition) => {
  return await fetch("php-database/set_highscore.php", {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, score, edition, cc }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

function gameover(cheater) {
  mode = "normal";
  if (
    score == previousScore ||
    score == previousScore + 1 ||
    score == previousScore + 2
  ) {
  } else {
    cheater = true;
  }
  if (cheater) {
    alert("You cheated, please dont anymore <3");
    window.location.href = "https://en.wikipedia.org/wiki/Moral";
  } else {
    let username = "DIP";

    // gameover_sound.play();
    if (document.getElementById("name").value == "DIP") {
      do {
        username = prompt("please fill out your 3 letter Username");
      } while (username == null || username == "" || username.length != 3);
    }
    username = username.toUpperCase();
    context.fillStyle = "red";
    context.fillRect(0, 0, 500, 500);
    setHighscore(username, score, edition);
    document.getElementById("score").innerHTML = "Score: " + score;

    tableCreate();
    drawApple(true);
    score = 2;
    previousScore = 2;
  }
}

let boards = [
  "Overal",
  "Keys",
  "touch"
];

function tableCreate() {
  for (let c = 0; c < boards.length; c++){
  if (done == true) {
    document.getElementById("table" + c).remove();
  }
  const body = document.body,
    tbl = document.createElement("table");
  tbl.id = "table" + c;
  tbl.style.width = "150px";
  tbl.style.border = "1px solid black";

  for (let i = 0; i < 6; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < 2; j++) {
      const td = tr.insertCell();
      td.style.width = "50%";
      if (j == 0) {
        let name = dataArray[c][i].name;
        td.appendChild(document.createTextNode(name));
      } else if (j == 1) {
        let score = dataArray[c][i].score;
        td.appendChild(document.createTextNode(score));
      }
      td.style.border = "1px solid white";
    }
  }
  document.getElementById("leader-board").appendChild(tbl);
  let cap = document.createElement("caption");
  let cap_txt = document.createTextNode(boards[c]);
  cap.appendChild(cap_txt);
  let tab = document.getElementById("table" + c)
    tab.insertBefore(cap, tab.childNodes[0])
}
  done = true;
}

function hide_input() {
  // console.log("logged");
  if (document.getElementById("input_canvas").style.display != "block") {
    document.getElementById("input_canvas").style.display = "block";
    // document.getElementById("body").style.flexDirection = "row";
    edition = "touch";
    gameover();
  } else {
    document.getElementById("input_canvas").style.display = "none";
    edition = "key";
    gameover();
  }
}