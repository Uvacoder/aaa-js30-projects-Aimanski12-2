let canvas, rtx;


function draw() {
  let time = (function () {
      let midnight = new Date();
      midnight.setHours(0);
      midnight.setMinutes(0);
      midnight.setSeconds(0);
      midnight.setMilliseconds(0);
      return Date.now() - midnight.getTime();
    })(),
    hours = time / (60 * 60 * 1000),
    minutes = hours * 60 % 60,
    seconds = minutes * 60 % 60,
    c = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };

  rtx.clearRect(0, 0, canvas.width, canvas.height);

  rtx.lineCap = 'round';

  sec();
  min();
  hr();
  clock();

  function rtnCtx(rtx) {
    return (
      rtx.strokeStyle = '#c4ebfe',
      rtx.fillStyle = '#c4ebfe',
      rtx.beginPath()
    )
  }

  function clock() {
    // Border
    rtx.lineWidth = 5;
    rtnCtx(rtx)
    rtx.arc(c.x, c.y, 297, 0, Math.PI * 2);
    rtx.stroke();

    // Dashes
    rtx.lineWidth = 2;
    for (let i = 0; i < 60; i++) {
      let r = 280,
        l = 5;
      rtnCtx(rtx)
      if (i % 5 === 0)
        r -= l,
        l *= 2.5,
        rtnCtx(rtx)
      let v = new Vector(r, Math.PI * 2 * (i / 60) - Math.PI / 2);
      rtx.moveTo(v.getX() + c.x, v.getY() + c.y);
      v.setMag(r + l);
      rtx.lineTo(v.getX() + c.x, v.getY() + c.y);
      rtx.stroke();
    }

    // Numbers
    rtx.font = '35px Anton';
    rtnCtx(rtx)
    rtx.textAlign = 'center';
    rtx.textBaseline = 'middle';
    for (let i = 1; i <= 12; i++) {
      let v = new Vector(240, Math.PI * 2 * (i / 12) - Math.PI / 2);
      rtx.fillText(i, v.getX() + c.x, v.getY() + c.y);
    }

    // Center button
    rtx.arc(c.x, c.y, 5.75, 0, Math.PI * 2);
    rtx.lineWidth = 2.5;
    rtx.fill();
    rtx.stroke();
    rtnCtx(rtx)
  }

  function sec() {
    rtx.lineWidth = 1.5;
    calcTimer('sec', rtx)
  }

  function min() {
    rtx.lineWidth = 6;
    calcTimer('min', rtx)
  }

  function hr() {
    rtx.lineWidth = 6;
    calcTimer('hr', rtx)
  }

  function calcTimer(time, rtx) {
    if (time === 'sec') {
      let a = Math.PI * 2 * (seconds / 60) - Math.PI / 2
      let v = new Vector(240, a)
      let v2 = new Vector(-20, a)
      return (
        rtnCtx(rtx),
        rtx.moveTo(v2.getX() + c.x, v2.getY() + c.y),
        rtx.lineTo(v.getX() + c.x, v.getY() + c.y),
        rtx.stroke()
      )
    } else if (time === 'min') {
      let a = Math.PI * 2 * (minutes / 60) - Math.PI / 2;
      let v = new Vector(215, a);
      return (
        rtnCtx(rtx),
        rtx.moveTo(c.x, c.y),
        rtx.lineTo(v.getX() + c.x, v.getY() + c.y),
        rtx.stroke()
      )
    } else {
      let a = Math.PI * 2 * (hours / 12) - Math.PI / 2;
      let v = new Vector(170, a);
      return (
        rtnCtx(rtx),
        rtx.moveTo(c.x, c.y),
        rtx.lineTo(v.getX() + c.x, v.getY() + c.y),
        rtx.stroke()
      )
    }
  }


}

function init() {
  canvas = document.getElementById('clock');
  canvas.width = canvas.height = 600;
  rtx = canvas.getContext('2d');

  setInterval(draw, 10);
}

init();


