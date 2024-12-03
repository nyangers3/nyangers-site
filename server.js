// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');

// Initialize express
const app = express();
const port = 3000;

// Set up AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // S3 upload parameters
  const params = {
    Bucket: process.env.S3_BUCKET_NAME, // Your S3 bucket name
    Key: `${Date.now()}-${req.file.originalname}`, // Unique file name
    Body: req.file.buffer, // File buffer
    ContentType: req.file.mimetype, // Content type (e.g., image/jpeg)
    // Note: We are not using ACL here, relying on IAM roles/bucket policies
    // ACL: 'public-read', // This line is optional and can be omitted if not needed
  };

  try {
    const data = await s3.upload(params).promise();
    console.log('File uploaded successfully:', data);
    res.status(200).send({ message: 'File uploaded successfully', data });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route set up to serve the /bar-photo-album path
app.get('/bar-photo-album', (req, res) => {
    res.sendFile(path.join(__dirname, 'bar-photo-album', 'index.html'));
});

// Express is set up to serve static files correctly
app.use(express.static(path.join(__dirname, 'bar-photo-album')));

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});