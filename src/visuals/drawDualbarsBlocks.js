export default (functionContext) => {
  let { data, options, ctx, h, w } = functionContext;
  let count = (options.count || 25) * 2;
  let percent = h / 255;
  let width = w / count;
  let skip = true;
  let radius = options.radius || 0;
  let radiusObj = { tl: radius, tr: radius, br: radius, bl: radius };
  for (let point = 0; point <= count; point++) {
    let p = data[point]; //get value
    p *= percent;
    let x = width * point;

    if (skip) {
      let y = h / 2 + p / 2;
      let height = -p;
      if (radius > 0) {
        ctx.beginPath();
        ctx.moveTo(x + radiusObj.tl, y);
        ctx.lineTo(x + width - radiusObj.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radiusObj.tr);
        ctx.lineTo(x + width, y + height - radiusObj.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radiusObj.br, y + height);
        ctx.lineTo(x + radiusObj.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radiusObj.bl);
        ctx.lineTo(x, y + radiusObj.tl);
        ctx.quadraticCurveTo(x, y, x + radiusObj.tl, y);
        ctx.closePath();
      } else {
        ctx.rect(x, y, width, height);
      }
      skip = false;
    } else {
      skip = true;
    }
  }

  if (options.colors[1]) {
    ctx.fillStyle = options.colors[1];
    ctx.fill();
  }

  ctx.stroke();
};
