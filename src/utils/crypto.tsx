import React, { useState } from "react";
import CryptoJS from "crypto-js";

const CryptoExample = () => {
  const [textToEncode, setTextToEncode] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [decodedText, setDecodedText] = useState("");

  const handleEncode = () => {
    const encoded = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(textToEncode)
    );
    setEncodedText(encoded);
  };

  const handleDecode = () => {
    const decoded = CryptoJS.enc.Utf8.stringify(
      CryptoJS.enc.Base64.parse(encodedText)
    );
    setDecodedText(decoded);
  };

  return (
    <div>
      <input
        type="text"
        value={textToEncode}
        onChange={(e) => setTextToEncode(e.target.value)}
        placeholder="Enter text to encode"
      />
      <button onClick={handleEncode}>Encode to Base64</button>
      <p>Encoded Text: {encodedText}</p>

      <button onClick={handleDecode}>Decode Base64</button>
      <p>Decoded Text: {decodedText}</p>
    </div>
  );
};

export default CryptoExample;
