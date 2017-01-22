function init() {
    //create new canvas object to increase scope
    var canvas = new fabric.Canvas('sheet');
    document.getElementById("sheet").fabric = canvas;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = "#ff0000";

    // get the data from the URL
    var data = getURLParams();
    if(data) {
        firebase.database().ref('/canvases/' + data.src).once('value').then(function(snapshot) {
            var dataURL = snapshot.val().dataURL;
            // load it into the canvas
            var img = new Image();
            img.onload = function() {
                var fabricImage = new fabric.Image(img);
                canvas.add(fabricImage);
            };
            img.src = dataURL;
        });
    }
}

function getURLParams(){
    // get the data from the URL
    var paramString = window.location.search;
    var searchParams = new URLSearchParams(paramString);
    var data = JSON.parse(searchParams.get("data"));
    return data;
}

function erase() {
    var m = confirm("Clear?");
    if (m) {
        document.getElementById("sheet").fabric.clear();
    }
}

function save() {
    var data = getURLParams();
    var key;
    if(data) {
        key = data.src;
    } else {
        key = firebase.database().ref().child('canvases').push().key;
    }
    // call done and pass it the image url of the canvas
    updates = {};
    updates['/canvases/'+key] = {dataURL: document.getElementById("sheet").fabric.toDataURL()};
    firebase.database().ref()
        .update(updates)
        .then(function() {
        Mixmax.done({src: key});
    }).catch(function(error) {
        Mixmax.console.error(error);
    });
}

function color(obj) {
    sheet = document.getElementById("sheet").fabric;
    sheet.freeDrawingBrush.color = obj.id;
}

// load an image into the canvas
function handleFiles(files) {
    sheet = document.getElementById("sheet").fabric;
    file = files[0];
    var reader = new FileReader();
    reader.onload = function() {
        var dataURL = reader.result;
        // load it into the canvas
        var img = new Image();
        img.onload = function() {
            var fabricImage = new fabric.Image(img);
            sheet.add(fabricImage);
        };
        img.src = dataURL;
    };
    reader.readAsDataURL(file);
}

function outputUpdate(width_num) {
    document.querySelector('#width').value = width_num;
    sheet = document.getElementById("sheet").fabric;
    sheet.freeDrawingBrush.width = width_num;
}
