const selectElement = document.querySelector('.select-ele');
const leftDiv = document.querySelector('.left');
const count = document.getElementById('quantity1');
const taskName = document.getElementById('taskName');
const submit = document.querySelector('.submit');

var fs = require('fs');
const current = new Date();

numTimes = 0;
var rec = [];
var enterPos = [];

//on load
window.addEventListener('load', (event) => {
    //fadeout loader class after 1s and fadein content class 
    setTimeout(function () {
        //disable  loader class
        document.querySelector('.loader').style.display = 'none';
        //enable content class
        document.querySelector('.content').style.display = 'block';
    }, 1000);
});


selectElement.addEventListener('change', (event)=>{
    if (event.target.value=='yes'){
        document.querySelector('.grid-align').style.gridTemplateColumns = 'auto auto';
        // add div tag after left div
        const rightDiv = document.createElement('div');
        rightDiv.setAttribute('class', 'right');
        // add rightDiv after leftDiv
        leftDiv.after(rightDiv);
        const clicksLabel = document.createElement('label');
        clicksLabel.innerHTML = "Enter click Number:";
        //add div to right div
        rightDiv.appendChild(clicksLabel);

        const clicksInput = document.createElement('input');
        clicksInput.setAttribute("type",'number');
        clicksInput.setAttribute('id', 'quantity2');
        clicksInput.setAttribute('value', '1');
        clicksInput.setAttribute('required', true);
        //add div to right div
        rightDiv.appendChild(clicksInput);

        // /// add break tag after clicksInput
        const br2 = document.createElement('br');
        rightDiv.appendChild(br2);
        
        const textLabel = document.createElement('label');
        textLabel.innerHTML = "Enter Text:";
        rightDiv.appendChild(textLabel);
        
        const textInput = document.createElement('input');
        textInput.setAttribute("type",'text');
        textInput.setAttribute('id', 'textInput');
        textInput.setAttribute('required', 'true');
        rightDiv.appendChild(textInput);
    
        // // create upload button
        const uploadButton = document.createElement('button');
        uploadButton.innerHTML = "Upload";
        uploadButton.setAttribute('id', 'uploadButton');
        //add margin left
        uploadButton.style.marginLeft = '11px';
        rightDiv.appendChild(uploadButton);

        const br3 = document.createElement('br');
        rightDiv.appendChild(br3);
        // create dropdown yes/no
        const label = document.createElement('label');
        label.innerHTML = "Want to press enter?";
        rightDiv.appendChild(label);
        const dropdown = document.createElement('select');
        dropdown.setAttribute('id', 'dropdown');
        dropdown.setAttribute('class', 'dropdown');
        dropdown.setAttribute('required', 'true');
        rightDiv.appendChild(dropdown);
        const option = document.createElement('option');
        option.setAttribute('value', 'Yes/No');
        option.innerHTML = 'Yes/No';
        dropdown.appendChild(option);
        const option1 = document.createElement('option');
        option1.setAttribute('value', 'yes');
        option1.innerHTML = 'Yes';
        dropdown.appendChild(option1);
        const option2 = document.createElement('option');
        option2.setAttribute('value', 'no');
        option2.innerHTML = 'No';
        dropdown.appendChild(option2);

        dropdown.addEventListener('change', (event)=>{
            if (event.target.value=='yes'){
                document.querySelector('.grid-align').style.gridTemplateColumns = 'auto auto auto';
                const enterDiv = document.createElement('div');
                enterDiv.setAttribute('class', 'enter');
                rightDiv.after(enterDiv);

                const enterLabel = document.createElement('label');
                enterLabel.innerHTML = "Enter Click Number:";
                enterDiv.appendChild(enterLabel);

                const enterInput = document.createElement('input');
                enterInput.setAttribute("type",'number');
                enterInput.setAttribute('id', 'quantity3');
                enterInput.setAttribute('value', '1');
                enterInput.setAttribute('required', true);
                enterDiv.appendChild(enterInput);

                const br4 = document.createElement('br');
                enterDiv.appendChild(br4);

                const enterButton = document.createElement('button');
                enterButton.innerHTML = "Upload";
                enterButton.setAttribute('id', 'uploadButton');
                enterDiv.appendChild(enterButton);

                enterButton.addEventListener('click', (event)=>{
                    enterPos.push(enterInput.value);
                })

            }else{
                document.querySelector('.grid-align').style.gridTemplateColumns = 'auto auto';
                document.querySelector('.enter').remove();

            }
        });
        uploadButton.addEventListener('click', (event)=>{
            //add clicksInput and textInput as list
            rec.push([clicksInput.value, textInput.value]);
            textInput.value = "";
            // clicksInput.value = 1;
        })
    }else{
        // remove right div
        document.querySelector('.grid-align').style.gridTemplateColumns = 'auto';
        const rightDiv = document.querySelector('.right');
        rightDiv.remove();
        document.querySelector('.enter').remove();
    }
})


submit.addEventListener('click', (event)=>{

    event.preventDefault();
    if (count.value >0){
        const object = {
            id: 'id'+ current.getTime(),
            name : taskName.value,
            count : count.value,
            record : rec,
            rightClick: [],
            positions: [],
            enterPositions: enterPos,
            "date": current.toLocaleString(),
        }
        addData(object);
        callPython(object.id);
    }
    
})

function callPython(id){
    var python = require('child_process').spawn('python', ['hello.py', id]);
    const ptext = document.querySelector('.result');
    python.stdout.on('data',function(data){
        alert('Task Completed Successfully', "Done");
        ptext.innerText = data.toString('utf8')
    });
}



// var obj = {
//     id: 20,
//     name: 'John Doe',
//     time: current.toLocaleString(),
// }
// create funciton if file exists

function addData(obj){
    fs.exists('./asserts/data/input.json', function(exists) {
        if (exists) {
            // read file
            fs.readFile('./asserts/data/input.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    // parse json
                    var dat = JSON.parse(data); //now it an object
                    dat.table.unshift(obj); //add new item to array
                    // write file
                    fs.writeFile('./asserts/data/input.json', JSON.stringify(dat, null, 4), 'utf8', function(err) {
                        if (err) alert("An error ocurred while recording the data" + err.message);
                    }
                    );
                }
            });
        } else {
            var data = {}
            data.table = []
            data.table.unshift(obj);

            fs.writeFile ("./asserts/data/input.json", JSON.stringify(data, null, 4), function(err) {
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