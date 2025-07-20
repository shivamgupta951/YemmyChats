// backend/lib/encrypt.js
import crypto from "crypto";

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;

// ✅ Ensure key is exactly 32 bytes
const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update(String(ENCRYPTION_SECRET))
  .digest(); // returns a 32-byte Buffer

const IV_LENGTH = 16; // For AES, IV is always 16

export const encryptMessage = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

export const decryptMessage = (encryptedText) => {
  const [ivHex, encrypted] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
