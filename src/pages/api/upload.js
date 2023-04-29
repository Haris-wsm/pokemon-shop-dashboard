import cloudinary from "cloudinary";

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: "dxokhqbyi",
  api_key: "476195656616579",
  api_secret: "avGeCxF0g28gNwPLeIq_ta9M4CE",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // Return an error response for non-POST requests
    return res
      .status(400)
      .json({ error: "Invalid request method. Only POST is allowed." });
  }

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      // Apply the resizing transformation options to the upload
      transformation: [
        // Add your desired resizing options here
        { width: 800, height: 800, crop: "limit" },
      ],
    });

    // Send the Cloudinary upload result as JSON response
    res.status(200).json(result);
  } catch (error) {
    // Handle Cloudinary upload error
    res.status(500).json({ error: "Failed to upload image to Cloudinary." });
  }
}
