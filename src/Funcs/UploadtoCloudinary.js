import axios from "axios";

export async function uploadtoCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Cloudinary Test"); // Change to your preset
  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dcf6uwi8b/image/upload",
    formData
  );
  return { url: res.data.secure_url, public_id: res.data.public_id };
}
