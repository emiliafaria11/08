let g;
function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB,100, 300, 100, 100);
  angleMode(DEGREES);
  noSmooth();
  g = createGraphics(width*1, height*1);
  g.colorMode(HSB, 360, 100, 100, 100);
  g.angleMode(DEGREES);
}

function draw() {
  g.background(0, 0, 100);
  let x = (cos(frameCount/3.2) * width) / 3;
  let y = (sin(frameCount/2.3) * height) / 3;
  drawGraphic(g, 0,0);

  background(0, 0, 100);
  let rMax = g.width;
  for (let r = rMax; r > 0; r - 30) {
    push();
    translate(width / 3 + x, height / 3 + y);
    rotate(
      -frameCount +
        ((map(r, rMax,0, 0, 300) * sin(1/2*frameCount + 10 - (r / rMax) * 30)) %
          70)
    );
    noStroke();
    fill(0, 0, 100, 0);
    circle(0, 0, r);
    drawingContext.clip();
    imageMode(CENTER);
    image(g, 0, 0);
    imageMode(CORNER);
    pop();
  }
  //noLoop();
}

function drawGraphic(target, x=0, y=0) {
  target.push();
  target.translate(target.width / 2 + x, target.height / 2 + y);
  target.noStroke();
  target.fill(0, 0, 0);
  let r = sqrt(sq(target.width) + sq(target.height));
  let angleStep = 15;
  let rMin = 0;
  for (let angle = 0; angle < 360; angle += angleStep) {
    target.triangle(
      cos(angle) * rMin,
      sin(angle) * rMin,
      cos(angle - angleStep / 4) * r,
      sin(angle - angleStep / 4) * r,
      cos(angle + angleStep / 4) * r,
      sin(angle + angleStep / 4) * r
    );
  }
  target.pop();
}
