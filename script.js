let nums = [0x7E, 0x30, 0x6D, 0x79, 0x33, 0x5B, 0x5F, 0x70, 0x7F, 0x7B];
let index = 0;

function setup() {
  createCanvas(900, 300);
  frameRate(1);
  const canvas = document.querySelector('canvas')

  width = window.innerWidth
  height = window.innerHeight
  canvas.style.marginLeft = (width / 2 - 450).toString() + 'px'
  canvas.style.marginTop = (height / 2 - 350).toString() + 'px'

}



function draw() {
  // background('GRAY');
  background('#a3a3a3');

  var time = new Date()
  var hr = time.getHours()
  var min = time.getMinutes()
  var sec = time.getSeconds()
  var hr1 = Math.floor(hr / 10)
  var hr2 = hr % 10
  var min1 = Math.floor(min / 10)
  var min2 = min % 10
  var sec1 = Math.floor(sec / 10)
  var sec2 = sec % 10

  sevenSegment(nums[hr1], nums[hr2], nums[min1], nums[min2], nums[sec1], nums[sec2]);
  index = (index + 1) % nums.length;
}

function getColor(val, shift) {
  let r = 192;
  let g = 24;
  let b = 24;
  let a = 8 + 255 * ((val >> shift) & 1);
  return color(r, g, b, a);
}

function sevenSegment(h1, h2, m1, m2, s1, s2) {
  push();
  noStroke();
  noFill();
  // A
  fill(getColor(h1, 6))
  rect(60, 20, 80, 20, 10, 10);
  // B
  fill(getColor(h1, 5))
  rect(140, 40, 20, 100, 10, 10);
  // C
  fill(getColor(h1, 4))
  rect(140, 160, 20, 100, 10, 10);
  // D
  fill(getColor(h1, 3));
  rect(60, 260, 80, 20, 10, 10);
  // E
  fill(getColor(h1, 2));
  rect(40, 160, 20, 100, 10, 10);
  // F
  fill(getColor(h1, 1));
  rect(40, 40, 20, 100, 10, 10);
  // A
  fill(getColor(h1, 0));
  rect(60, 140, 80, 20, 10, 10);


  // A
  fill(getColor(h2, 6))
  rect(190, 20, 80, 20, 10, 10);
  // B
  fill(getColor(h2, 5))
  rect(270, 40, 20, 100, 10, 10);
  // C
  fill(getColor(h2, 4))
  rect(270, 160, 20, 100, 10, 10);
  // D
  fill(getColor(h2, 3));
  rect(190, 260, 80, 20, 10, 10);
  // E
  fill(getColor(h2, 2));
  rect(170, 160, 20, 100, 10, 10);
  // F
  fill(getColor(h2, 1));
  rect(170, 40, 20, 100, 10, 10);
  // A
  fill(getColor(h2, 0));
  rect(190, 140, 80, 20, 10, 10);

  fill('#a91010');
  rect(300, 115, 20, 20, 6, 6)
  rect(300, 165, 20, 20, 6, 6)

  // A
  fill(getColor(m1, 6))
  rect(350, 20, 80, 20, 10, 10);
  // B
  fill(getColor(m1, 5))
  rect(430, 40, 20, 100, 10, 10);
  // C
  fill(getColor(m1, 4))
  rect(430, 160, 20, 100, 10, 10);
  // D
  fill(getColor(m1, 3));
  rect(350, 260, 80, 20, 10, 10);
  // E
  fill(getColor(m1, 2));
  rect(330, 160, 20, 100, 10, 10);
  // F
  fill(getColor(m1, 1));
  rect(330, 40, 20, 100, 10, 10);
  // A
  fill(getColor(m1, 0));
  rect(350, 140, 80, 20, 10, 10);




  fill(getColor(m2, 6))
  rect(480, 20, 80, 20, 10, 10);
  // B
  fill(getColor(m2, 5))
  rect(560, 40, 20, 100, 10, 10);
  // C
  fill(getColor(m2, 4))
  rect(560, 160, 20, 100, 10, 10);
  // D
  fill(getColor(m2, 3));
  rect(480, 260, 80, 20, 10, 10);
  // E
  fill(getColor(m2, 2));
  rect(460, 160, 20, 100, 10, 10);
  // F
  fill(getColor(m2, 1));
  rect(460, 40, 20, 100, 10, 10);
  // A
  fill(getColor(m2, 0));
  rect(480, 140, 80, 20, 10, 10);


  fill('#a91010');
  rect(590, 115, 20, 20, 6, 6)
  rect(590, 165, 20, 20, 6, 6)



  fill(getColor(s1, 6))
  rect(640, 20, 80, 20, 10, 10);
  // B
  fill(getColor(s1, 5))
  rect(720, 40, 20, 100, 10, 10);
  // C
  fill(getColor(s1, 4))
  rect(720, 160, 20, 100, 10, 10);
  // D
  fill(getColor(s1, 3));
  rect(640, 260, 80, 20, 10, 10);
  // E
  fill(getColor(s1, 2));
  rect(620, 160, 20, 100, 10, 10);
  // F
  fill(getColor(s1, 1));
  rect(620, 40, 20, 100, 10, 10);
  // A
  fill(getColor(s1, 0));
  rect(640, 140, 80, 20, 10, 10);



  fill(getColor(s2, 6))
  rect(770, 20, 80, 20, 10, 10);
  // B
  fill(getColor(s2, 5))
  rect(850, 40, 20, 100, 10, 10);
  // C
  fill(getColor(s2, 4))
  rect(850, 160, 20, 100, 10, 10);
  // D
  fill(getColor(s2, 3));
  rect(770, 260, 80, 20, 10, 10);
  // E
  fill(getColor(s2, 2));
  rect(750, 160, 20, 100, 10, 10);
  // F
  fill(getColor(s2, 1));
  rect(750, 40, 20, 100, 10, 10);
  // A
  fill(getColor(s2, 0));
  rect(770, 140, 80, 20, 10, 10);


  pop();
}