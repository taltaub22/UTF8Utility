const fs = require('fs');

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
                } catch (err) {
                    alert("Error while converting files!");
                    console.log(err);
                }
            } else {
                try {
                    convertFile(path);
                } catch (err) {
                    alert("Error while converting file!");
                    console.log(err);
                }
            }

            alert("Folder Successfully converted!")
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
    fs.readFile(path, {
        encoding: 'utf8'
    }, function (error, content) {
        if (error) throw error;

        fs.writeFile(path, content, {
            encoding: 'utf8'
        }, function (error) {
            if (error) throw error;

            console.log('Successfully converted', path)
        })
    })
}