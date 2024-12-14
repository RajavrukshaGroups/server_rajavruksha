require("dotenv").config();
const User = require("../model/user");
const nodemailer = require("nodemailer");

module.exports.index = async (req, res) => {
  try {
    const allUsers = await User.find({});
    console.log("allusers", allUsers);
    res.status(200).json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error fetching users" });
  }
};

module.exports.createNewForm = async (req, res) => {
  console.log("Function called");
  try {
    const { name, email, contact_no, designation } = req.body;
    console.log(req.body, "Incoming data");

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Please upload a file." });
    }

    const url = file.path;
    const filename = file.filename;

    const newUser = new User({
      name,
      email,
      contact_no,
      designation,
      file: { url, filename },
    });
    await newUser.save();

    console.log("new_user_saved",newUser)

    const recipientEmail = process.env.RECIPIENT_EMAIL;
    const recipientPass = process.env.RECIPIENT_PASS;
    if (!recipientEmail || !recipientPass) {
      throw new Error(
        "Email credentials (RECIPIENT_EMAIL and RECIPIENT_PASS) are not properly configured in the environment."
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: recipientEmail,
        pass: recipientPass,
      },
    });

    const mailOptions = {
      from: `"Career Form" <${recipientEmail}>`,
      to: recipientEmail,
      subject: `Form submitted from ${name}`,
      replyTo: email,
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #333;">New Career Form Submitted</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone No:</strong> ${contact_no}</p>
               <p><strong>Designation:</strong> ${designation}</p>
            <p>Please visit the link below to view the resume:</p>
            <p><a href="${url}" target="_blank">${url}</a></p>
          </div>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "An error occurred: " + err.message });
  }
};
