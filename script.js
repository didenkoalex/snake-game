var canvas_scene = document.getElementById("scene");
var snake_square = canvas_scene.getContext("2d");
var apple = canvas_scene.getContext("2d");
var g_o = 0;
var speed = 400;
var direction = 0;
var scene_size = {
  width: 30,
  height: 30
};
var snake = [
  { x: 1, y: 0 },
  { x: 0, y: 0 }
];
var apple_coords = calc_apple();
draw_scene();
key.onkeydown = keyPress;
function keyPress(key) {
    var code = key.keyCode;
    if(Math.abs(direction - code) == 2) {
      return 0;
    } else {
      direction = code;
      var timer = setInterval(moveSnake, speed);
    }
    function moveSnake() {
        if(direction != code || g_o) {
          clearInterval(timer);
          return 0;
        }
        switch(code) {
          case 37:
            if(snake[0].x > 0) {
              check_eat({x: snake[0].x-1, y: snake[0].y});
              calc_tail();
              snake[0].x--;
            } else {
              check_eat({x: scene_size.width - 1, y: snake[0].y});
              calc_tail();
              snake[0].x = scene_size.width - 1;
            }
            break;
          case 38:
            if(snake[0].y > 0) {
              check_eat({x: snake[0].x, y: snake[0].y - 1});
              calc_tail();
              snake[0].y--;
            } else {
              check_eat({x: snake[0].x, y: scene_size.height - 1});
              calc_tail();
              snake[0].y = scene_size.height - 1;
            }
            break;
          case 39:
            if(snake[0].x < scene_size.width - 1) {
              check_eat({x: snake[0].x + 1, y: snake[0].y});
              calc_tail();
              snake[0].x++;
            } else {
              check_eat({x: 0, y: snake[0].y});
              calc_tail();
              snake[0].x = 0;
            }
            break;
          case 40:
            if(snake[0].y < scene_size.height - 1) {
              check_eat({x: snake[0].x, y: snake[0].y + 1});
              calc_tail();
              snake[0].y++;
            } else {
              check_eat({x: snake[0].x, y: 0});
              calc_tail();
              snake[0].y = 0;
            }
            break;
        }
        draw_scene();
    }
    function check_eat(coords) {
      if(coords.x == apple_coords.x && coords.y == apple_coords.y) {
        add_tail();
        document.getElementById("cnt").textContent++;
        if(speed-50) speed -=  5;
        apple_coords = calc_apple();
        return 0;
      }
      while(true) {
        var flag = 0;
        for(var i = 1; i <= snake.length - 1; ++i) {
          if(coords.x == snake[i].x && coords.y == snake[i].y) {
            flag++;
            break;
          }
        }
        if(flag) {
          clearInterval(timer);
          game_over();
        }
        break;
      }
    }
    function calc_tail() {
      for(var i = snake.length - 1; i > 0; --i) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
      }
    }
}

function draw_scene() {
  if(g_o != 1) {
    canvas_scene.width = canvas_scene.width;
    draw_apple(apple_coords);
    draw_snake();
  }
}
function draw_apple(coords) {
  apple.beginPath();
  apple.arc(coords.x * (canvas_scene.width / scene_size.width) + (canvas_scene.width / scene_size.width)/2,
            coords.y * (canvas_scene.width / scene_size.height) + (canvas_scene.width / scene_size.height)/2,
            7, Math.PI * 2, false
          );
  apple.fillStyle = "red";
  apple.fill();
  apple.closePath();
  apple.strokeStyle = "#000";
  apple.stroke();
}
function calc_apple() {
  var x, y;
  var flag;
  while(true) {
  flag = 0;
  x = Math.floor(Math.random() * (scene_size.width - 1));
  y = Math.floor(Math.random() * (scene_size.height - 1));
    for(var i = 0; i < snake.length; ++i) {
      if(snake[i].x == x) {
        flag++;
        break;
      }
    }
    for(var i = 0; i < snake.length; ++i) {
      if(snake[i].y == y) {
        flag++;
        break;
      }
    }
    if(flag > 1) continue;
    else return {x, y};
  }
}
function add_tail() {
  snake[snake.length] = {
    x: snake[snake.length - 1].x,
    y: snake[snake.length - 1].y
  };
}
function draw_snake() {
  for(var i = 0; i < snake.length; ++i) {
    snake_square.fillStyle = "gray";
    snake_square.fillRect(snake[i].x * (canvas_scene.width / scene_size.width),
                          snake[i].y * (canvas_scene.height / scene_size.height),
                          canvas_scene.width / scene_size.width,
                          canvas_scene.height / scene_size.height
                        );
    snake_square.fillStyle = "white";
    snake_square.fillRect(snake[i].x * (canvas_scene.width / scene_size.width) + 2,
                          snake[i].y * (canvas_scene.height / scene_size.height) + 2,
                          (canvas_scene.width / scene_size.width) - 4,
                          (canvas_scene.height / scene_size.height) - 4
                          );
  }
}
function game_over() {
  g_o = 1;
  canvas_scene.width = canvas_scene.width;
  document.getElementById("go").style.display = "block";
}
