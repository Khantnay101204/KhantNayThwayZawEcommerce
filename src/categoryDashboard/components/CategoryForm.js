// src/categoryDashboard/components/CategoryForm.js
import React, { useEffect, useState } from "react";

export default function CategoryForm({
  heading,
  name,
  setName,
  imageFile,
  handleFileChange,
  handleSubmit,
  handleCancel,
  initialImageUrl, // New prop
}) {
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl || null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (initialImageUrl) {
      setPreviewUrl(initialImageUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [imageFile, initialImageUrl]);

  return (
    <div className="categoryForm">
      <h1>{heading}</h1>
      <br />
      <form>
        <label htmlFor="categoryName">Name:</label>
        <input
          id="categoryName"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="categoryImage">Image:</label>
        <input
          id="categoryImage"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files[0])}
        />

        {previewUrl && (
          <div style={{ margin: "10px 0", textAlign: "center" }}>
            <p style={{ marginBottom: "5px", fontSize: "14px", color: "#555" }}>
              Image Preview:
            </p>
            <img
              src={previewUrl}
              alt="Category Preview"
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                height: "auto",
                width: "auto",
                border: "1px solid #ddd",
                borderRadius: "8px",
                objectFit: "contain",
              }}
            />
            {imageFile && (
              <p style={{ fontSize: "12px", color: "#777", marginTop: "5px" }}>
                {imageFile.name}
              </p>
            )}
          </div>
        )}

        <button onClick={handleSubmit}>Save Category</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
