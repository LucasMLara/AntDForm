import CryptoJS from "crypto-js";

export const handleEncode = (text: string) => {
  const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
  return encoded;
};

export const handleDecode = (text: string) => {
  const decoded = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(text));
  return decoded;
};
