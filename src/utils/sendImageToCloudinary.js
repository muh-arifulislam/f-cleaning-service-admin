export const sendImageToCloudinary = async (formData) => {
  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dmiorpsf7/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();

    if (data.secure_url) {
      return data;
    } else {
      throw new Error("Failed to upload image to cloudinary");
    }
  } catch (err) {
    throw new Error(err?.message);
  }
};
