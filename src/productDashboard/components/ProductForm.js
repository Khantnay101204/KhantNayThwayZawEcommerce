import { useEffect, useState } from "react";
import { ImgArrPreview } from "./ImgArrPreview"; //
import { fetchCategories } from "../../categoryDashboard/categoryCrudFuncs/CategoryCrudFuncs"; //

export function ProductForm({
  name,
  category,
  description,
  price,
  stock,
  images, // For existing images (especially in Edit mode)
  setName,
  setCategory,
  setDescription,
  setPrice,
  setStock,
  setImages,
  handleFileChange, // Handler from parent to manage new file selections
  handleImageRemove, // Handler for removing existing images (used by ImgArrPreview)
  handleSubmit,
  handleCancel,
  heading,
  newlySelectedFiles, // New prop: Array of File objects for preview
  // You might also need a handler to remove a newly selected file from the preview,
  // e.g., handleRemoveNewFile(index) which would call a function in the parent
  // to update the parent's 'newFiles' state. For simplicity, this is not added here yet.
}) {
  const [categories, setCategoriesState] = useState([]); // Renamed to avoid conflict if 'setCategories' prop was intended
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    // In the original code, this was fetchCategories(setCategories).
    // Assuming setCategories was meant to be the local state setter.
    fetchCategories(setCategoriesState); //
  }, []);

  useEffect(() => {
    if (!newlySelectedFiles || newlySelectedFiles.length === 0) {
      setPreviewUrls([]);
      return;
    }

    const newUrls = newlySelectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newUrls);

    // Cleanup function to revoke object URLs when component unmounts or files change
    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newlySelectedFiles]);

  // This internal handleImageChange is only called if handleFileChange (from parent) is not provided.
  // Given ProductInsertBox and ProductEditBox provide handleFileChange, this is likely not used.
  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    // If setImages is intended to handle File objects for previewing directly here
    // (and not just existing image URLs/objects), this could be used.
    // However, the current pattern uses parent's 'newFiles' state.
    if (setImages) {
      // setImages is a prop passed from parent.
      setImages(files); // This would try to set the parent's 'images' state to File objects.
    }
  }

  return (
    <div className="productForm">
      {" "}
      {/* */}
      <h1>{heading}</h1> {/* */}
      <br />
      <form>
        {" "}
        {/* */}
        <label>Name:</label> {/* */}
        <input
          value={name} //
          type="text"
          onChange={(e) => setName(e.target.value)} //
        ></input>
        <label>Category:</label> {/* */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {" "}
          {/* */}
          <option value="">-- Select Category --</option> {/* */}
          {categories.map(
            (
              cat //
            ) => (
              <option key={cat.categoryID} value={cat.categoryID}>
                {" "}
                {/* */}
                {cat.categoryName} {/* */}
              </option>
            )
          )}
        </select>
        <label>Description:</label> {/* */}
        <textarea
          rows={5} //
          value={description} //
          style={{ resize: "none" }} //
          onChange={(e) => setDescription(e.target.value)} //
        ></textarea>
        <label>Price:</label> {/* */}
        <input
          value={price} //
          type="number"
          onChange={(e) => setPrice(e.target.value)} //
          onWheel={(e) => e.target.blur()} //
        ></input>
        <label>Stock:</label> {/* */}
        <input
          value={stock} //
          type="number"
          onChange={(e) => setStock(e.target.value)} //
          onWheel={(e) => e.target.blur()} //
        ></input>
        <label>Images:</label> {/* */}
        {/* Preview for existing images (in Edit mode) */}
        {heading === "Edit Product" &&
          images &&
          images.length > 0 && ( //
            <ImgArrPreview
              images={images} //
              setImages={setImages} //
              handleImageRemove={handleImageRemove} //
            />
          )}
        {/* Preview for newly selected files */}
        {previewUrls && previewUrls.length > 0 && (
          <div
            className="newFilesPreview"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
              border: "1px dashed #ccc",
              padding: "10px",
            }}
          >
            {previewUrls.map((url, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  border: "1px solid #eee",
                  padding: "5px",
                }}
              >
                <img
                  src={url}
                  alt={`New file preview ${idx + 1}`}
                  style={{ height: "70px", width: "auto", display: "block" }}
                />
                {newlySelectedFiles && newlySelectedFiles[idx] && (
                  <span
                    style={{
                      fontSize: "10px",
                      display: "block",
                      textAlign: "center",
                      wordBreak: "break-all",
                    }}
                  >
                    {newlySelectedFiles[idx].name}
                  </span>
                )}
                {/* Optional: Add a button here to remove this specific new file preview */}
                {/* e.g., <button type="button" onClick={() => handleRemoveNewFile(idx)}>X</button> */}
              </div>
            ))}
          </div>
        )}
        <input
          type="file" //
          multiple //
          onChange={
            (e) =>
              handleFileChange //
                ? handleFileChange(e.target.files) // This comes from parent (ProductInsertBox/ProductEditBox)
                : handleImageChange(e) // Internal fallback, likely not used if parent provides handleFileChange
          }
        />
        <button type="button" onClick={handleSubmit}>
          Save
        </button>{" "}
        {/* */}
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>{" "}
        {/* */}
      </form>
    </div>
  );
}
