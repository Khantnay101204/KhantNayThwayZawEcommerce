// src/categoryDashboard/CategoryEditBox.js
import { useState, useEffect } from "react";
import CategoryForm from "./components/CategoryForm";
import Loader from "../component/Loader";
import { handleCategoryEdit } from "./categoryCrudFuncs/CategoryCrudFuncs";

export default function CategoryEditBox({
  category,
  setEdit,
  fetchCategories,
  triggerToast,
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [initialImageUrl, setInitialImageUrl] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.categoryName);
      if (category.img && category.img[0] && category.img[0].url) {
        setInitialImageUrl(category.img[0].url);
      }
    }
  }, [category]);

  const handleFileChange = (selectedFile) => {
    setImageFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      triggerToast("Please enter a category name.");
      return;
    }

    await handleCategoryEdit(
      setLoading,
      category,
      name,
      imageFile,
      triggerToast,
      setEdit,
      fetchCategories
    );
  };

  const handleCancel = (event) => {
    if (event) event.preventDefault();
    setEdit(false);
  };

  return (
    <div>
      <CategoryForm
        heading={"Edit Category"}
        name={name}
        setName={setName}
        imageFile={imageFile}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        initialImageUrl={initialImageUrl}
      />
      {loading && <Loader />}
    </div>
  );
}
