export const uploadToCloudinary = async (file, folder = "chat-assets") => {
  const formData = new FormData();
  formData.append("file", file);

  // ✅ Use your actual preset from dashboard
  formData.append("upload_preset", "chat-audios"); // Must match what you created
  formData.append("folder", folder);

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dm3tyavtg/auto/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Cloudinary upload failed:", data);
    throw new Error(data.error?.message || "Upload failed");
  }

  return data;
};
