const fs = require('fs');
const jschardet = require("jschardet");
const iconvlite = require('iconv-lite');


function ConvertPath(path) {
    if (!path) {
        alert("Please enter a path");
    } else {
        fs.stat(path, function (err, stats) {
            if (err) {
                alert("This is not a valid path,\n please try again.");
                throw err;
            }

            if (stats.isDirectory()) {
                try {
                    convertFolder(path);
                    alert("Folder Successfully converted!")
                } catch (err) {
                    alert("Error while converting files!");
                    console.error(err);
                }
            } else {
                try {
                    convertFile(path);
                } catch (err) {
                    alert("Error while converting file!");
                    console.error(err);
                }
            }


        });
    }
}

function convertFolder(path) {
    console.log('Convert everything in folder', path);
    fs.readdir(path, function (error, files) {
        if (error) throw error;

        files.forEach(function (filename) {
            fs.stat(path + '/' + filename, function (error, stats) {
                if (error) throw error;

                if (stats.isDirectory()) {
                    convertFolder(path + '/' + filename)
                } else {
                    convertFile(path + '/' + filename)
                }
            })
        })
    })
}

function convertFile(path) {
    console.log('Convert file', path);
    let file = fs.readFileSync(path);
    let enc = jschardet.detect(file);
    try {
        let content = readFileSync_encoding(path, enc.encoding);
        fs.writeFile(path, content, {
            encoding: 'utf8'
        }, function (error) {
            if (error) throw error;
            console.log('Successfully converted', path)
        });
    } catch (e) {
        throw e;
    }

}

function readFileSync_encoding(filename, encoding) {
    let content = fs.readFileSync(filename);
    if(content.name){
        throw "Can't read file";
    }
    return iconvlite.decode(content, encoding);

}