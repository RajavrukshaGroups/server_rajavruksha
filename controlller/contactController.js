require("dotenv").config();
const Contact = require("../model/contact");
const nodemailer = require("nodemailer");

module.exports.saveContactDetails = async (req, res) => {
  try {
    const { name, lastname, email, subject, notes } = req.body;
    const newContactDetail = new Contact({
      name,
      email,
      lastname,
      subject,
      notes,
    });
    console.log("new_contact", newContactDetail);
  } catch (err) {
    console.log(err);
  }
};


module.exports.contactMail = async (req, res) => {
  console.log("function called");
  console.log("req_body", req.body);
  const { name, lastName = "", email, message, phone_no, isModal,project } = req.body;
  const recipientEmail = process.env.RECIPIENT_EMAIL;
  const recipientPass = process.env.RECIPIENT_PASS;
  if (!recipientEmail || !recipientPass) {
    throw new Error(
      "Email credentials (RECIPIENT_EMAIL and RECIPIENT_PASS) are not properly configured in the environment."
    );
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "Invalid or missing name." });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  if (!isModal) {
    if (
      !lastName ||
      typeof lastName !== "string" ||
      lastName.trim().length === 0
    ) {
      return res.status(400).json({ error: "Invalid or missing last name." });
    }
    if (!phone_no || !/^\d{10}$/.test(phone_no)) {
      return res
        .status(400)
        .json({ error: "Invalid phone number. Must be 10 digits." });
    }
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({ error: "Message cannot be empty." });
    }
  }

  let emailContact;
  if (!!isModal) {
    emailContact = `
       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Contact Request For ${project}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contact Number:</strong> ${phone_no}</p>
      </div>
    `;
  } else {
    emailContact = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Contact Request</h2>
          <p><strong>Name:</strong> ${name} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone No:</strong> ${phone_no}</p>
          <h3 style="color: #555;">Message:</h3>
          <p style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9;">${message}</p>
      </div>
    `;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: recipientEmail,
      pass: recipientPass,
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: recipientEmail,
    subject: `New Contact Request from ${name}${
      lastName ? " " + lastName : ""
    }`,
    replyTo: email,
    html: emailContact,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending message. Please try again later.");
  }
};
