let circles = [];
let hexagonRadius = 145;

// Define size for easy modification
let circleSize = 225;

function setup() {
  createCanvas(800, 800);
  noLoop();

  // Each circle object now has a 'pattern' property to determine which function should be used
  circles.push({ cx: 130, cy: 130, size: circleSize, pattern: "smallCircles" });
  circles.push({ cx: 400, cy: 130, size: circleSize, pattern: "defaultPattern" });
  circles.push({ cx: 670, cy: 130, size: circleSize, pattern: "ZigCircle"});
  circles.push({ cx: 130, cy: 400, size: circleSize, pattern: "ZigCircle"});
  circles.push({ cx: 400, cy: 400, size: circleSize, pattern: "smallCircles" });
  circles.push({ cx: 670, cy: 400, size: circleSize, pattern: "defaultPattern" });
  circles.push({ cx: 670, cy: 660, size: circleSize, pattern: "smallCircles" });
  circles.push({ cx: 400, cy: 660, size: circleSize, pattern: "ZigCircle"});
  circles.push({ cx: 130, cy: 660, size: circleSize, pattern: "defaultPattern" });
  
}

function draw() {
  background(1, 76, 118);
  
  let cellSize = width / 3; // Determine the size of each cell in the grid

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      let offsetX = col * cellSize; // Horizontal offset for current cell
      let offsetY = row * cellSize; // Vertical offset for current cell
      let cx = offsetX + cellSize / 2;
      let cy = offsetY + cellSize / 2;

      // Draw hexagon pattern
      drawHexagonPattern(cx, cy);
    }
  }

  for (let circle of circles) {
    // Apply the correct pattern based on the 'pattern' property
    switch (circle.pattern) {
      case "smallCircles":
        drawSmallCircles(circle.cx, circle.cy, circle.size);
        break;
      case "defaultPattern":
        drawCirclePattern(circle.cx, circle.cy, circle.size);
        break;
      case "ZigCircle":
        drawZigCircle(circle.cx, circle.cy, circle.size);
        break;
      // Add more cases here for additional patterns
    }
  }
}

function drawHexagonPattern(cx, cy) {
  // Draw the hexagon and the circles on its sides
  let sides = 6;
  let circlePerSide = 5;
  let colors = ['blue', 'red', 'green', 'yellow'];

  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;
    let x = cx + cos(angle) * hexagonRadius;
    let y = cy + sin(angle) * hexagonRadius;
    noFill()
    stroke(205, 91, 28)
    strokeWeight(4)
    vertex(x, y);
  }
  endShape(CLOSE);

  for (let i = 0; i < sides; i++) {
    let angle = TWO_PI / sides * i;
    let x = cx + cos(angle) * hexagonRadius;
    let y = cy + sin(angle) * hexagonRadius;
    for (let j = 0; j < circlePerSide; j++) {
      let angle2 = (TWO_PI / sides * (i+1));
      let x2 = (cx + cos(angle2) * hexagonRadius);
      let y2 = (cy + sin(angle2) * hexagonRadius);
      let vx = (x2 - x) * (j/circlePerSide);
      let vy = (y2 - y) * (j/circlePerSide);
      stroke(205, 91, 28);
      strokeWeight(5);
      fill(1, 76, 118)
      push();
      translate(x + vx + 3, y + vy - 3);
      rotate(angle);
      fill(colors[j % colors.length]);
      ellipse(0, 0, 12, 20);
      pop();
    }
  }
}

function drawSmallCircles(cx, cy, size) {
  let numSmallCircles = 50;

  // Drawing small circles within the big circle
  let angleIncrement = 360 / numSmallCircles;
  let radii = [size / 2, 60, 50, 40, 30, 20, 10];
  let colors = [
    [205, 215, 251], [34, 49, 30], [164, 61, 134], 
    [246, 35, 16], [28, 145, 77], [0, 0, 0], [6, 133, 46]
  ];

  push();
  fill(colors[0]);
  noStroke();
  ellipse(cx, cy, radii[0] * 2);
  pop();

  for (let r = 0; r < size / 2; r += 8) {
    for (let j = 0; j < numSmallCircles; j++) {
      let angle = radians(j * angleIncrement);
      let x = cx + cos(angle) * r;
      let y = cy + sin(angle) * r;
      push();
      fill(4, 2, 101);
      noStroke();
      ellipse(x, y, 7);
      pop();
    }
  }

  for (let i = 1; i < radii.length; i++) {
    push();
    fill(colors[i]);
    stroke(130, 154, 138);
    strokeWeight(4);
    ellipse(cx, cy, radii[i] * 2);
    pop();
  }
}

function drawCirclePattern(cx, cy, size) {
  noStroke();
  fill(255);
  ellipse(cx, cy, size, size);

  fill(206, 64, 87);
  for (let j = 0; j < 5; j++) {
    let ps = circlePoints({ x: cx, y: cy }, size - (j + 1) * 30);
    for (let i = 0; i < ps.length; i++) {
      ellipse(ps[i].x, ps[i].y, 10, 10);
    }
  }

  fill(213, 94, 173);
  stroke(217, 56, 79);
  strokeWeight(5);
  ellipse(cx, cy, size / 2);
  strokeWeight(2);
  stroke(227, 102, 82);
  let ps = circlePoints({ x: cx, y: cy }, size / 2 - 15);
  for (let i = 0; i < ps.length; i++) {
    line(ps[i].x, ps[i].y, cx, cy);
  }

  stroke(216, 77, 135);
  ellipse(cx, cy, size / 4);
  noStroke();
  fill(119, 114, 99);
  ellipse(cx, cy, size / 4 - 5);
  fill(218, 55, 61);
  ellipse(cx, cy, size / 4 - 20);
  fill(0);
  ellipse(cx, cy, size / 4 - 30);
  fill(89, 156, 83);
  ellipse(cx, cy, size / 4 - 45);
  fill(255);
  ellipse(cx, cy, size / 4 - 75);
}

function circlePoints(center, diameter) {
  let points = [];
  let radius = diameter / 2;
  let x, y, angle;
  let s = random(0, 45);
  for (let i = s; i <= 360 + s; i += 7) {
    angle = radians(i);
    x = center.x + radius * cos(angle);
    y = center.y + radius * sin(angle);
    points.push({ x, y });
  }
  return points;
}

function drawZigCircle(cx, cy, size) {
  // Yellow circle in the background
  fill(255, 211, 52); // Set the fill color to yellow
  stroke(255, 255, 255); // No border for the circle
  ellipse(cx, cy, size);

  // Radiating zigzag lines on top of the yellow circle
  drawRadialZigzag(cx, cy, 10, 30, 73, -1); // Inner zigzag
  drawRadialZigzag(cx, cy, 10, 30, 73, 1); // Outer zigzag
  
  // Pink circle with pattern inside
  fill(234, 84, 184); // Set the fill color to pink
  ellipse(cx, cy, size * 0.595);

  // Draw small red circles
  drawRedCircles(cx, cy, size * 0.3, 50);
  
  // Green outer circle
  fill(130, 154, 138);
  ellipse(cx, cy, size * 0.25);
  
  // Black outer circle
  fill(0);
  ellipse(cx, cy, size * 0.17);
  
  // Red middle circle
  fill(255, 0, 0);
  ellipse(cx, cy, size * 0.095);
  
  // White center circle
  fill(255);
  ellipse(cx, cy, size * 0.05);
}

function drawRadialZigzag(cx, cy, radius, segments, zigzagLength, direction) {
  push();
  stroke(255, 0, 0); // Red color for zigzag
  strokeWeight(3);
  let angleIncrement = TWO_PI / segments;

  for (let angle = 0; angle < TWO_PI; angle += angleIncrement) {
    let xStart = cx + radius * cos(angle);
    let yStart = cy + radius * sin(angle);
    let xEnd = cx + (radius + zigzagLength) * cos(angle);
    let yEnd = cy + (radius + zigzagLength) * sin(angle);
    if (int(angle / angleIncrement) % 2 == 0) {
      xEnd += direction * zigzagLength * cos(angle + HALF_PI);
      yEnd += direction * zigzagLength * sin(angle + HALF_PI);
    } else {
      xEnd -= direction * zigzagLength * cos(angle + HALF_PI);
      yEnd -= direction * zigzagLength * sin(angle + HALF_PI);
    }
    line(xStart, yStart, xEnd, yEnd);
  }
  pop();
}


function drawRedCircles(centerX, centerY, bigCircleRadius, numSmallCircles) {
  let angleIncrement = 360 / numSmallCircles;
  for (let r = 0; r < bigCircleRadius; r += 7) {
    for (let i = 0; i < numSmallCircles; i++) {
      let angle = radians(i * angleIncrement);
      let x = centerX + cos(angle) * r;
      let y = centerY + sin(angle) * r;
      push();
      fill(247, 10, 4); // Red fill for small dots
      noStroke(); // No border for the small dots
      ellipse(x, y, 6);
      pop();
    }
  }
}