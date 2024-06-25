const { compile } = require('nexe');

compile({
  input: './dist/main.js', // Entry point of your Nest.js application
  output: 'AI Avatar Server', // Name of the output executable
  build: true, // Required to use patches
  targets: ['windows-x64-14.17.0'], // Specify the target platform and Node.js version
}).then(() => {
  console.log('Nexe compilation complete');
});
