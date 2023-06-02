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

const uploads = multer({storage})

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

app.post("/api/fileanalyse", async (req,res) => {

})