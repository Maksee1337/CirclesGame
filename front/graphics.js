export class Graphics {
  canvas;
  context;
  // objects = [];

  constructor() {
    this.info = document.getElementById('info');
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
  }

  onCanvasClick(callback) {
    this.canvas.addEventListener('click', (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      callback(x, y);
    });
  }
  drawCircle({x, y, radius, color}) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'black';
    this.context.stroke();
  }

  drawRect({x, y, width, height, color}) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }
  updateLeaderboard(leaders) {
    this.info.innerHTML = '';
    this.info.innerHTML += `<H3>Players online ${leaders.length}</H3></b>`;
    for (const leader of leaders) {
      if(window.name !== leader.name) {
        this.info.innerHTML += `<div>${leader.name} - ${Math.floor(leader.score)}</div>`;
      } else {
        this.info.innerHTML += `<div><b>${leader.name} - ${Math.floor(leader.score)}</b></div>`;
      }
    }
    console.log('leaders',leaders);
  }
  render(objects) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const object of objects) {
      switch (object.type) {
        case 'circle':
          this.drawCircle(object.options);
          break;
        case 'rect':
          this.drawRect(object.options);
          break;
      }
    }
  }

  // addCircle(x, y, radius, color) {
  //   this.objects.push({
  //     type: 'circle',
  //     x: x,
  //     y: y,
  //     radius: radius,
  //     color: color,
  //   });
  // }
  //
  // addRect(x, y, width, height, color) {
  //   this.objects.push({
  //     type: 'rect',
  //     x: x,
  //     y: y,
  //     width: width,
  //     height: height,
  //     color: color,
  //   });
  // }

  // removeRect(x, y) {
  //   for (let i = 0; i < this.objects.length; i++) {
  //     if (this.objects[i].type === 'rect' && this.objects[i].x === x && this.objects[i].y === y) {
  //       this.objects.splice(i, 1);
  //       return;
  //     }
  //   }
  // }
  //
  // removeCircle(x, y) {
  //   for (let i = 0; i < this.objects.length; i++) {
  //     if (this.objects[i].type === 'circle' && this.objects[i].x === x && this.objects[i].y === y) {
  //       this.objects.splice(i, 1);
  //       return;
  //     }
  //   }
  // }
}
