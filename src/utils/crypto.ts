import CryptoJS from "crypto-js";

export const handleDecode = (text: string) => {
  // const decoded = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(text));
  const decoded = CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8);
  return decoded;
};
