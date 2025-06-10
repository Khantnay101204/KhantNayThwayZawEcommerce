import { useState } from "react";
import { ProductForm } from "./components/ProductForm";
import Loader from "../component/Loader";
import { handleProductCreate } from "./productCrudFuncs/ProductCrudFuncs";

export default function ProductInsertBox({
  setCreate,
  fetchProducts,
  triggerToast,
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]); // image objects with url and public_id
  const [newFiles, setNewFiles] = useState([]); // raw files to upload

  const handleCancel = (event) => {
    event.preventDefault();
    setCreate(false);
  };

  const handleFileChange = (files) => {
    setNewFiles([...newFiles, ...Array.from(files)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !category ||
      !description.trim() ||
      !price ||
      !stock ||
      newFiles.length === 0
    ) {
      triggerToast(
        "Please fill in all the fields and select at least one image."
      );
      return;
    } else if (price < 0 || stock < 0) {
      triggerToast("Price and Stock cannot be negative");
      return;
    }
    handleProductCreate(
      setLoading,
      newFiles,
      name,
      category,
      description,
      price,
      stock,
      triggerToast,
      setCreate,
      fetchProducts
    );
  };

  return (
    <div>
      <ProductForm
        heading={"Create Product"}
        name={name}
        category={category}
        description={description}
        price={price}
        stock={stock}
        images={images.map((img) => img.url)} // just show URLs
        setName={setName}
        setCategory={setCategory}
        setDescription={setDescription}
        setPrice={setPrice}
        setStock={setStock}
        setImages={setImages}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleFileChange={handleFileChange}
        newlySelectedFiles={newFiles}
      />
      {loading && <Loader />}
    </div>
  );
}
