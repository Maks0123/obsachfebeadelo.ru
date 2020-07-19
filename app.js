const express = require("express");
const path = require('path');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mailer = require('./nodemailer')
var port = process.env.PORT || 5000;
let user = undefined



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
router.get("/", function(request, response){
  response.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/", (req, res) => {
  if(!req.body.username || !req.body.email) return res.sendStatus(400)
  const message = {
     to: req.body.email,
     subject: `Some text`,
     html: `
     <h2>Some text </h2>
     <i>Some text </i>
     <ul>
          <li> login:  ${req.body.username}</li>
          <li> password ${req.body.email} </li>
     </ul>     
     ${req.body.oferta ? `Вы подписаны на рассылку наших акций и предложений,
        чтобы отписаться от рассылки перейдите по ссылке
        <a href="http://localhost:5000/${req.body.email}">отписаться от рассылки</a>` : ''}
        <p>Данное письмо не требует ответа.<p> `
   }
  mailer(message)
  user = req.body
  res.redirect('/')
  
});

app.get("/", (req, res) => {
  if(typeof user !== 'object' ) return res.sendfile(__dirname + '/public/index.html' )
  res.send(`Registration successful ${user.email}`)
  user = undefined
})




app.listen(port, function(request, response){
  console.log("Listening on " + port);
});


module.exports = router;



// action="https://obsachfebeadelo.ru/registration.php"