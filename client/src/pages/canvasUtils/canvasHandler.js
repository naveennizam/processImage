// canvasUtils/canvasHandler.js

export function initCanvasWithFile(canvas, file) {
  const ctx = canvas.getContext('2d');
  const img = new Image();

  const reader = new FileReader();

  reader.onload = function (event) {
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
  };
  if (!file) return;
  if (file) {
    reader.readAsDataURL(file);
  }
}

export function clearCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


export function initCanvasWithBlob(blob) {

  let canvas = document.getElementById("serverImage");
  const ctx = canvas.getContext('2d');

    ctx.quality = 'best';
    ctx.patternQuality = 'best';
    ctx.imageSmoothingQuality = 'high';
    ctx.textBaseline = "top";
  const img = new Image();

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = blob
 

}
