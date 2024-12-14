require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const { storage } = require('./cloudConfig.js');
const upload = multer({ storage });
const usersRouter = require('./Routes/userRoutes');
const contactRouter = require('./Routes/contactRoutes');
const { createNewForm } = require('./controlller/userController');
const { saveContactDetails, contactMail } = require('./controlller/contactController');
const {careerDetails, getIndCareerDetails}=require("./controlller/careerController.js");

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
const cluster_url = 'mongodb+srv://enquiry:mHpnVFW1fNgdla8h@cluster0.osdmv.mongodb.net/';
// mongoose
//   .connect(cluster_url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Database connected'))
//   .catch((err) => console.log(err));
 
  mongoose.connect(cluster_url)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err)); 

 
// Middleware
app.use(cors({ origin: 'https://rajavrukshagroup.in' }));
// app.use(cors({ origin: 'http://localhost:3038' }));
app.use(express.json());
app.use(express.static('public'));
  
// Routes   
app.get('/', (req, res) => res.send('Hello, World!'));
app.use('/', usersRouter);
app.post('/careerForm', upload.single('file'), createNewForm);
app.post('/savecontact', saveContactDetails);
app.post('/contact', contactMail);
app.get("/getCareerDetails",careerDetails);
app.get("/getCareerIndDetails/:id",getIndCareerDetails);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});   

module.exports = app;
  


// require('dotenv').config()
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const mongoose = require('mongoose')
// const multer = require("multer")
// const { storage } = require('./cloudConfig.js')
// const upload = multer({ storage })
// const nodemailer = require("nodemailer")
// const port = 3000;

// const usersRouter = require("./Routes/userRoutes");
// const { createNewForm } = require('./controlller/userController');
// const contactRouter = require("./Routes/contactRoutes");
// const { saveContactDetails, contactMail } = require('./controlller/contactController');
// // connect to db
// let cluster_url = 'mongodb+srv://enquiry:mHpnVFW1fNgdla8h@cluster0.osdmv.mongodb.net/'
// // MongoDB connection 
// mongoose.connect(cluster_url)
//     .then(() => console.log("Database connected"))
//     .catch((err) => console.log(err));



// // Middleware
// app.use(cors({
//   // origin: 'http://localhost:3038'
//   origin: 'https://rajavruksha-front-end-test.vercel.app'
// }));
// app.use(express.json());
// app.use(express.static('public'));
// // app.use(express.static('uploads'));  // Serve uploaded files

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.use('/', usersRouter)
// app.post("/careerForm", upload.single("file"), createNewForm);
// app.post('/savecontact', saveContactDetails)
// app.post('/contact', contactMail);


// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
  