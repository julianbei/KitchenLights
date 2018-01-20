var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = 25,
        pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

for(var i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = 0xffffff;
}
ws281x.render(pixelData);

console.log('Press <ctrl>+C to exit.');
