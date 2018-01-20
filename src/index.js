var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = 10,
        pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

function blackout(){
  for (var i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = rgb2Int(0,0,0);
  }
}

blackout();

// ---- animation-loop
pixel = 0;
var color = rgb2Int(50, 205, 50);
console.log('color: '+color, color);
setInterval(function () {
  pixelData[pixel] = color;
  ws281x.render(pixelData);
  pixel++
  if(pixel > NUM_LEDS){
    process.exit(0);
  }
  console.log(pixelData);
}, 2000);

console.log('Press <ctrl>+C to exit.');
