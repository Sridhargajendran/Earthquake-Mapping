var mapimg;

var clat = 0;
var clon = 0;
//17.3850° N, 78.4867° E
var lat = 17.385;
var lon = 78.4867;
var zoom = 1;
var earthquakes;

function preload() {
  mapimg = loadImage(
    "https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoic3JpZGhhcmdhamVuZHJhbiIsImEiOiJjanR3dHVlc3MyYm9vNDRtczEwY2dvNzIwIn0.RPdDcKnVHmTyVcxJxoUnzw"
  );
  earthquakes = loadStrings(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv"
  );
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(1024, 512);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);
  for (var i = 0; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    var x = mercX(data[2]) - cx;
    var y = mercY(data[1]) - cy;
    var mag = data[4];

    mag = pow(10, mag);
    mag = sqrt(mag);

    var magmax = sqrt(pow(10, 10));

    var d = map(mag, 0, magmax, 0, 500);

    fill(255, 0, 200, 100);
    ellipse(x, y, d, d);
  }

  //var x = mercX(lon) - cx;
  //var y = mercY(lat) - cy;
}
