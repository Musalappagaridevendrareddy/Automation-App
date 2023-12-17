

var tag = document.getElementById('cart');
var fs = require('fs');

function readData(){
    fs.readFile('./asserts/data/input.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            alert("An error ocurred while reading the data" + err.message);
        } else {
            // parse json
            var dat = JSON.parse(data); //now it an object
            //create button for each item in dat
            for (var i = 0; i < dat.table.length; i++) {
                var arrange = document.createElement('div')
                arrange.className = 'arrange';

                var spanLeft = document.createElement('span');
                spanLeft.className = 'alignLeft';
                spanLeft.innerHTML = dat.table[i].name;
                var spanRight = document.createElement('span')
                spanRight.className = 'alignRight';
                spanRight.innerHTML = dat.table[i].date;
                var button = document.createElement('button');
                button.className = 'buttonRight';
                button.innerHTML = 'Run';
                button.id = dat.table[i].id;
                button.onclick = callPython;
                arrange.appendChild(spanLeft);
                arrange.appendChild(spanRight);
                arrange.appendChild(button);
                tag.appendChild(arrange);

            }
            
        }
    }
    );
}
function callPython(){
    var python = require('child_process').spawn('python', ['hello.py', event.srcElement.id]);
    const ptext = document.querySelector('.result');
    python.stdout.on('data',function(data){
        alert("Task Completed Successfully", "Done");
        ptext.innerText = data.toString('utf8')
    });
}
function test(){
    alert(event.srcElement.id);
}
//print read data
document.addEventListener("DOMContentLoaded", readData);
