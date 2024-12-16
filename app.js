require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });
const usersRouter = require("./Routes/userRoutes.js");
const { createNewForm } = require("./controlller/userController.js");
const {
  saveContactDetails,
  contactMail,
} = require("./controlller/contactController.js");
const {
  careerDetails,
  getIndCareerDetails,
} = require("./controlller/careerController.js");

const app = express();
const port = process.env.PORT || 4000;

// MongoDB connection
const cluster_url =
  "mongodb+srv://enquiry:mHpnVFW1fNgdla8h@cluster0.osdmv.mongodb.net/";
mongoose
  .connect(cluster_url)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(cors({ origin: "https://rajavrukshagroup.in" }));
// app.use(cors({ origin: 'http://localhost:3038' }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => res.send("Hello, World!"));
app.use("/", usersRouter);
app.post("/careerForm", upload.single("file"), createNewForm);
app.post("/savecontact", saveContactDetails);
app.post("/contact", contactMail);
app.get("/getCareerDetails", careerDetails);
app.get("/getCareerIndDetails/:id", getIndCareerDetails);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
