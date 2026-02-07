import React, { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("Ready to upload");

  const uploadFile = async () => {
    if (!file) return;

    const s3Client = new S3Client({
      region: "ap-northeast-1",
      credentials: {
        accessKeyId: "YOUR_ACCESS_KEY_ID",
        secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
      },
    });

    try {
      setStatus("Uploading...");

      const fileArrayBuffer = await file.arrayBuffer();

      const command = new PutObjectCommand({
        Bucket: "YOUR_S3_BUCKET_NAME",
        Key: file.name,
        Body: new Uint8Array(fileArrayBuffer), 
        ContentType: file.type,
      });

      await s3Client.send(command);
      setStatus(`Success! File "${file.name}" uploaded.`);
    } catch (error: any) {
      console.error("Error details:", error);
      setStatus(`Upload Failed: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>AWS DVA Hands-on: S3 Uploader</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ marginBottom: "20px" }}
        />
        <br />
        <button
          onClick={uploadFile}
          disabled={!file}
          style={{
            padding: "10px 20px",
            backgroundColor: file ? "#232f3e" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: file ? "pointer" : "not-allowed",
          }}
        >
          Upload to S3
        </button>
      </div>
      <p
        style={{
          marginTop: "20px",
          fontWeight: "bold",
          color: status.includes("Success") ? "green" : "black",
        }}
      >
        Status: {status}
      </p>
    </div>
  );
};

export default App;
