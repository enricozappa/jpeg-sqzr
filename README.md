# auto-jpeg-compressor
Asynchronous image compressor that reduce the size of one or more JPEG, compressing all of it to the required size.

It is designed to produce images for the web, so jpegs are resized to 1500px (width) and it is not possible to obtain a file larger than 2mb.

![](https://media.giphy.com/media/hRTAHXlPnxqF3iukFI/giphy.gif)

How to use:

1. Clone this repository. 
2. Make sure you have **npm** and the most recent LTS **Node** version.
3. Inside the project folder, launch `npm install` from the command line.
4. Put jpegs you want to shrink inside **images** folder. Files must be larger than 2mb!
5. Launch `node app.js -s 500` (example) from the command line.

Type `node app.js -h` for help.

Compressed images will be available inside the folder **output**.

This script uses the module [Sharp](https://www.npmjs.com/package/sharp) to process images.
