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
  
  entropy = new Entropy();

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  x     = 0;
  y     = Math.floor(canvas.height / 2);

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  setInterval(function() {
    x %= canvas.width;
    if (entropy.shift()) {
      y++;
    } else {
      y--;
    }
    context.fillStyle = "white";
    context.fillRect(x, y, 1, 1);
    x++;
  }, 1);
});
