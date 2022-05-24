var genNum = "17 ";
var speed = 2;
function generate() {
    var x = document.getElementById("input").value;
    var number = document.getElementById("newNum").value;
    var count = 0;
    var count2 = 0;
    speed = document.getElementById("speed").value;
    while (count2 < speed) {
        while (count < x / speed) {
            $("<span>" + genNum + "</span>").appendTo("#generated");
            count++;
        }
        count = 0;
        count2++;
    }
}
function newNum() {
    var number = document.getElementById("newNum").value;
    if (number === "") {
        alert("Can not generate nothing");
    } else {
        document.getElementById("title").innerHTML = number + "erator";
        genNum = number + " ";
        document.getElementById("maker").innerHTML = "Generate " + number + "s";
        document.getElementById("here").innerHTML = "The " + number + "'s will appear here:"
        document.getElementById("speedLabel").innerHTML = "Speed (if you change the speed, the amount of " + number + "'s will be a multiple of the speed)"
    }
}
function newColor() {
    var color1 = document.getElementById("color").value;
    if (isNaN(color1)) {
        document.body.style.background = color1;
    } else {
        var r = document.getElementById("r").value;
        var g = document.getElementById("g").value;
        var b = document.getElementById("b").value;
        var bc = "rgb(" + r + "," + g + "," + b + ")";
        document.body.style.background = bc;
    }
}
function newTc() {
    var color2 = document.getElementById("color").value;
    if (isNaN(color2)) {
        document.getElementById("see").style.color = color2;
    } else {
        var r = document.getElementById("r").value;
        var g = document.getElementById("g").value;
        var b = document.getElementById("b").value;
        var tc = "rgb(" + r + "," + g + "," + b + ")";
        document.getElementById("see").style.color = tc;
        document.getElementById("generated").style.color = tc;
    }
}
function generateImage() {
    x = document.getElementById("amount").value;
    var image = document.getElementById("imageSrc").value;
    var width = document.getElementById("imageWidth").value;
    var height = document.getElementById("imageHeight").value;
    count = 0;
    count2 = 0;
    speed = document.getElementById("speed").value;
    while (count2 < speed) {
        while (count < x / speed) {
            var img = new Image();
            img.src = image;
            img.width = width;
            img.height = height;
            document.body.appendChild(img);
            var write1 = document.createTextNode(" ");
            document.body.appendChild(write1);
            count++;
        }
        count2++;
    }
}
function newFs() {
    var size = document.getElementById("size").value;
    size += "px"
    document.body.style.fontSize = size;
}
function copy() {
    var copyThing = document.querySelector('#generated');
    var range = document.createRange();
    range.selectNode(copyThing);
    window.getSelection().addRange(range);
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
    window.getSelection().removeRange(range);
}
