var express = require('express');
var cors = require('cors');
var bp = require('body-parser');
var multer = require('multer');
require('dotenv').config()

var app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public'); // Specify the folder where files should be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });
app.use(cors());
app.use(bp.urlencoded({extended:true}));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  console.log("hi")
  let name=req.file.filename
  let type=req.file.mimetype
  let size=req.file.size
  console.log(name)
  console.log(type)
  console.log(size)
  res.json({name:name,type:type,size:size})
  
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
