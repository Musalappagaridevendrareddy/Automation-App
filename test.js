var fs = require('fs');
const current = new Date();

var obj = {
    id: 20,
    name: 'John Doe',
    time: current.toLocaleString(),
}
// create funciton if file exists

function addData(obj){
    fs.exists('input.json', function(exists) {
        if (exists) {
            // read file
            fs.readFile('input.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    // parse json
                    var dat = JSON.parse(data); //now it an object
                    dat.table.unshift(obj); //add new item to array
                    // write file
                    fs.writeFile('input.json', JSON.stringify(dat, null, 4), 'utf8', function(err) {
                        if (err) alert("An error ocurred while recording the data" + err.message);
                    }
                    );
                }
            });
        } else {
            var data = {}
            data.table = []
            data.table.unshift(obj);

            fs.writeFile ("input.json", JSON.stringify(data, null, 4), function(err) {
                if (err) alert("An error ocurred while recording the data" + err.message);
                }
            );
        }
    });
}
function readData(){
    fs.readFile('input.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            // parse json
            var dat = JSON.parse(data); //now it an object
            console.log(dat);
        }
    }
    );
}
addData(obj);
readData();