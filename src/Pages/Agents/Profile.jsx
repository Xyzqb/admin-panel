const BASE_URL = "https://digidialersuperadmin.onrender.com";

const ProfilePic = (profilePic) => {
  // no image
  if (!profilePic || typeof profilePic !== "string" || profilePic.trim() === "") {
    return "";
  }

  // already a full URL
  if (profilePic.startsWith("http")) {
    return profilePic;
  }

  // base64 data URI
  if (profilePic.startsWith("data:")) {
    return profilePic;
  }

  // file extensions check (optional, just for clarity)
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const lower = profilePic.toLowerCase();
  const hasValidExt = validExtensions.some((ext) => lower.endsWith(ext));

  // If relative path like /uploads/image.jpg
  if (hasValidExt || profilePic.startsWith("/")) {
    return `${BASE_URL}${profilePic.startsWith("/") ? "" : "/"}${profilePic}`;
  }

  // otherwise return empty (not a valid image)
  return "";
};

export default ProfilePic;
