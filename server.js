const express = require('express');
const app = express();
const port = '5000'
app.use(express.static(__dirname + 'public'));
app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});
app.listen(port,function()
{
	console.log('Server Berjalan Pada Port ' + port);
});