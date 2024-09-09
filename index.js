const port = 4004;
const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const tasks = require('./routes/routes');
const connectDB = require('./db/connect');

app.use(express.json());
app.use(cors());
// routes
app.use('/',tasks);

app.get('/',(req,res)=>{
    res.send('Express App is running');
})
// Image Storage Engine

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.file}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})
// Creating Upload for images
app.use('/images',express.static('upload/images'));
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
const start = async () => {
    try {
      await connectDB('mongodb://localhost:27017/CarRent');
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
};  
start();