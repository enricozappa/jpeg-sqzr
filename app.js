const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { program } = require('commander');

program
    .option('-s, --size <integer>', 'set desired size in KB, max allowed value is 2048')

program.parse();

const options = program.opts();
const requestedSize = Number.parseInt(options.size);

// Check if size parameter exists and if it's a number
if (requestedSize)
    if (requestedSize <= 2048)
        console.log('\x1b[35m%s\x1b[0m', '\nOutput desired size =>', `~ ${requestedSize} KB\n`);
    else
        return console.log('\x1b[31m%s\x1b[0m', `\nError: max allowed KB value is 2048"\n`);
else
    return console.log('\x1b[31m%s\x1b[0m', `\nError: you must provide a size in KB. Example: node app.js -s 500"\n`);

// Get images path
const sourcePath = path.join(__dirname, 'input');
const destinationPath = path.join(__dirname, 'output');

//TODO: catch size parameter

//TODO: process images

// Convert bytes
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

