require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

// middleware to store files in a folder
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploads = multer({ storage: fileStorageEngine })

app.post("/api/fileanalyse", uploads.single('upfile'), async (req,res) => { // for single file
// app.post("/api/fileanalyse", uploads.array('upfile'), async (req, res) => { // for multiple files, don't forget to add multiple next to name="upfile" in index.html
  // console.log(req.file);
  // console.log(req.files);
  res.json({ name: req.file.filenames, type: req.file.mimetypes, size: req.file.sizes, });
    // res.send({uploaded: req.files});
});
