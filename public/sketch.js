// Create a variable to hold our map
var myMap;
// Create a variable to hold our canvas
var canvas;
// Create a new Mappa instance using Leaflet.
var mappa = new Mappa('Leaflet');

var poliLat = 0;
var poliLon = 0;

var myLoc;

var capture;

var sensates = 0;

var socket;

var options = {
  lat: 0,
  lng: 0,
  zoom: 2.5,
  minZoom: 2,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

var riley, wolf, kala, caph, sun, lito, nomi, will, logo;
//p5.js preload
function preload() {
  myLoc = getCurrentPosition();
  riley = loadImage("assets/01Riley.png");
  wolf = loadImage("assets/02Wolf.png");
  kala = loadImage("assets/03Kala.png");
  caph = loadImage("assets/04Capheus.png");
  sun = loadImage("assets/05Sun.png");
  lito = loadImage("assets/06Lito.png");
  nomi = loadImage("assets/07Nomi.png");
  will = loadImage("assets/08Will.png");
  logo = loadImage("assets/Logo.webp");
}

// p5.js setup
function setup() {
  socket = io();
  console.log('socket:', socket.id);

  socket.on("mouseBroadcast", newDrawing);

  function newDrawing(receivedData) {

  avatar;
  }

  canvas = createCanvas(windowWidth, windowHeight);

  print(myLoc.latitude, myLoc.longitude);

  textAlign(CENTER, CENTER);
  textSize(40);
  text("Join the sensates", width / 2, height * 1 / 5);
  textSize(20);
  text("Enter your name", width / 2, height * 1 / 5 + 40);

  input = createInput();
  input.position(width / 2, height * 2 / 5);
  input.center('horizontal');
  button = createButton('submit');
  button.position(input.x + input.width, input.y);
  button.mousePressed(entering);
}
// p5.js draw
function draw() {

  imageMode(CENTER);
  if (sensates == 1) {
    clear();
    //Riley is in Reijkiavik
    var rileyPos = myMap.latLngToPixel(64.1334735, -21.9224814);
    image(riley, rileyPos.x, rileyPos.y, 50, 50);

    //Wolfgang is in Berlin
    var wolfPos = myMap.latLngToPixel(52.5065133, 13.1445527);
    image(wolf, wolfPos.x, wolfPos.y, 50, 50);

    //Kala is in Mumbai
    var kalaPos = myMap.latLngToPixel(19.0821978, 72.7410993);
    image(kala, kalaPos.x, kalaPos.y, 50, 50);

    //Capheus is in Nairobi
    var caphPos = myMap.latLngToPixel(-1.3032051, 36.7073093);
    image(caph, caphPos.x, caphPos.y, 50, 50);

    //Sun is in Seoul
    var sunPos = myMap.latLngToPixel(37.5650172, 126.849465);
    image(sun, sunPos.x, sunPos.y, 50, 50);

    //Lito is in Mexico City
    var litoPos = myMap.latLngToPixel(19.39068, -99.2836995);
    image(lito, litoPos.x, litoPos.y, 50, 50);

    //Nomi is in San Francisco
    var nomiPos = myMap.latLngToPixel(37.7576793, -122.5076402);
    image(nomi, nomiPos.x, nomiPos.y, 50, 50);

    //Will is in Chicago
    var willPos = myMap.latLngToPixel(41.8333925, -88.01215);
    image(will, willPos.x, willPos.y, 50, 50);

    var myPos = myMap.latLngToPixel(myLoc.latitude, myLoc.longitude);
    var avatar = image(capture, myPos.x, myPos.y, 80, 60);

    var sendData = {
      image: avatar
    }
    socket.emit('camera', sendData);
  }
}

entering = function() {
  options.lat = myLoc.latitude;
  options.lng = myLoc.longitude;

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  capture = createCapture(VIDEO);
  capture.size(40, 30);
  capture.hide();

  sensates = 1;
}
