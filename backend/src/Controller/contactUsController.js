const ContactUs = require('../Models/contactUs'); // Ensure this model is created

// Handle contact form submissions
exports.submitContactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save the contact message
    const contactMessage = new ContactUs({
      name,
      email,
      message,
    });

    await contactMessage.save();
    res.status(200).json({ success: 'Your message has been sent' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handle fetching contact messages (admin only)
exports.getContactMessages = async (req, res) => {
  try {
    const messages = await ContactUs.find().sort({ createdAt: -1 }); // Fetch messages, sorted by latest first
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
