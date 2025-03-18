"use client";
import { useState } from "react";
import crypto from "crypto";

const MD5HashGenerator = () => {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");

  const generateHash = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const md5Hash = crypto
        .createHash("md5")
        .update(input.trim())
        .digest("hex");
      setHash(md5Hash);
    } else {
      setHash("Please enter a valid string.");
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "50px", fontFamily: "Arial" }}>
      <h2>Dynamic MD5 Hash Generator</h2>
      <form onSubmit={generateHash}>
        <input
          type="text"
          placeholder="Enter text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
          required
        />
        <button type="submit" style={{ padding: "10px", fontSize: "16px" }}>
          Generate MD5
        </button>
      </form>

      {hash && (
        <div style={{ marginTop: "20px", fontSize: "18px", color: "green" }}>
          <strong>MD5 Hash:</strong> {hash}
        </div>
      )}
    </div>
  );
};

export default MD5HashGenerator;
