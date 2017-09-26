class Entropy {
  constructor() {
    this.bits = [];
    this.seed();
  }

  shift() {
    if (this.bits.length == 0) {
      this.seed();
    }
    return this.bits.shift();
  }

  generate(n) {
    while (this.bits.length < n) {
      this.seed();
    }
    return this.bits.splice(0, n);
  }

  seed() {
    const precision = 52;
    const max = Math.pow(2, precision);
    var zeroes  = new Array(precision).fill(false);
    var random  = Math.floor(Math.random() * max)
      .toString(2)
      .split('')
      .map(function(x) {
      return !!(parseInt(x));
    });
    for (var i = 0; i < random.length; i++) {
      zeroes[i] = random[i];
    };
    this.bits = this.bits.concat(zeroes.reverse());
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  var canvas = document.getElementsByTagName("canvas")[0];
  const context = canvas.getContext("2d");
  $zoom = window.devicePixelRatio || 1;
  canvas.height = window.innerHeight * $zoom;
  canvas.width  = window.innerWidth  * $zoom;
  canvas.style.width  = canvas.width  / $zoom;
  canvas.style.height = canvas.height / $zoom;

  const fps = 60;
  const tpf = 30;
  
  entropy = new Entropy();

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  t = 0;
  x = 0;
  y = Math.floor(canvas.height / 2);

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  var play = function(t = 0) {
    if (t < tpf) {
      t++;

      x++;
      if (entropy.shift()) {
        y++;
      } else {
        y--;
      }
      x %= canvas.width;
      if (y < 0) {
        y = Math.abs(y);
      }
      if (y > canvas.height) {
        y -= (y - canvas.height);
      }

      context.fillStyle = "#fff";
      context.fillRect(x, y, 1, 1);
      context.fillStyle = "#000";
      context.fillRect(x, y + 1, 1, canvas.height - y);
      play(t);
    }
  };

  setInterval(function() {
    play();
  }, 1000 / fps);
});
