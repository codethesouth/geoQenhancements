var http = require('http');
var recArray = require('./police_hq_to_alcom.json');
var rta = recArray.recordedTrack;

var options = {
  host: 'localhost',
  //host: ,
  port: 5000, //if you are using a non-standard port number
  path: 'api/v1/setlocation',
  headers: {'Content-Type' : 'application/json'},
  method: 'POST'
};

var callback = function(response) {
  var str = 'response: ';
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

var callit = function(id, latv,lonv) {
  var rawData = {id:id,lat:latv,lon:lonv};
  var data = JSON.stringify(rawData);
  console.log('---> ' + data);

  var req = http.request(options, callback); 
  req.write(data);
  req.end();          
} 
 
var i = 0;
var len = rta.length; 
(function myLoop (i) {          
   setTimeout(function () {   
      callit("54",rta[i][0],rta[i][1]);          //  your code here                
      if ((++i) - len) myLoop(i);      //  decrement i and call myLoop again if i > 0
   }, 2000)
})(i); 