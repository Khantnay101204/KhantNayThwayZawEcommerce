import { useState } from "react";
import CategoryForm from "./components/CategoryForm";
import Loader from "../component/Loader";
import { handleCategoryCreate } from "./categoryCrudFuncs/CategoryCrudFuncs";

export default function CategoryInsertBox({
  setCreate,
  fetchCategories,
  triggerToast,
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to hold the selected File object

  // Handles canceling the form, closes the modal
  const handleCancel = (event) => {
    if (event) event.preventDefault(); // Prevent default if it's a form button click
    setCreate(false); // Close the create modal
  };

  // Updates the imageFile state when a file is selected in the input
  const handleFileChange = (selectedFile) => {
    setImageFile(selectedFile);
  };

  // Handles the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default browser form submission

    // Basic validation
    if (!name.trim() || !imageFile) {
      triggerToast("Please enter a category name and select an image.");
      return;
    }

    await handleCategoryCreate(
      setLoading,
      imageFile,
      name,
      triggerToast,
      setCreate,
      fetchCategories
    );
  };

  return (
    <div>
      {/* Renders the CategoryForm, passing all required props */}
      <CategoryForm
        heading={"Create Category"}
        name={name}
        setName={setName}
        imageFile={imageFile} // Pass the selected image file for preview
        handleFileChange={handleFileChange} // Pass the file change handler
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
      {/* Shows a loader if loading state is true */}
      {loading && <Loader />}
    </div>
  );
}
