const path = require('path')
const multer = require('multer');
const express = require('express');
const { exec } = require("child_process");
const bodyParser = require('body-parser');
const {PythonShell} = require("python-shell");



const app = express();


app.use(bodyParser.json());
  

//creating a folder named uploads to save the files there
var storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads');
   },
   filename: function (req, file, cb) {
      cb(null, '' + file.originalname);
   }
});

var upload = multer({ storage: storage });
   

//the uploading api 
app.post('/img', upload.single('image'), (req, res) => {
   const image = req.image;
    //(async () => await predict()) ()
    predict(res)
});

//predicting the letter or number given to the machine
function predict(res) {
   remove_background()
   PythonShell.run(path.join(__dirname, 'main.py'), null, function (err, result){
      console.log(result[0])
      res.send(result[0])
   })
}

function remove_background(){
   exec('backgroundremover -i "uploads/image.png" -o "uploads/crop.jpg"', (error, stdout, stderr) => {
      
   });
}

  
//listening to the port we will be using
app.listen(6741,() =>{
  console.log('Server started on port 9000...');
});
