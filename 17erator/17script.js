var genNum = "17 ";
var speed = 1;
var gibberish = "";
var count;
var count2;
var x;
var number;
var r;
var g;
var b;
var vowels = "AEIOUYaeiouy";
var other = "                                          !\"#$%&\'*+,-.01234567890123456789?@\\~BCDFGHJKLMNPQRSTVWXZbcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZbcdfghjklmnpqrstvwxz";
function generate() {
  x = document.getElementById("input").value;
  number = document.getElementById("newNum").value;
  count = 0;
  count2 = 0;
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
  number = document.getElementById("newNum").value;
  if (number == "") {
    alert("Can not generate nothing");
  } else {
    document.getElementById("title").innerHTML = number + "erator";
    genNum = number + " ";
    document.getElementById("title").innerHTML = number + "erator";
    document.getElementById("maker").innerHTML = "Generate " + number + "s";
    document.getElementById("here").innerHTML = "The " + number + "s will appear here:";
    document.getElementById("speedLabel").innerHTML = "Speed (if you change the speed, the amount of " + number + "s will be a multiple of the speed)";
  }
}

function del() {
  $("#generated").empty();
}

function newColor() {
  var color1 = document.getElementById("color").value;
  if (isNaN(color1)) {
    document.body.style.background = color1;
  } else {
    r = document.getElementById("r").value;
    g = document.getElementById("g").value;
    b = document.getElementById("b").value;
    var bc = "rgb(" + r + "," + g + "," + b + ")";
    document.body.style.background = bc;
  }
}

function newTc() {
  var color2 = document.getElementById("color").value;
  if (isNaN(color2)) {
    document.getElementById("see").style.color = color2;
  } else {
    r = document.getElementById("r").value;
    g = document.getElementById("g").value;
    b = document.getElementById("b").value;
    var tc = "rgb(" + r + "," + g + "," + b + ")";
    document.body.style.color = tc;
  }
}

function newFont() {
  var font = document.getElementById("font").value;
  document.body.style.fontFamily = font;
}

function newFs() {
  var size = document.getElementById("size").value;
  size += "px";
  document.body.style.fontSize = size;
}

function generateImage() {
  x = document.getElementById("amount").value;
  var source = document.getElementById("imageSrc").value;
  var width = document.getElementById("imageWidth").value;
  var height = document.getElementById("imageHeight").value;
  count = 0;
  count2 = 0;
  speed = document.getElementById("speed").value;
  while (count2 < speed) {
    while (count < x / speed) {
      var img = new Image();
      img.src = source;
      img.width = width;
      img.height = height;
      document.getElementById("generated").appendChild(img);
      $("<span> </span>").appendTo("#generated");
      count++;
    }
    count2++;
  }
}

function generateGibberish() {
  x = document.getElementById("amountGibb").value;
  count = 0;
  count2 = 0;
  while (count2 < speed) {
    while (count < x / speed) {
      var rand = Math.random();
      if (rand > 0.75) {
        gibberish = vowels.charAt(Math.floor(Math.random() * vowels.length));
      }
      else {
        gibberish = other.charAt(Math.floor(Math.random() * other.length));
      }
      $("<span>" + gibberish + "</span>").appendTo("#generated");
      count++;
    }
    count2++;
  }
}

function showAbout() {
    var about = document.getElementById("about");
    about.classList.toggle("show");
}

function showCredits() {
  var credits = document.getElementById("credits");
  credits.classList.toggle("show");
}
