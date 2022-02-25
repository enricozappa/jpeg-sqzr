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
        console.log('\x1b[35m%s\x1b[0m', '\nOutput desired size =>', `~ ${requestedSize} KB`);
    else
        return console.log('\x1b[31m%s\x1b[0m', `\nError: max allowed KB value is 2048"\n`);
else
    return console.log('\x1b[31m%s\x1b[0m', `\nError: you must provide a size in KB. Example: node app.js -s 500"\n`);

// Get images path
const sourcePath = path.join(__dirname, 'input');
const destinationPath = path.join(__dirname, 'output');

// Read images path
fs.readdir(sourcePath, (err, files) => {
    if (err)
        return console.log('\x1b[31m%s\x1b[0m', `\nUnable to scan directory: ${err}`);
    
    // Parse files
    if (files.length) {
        // Store all images (jpegs)
        const images = Object.values(files).filter(file => file.split('.')[1] == 'jpg');

        if (images.length) {
            console.log('\x1b[36m%s\x1b[0m', `\nProcessing ${images.length} files... \n`);

            images.forEach(file => {
                // Get path
                const filePath = `${sourcePath}/${file}`;

                // Get file statistics
                fs.stat(filePath, (error, stats) => {
                    if (error)
                      console.log('\x1b[31m%s\x1b[0m', `Unable to process file ${file}: ${err}`);

                    // Parse file
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            return console.error(err);
                        }

                        // Compress image
                        sharp(data)
                        .jpeg({
                            quality: 90,
                            chromaSubsampling: '4:2:0'
                        })
                        .resize(1500)
                        .toFile(`${destinationPath}/${file}`, (err, info) => {
                            if (err)
                                return console.log('\x1b[31m%s\x1b[0m', `Unable to process file ${file}: ${err}`);
            
                            console.log('\x1b[34m%s\x1b[0m', `Filename: ${file}`);
                            console.log('\x1b[32m%s\x1b[0m',`${formatBytes(stats.size)} => ${formatBytes(info.size)} \n`);
                        });
                    })
                  });
            });
        } else {
            console.log('\x1b[33m%s\x1b[0m', '\nWarning: No jpegs found \n');
        }
    } else {
        console.log('\x1b[33m%s\x1b[0m', '\nWarning: Images folder is empty \n');
    }
});

// Convert bytes
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

