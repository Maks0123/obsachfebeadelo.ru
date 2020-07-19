

const express = require("express");
const path = require('path');
const app = express();
const router = express.Router();
var port = process.env.PORT || 5000;




app.use(express.static('public'));

router.get("/", function(request, response){
  response.sendFile(path.join(__dirname, "/public/index.html"));
});


app.listen(port, function(request, response){
  console.log("Listening on " + port);
});


module.exports = router;