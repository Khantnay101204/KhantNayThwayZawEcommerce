import { useState, useEffect } from "react";
import { ProductForm } from "./components/ProductForm";
import Loader from "../component/Loader";
import { handleProductEdit } from "./productCrudFuncs/ProductCrudFuncs";

export function ProductEditBox({
  product,
  setEdit,
  fetchProducts,
  triggerToast,
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]); // Array of { url, public_id }
  const [originalImages, setOriginalImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    setName(product.productName);
    setCategory(product.categoryID);
    setDescription(product.description);
    setPrice(product.price);
    setStock(product.stock);

    const parsedImages = Array.isArray(product.imgArr)
      ? product.imgArr
      : JSON.parse(product.imgArr);
    setImages(parsedImages);
    setOriginalImages(parsedImages);
  }, [product]);

  const handleImageRemove = (e, index) => {
    e.preventDefault();
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleFileChange = (files) => {
    setNewFiles([...newFiles, ...Array.from(files)]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !category ||
      !description.trim() ||
      !price ||
      !stock ||
      (images.length === 0 && newFiles.length === 0)
    ) {
      triggerToast(
        "Please fill in all the fields and select at least one image."
      );
      return;
    } else if (price < 0 || stock < 0) {
      triggerToast("Price and Stock cannot be negative");
      return;
    }
    handleProductEdit(
      setLoading,
      newFiles,
      images,
      product,
      name,
      category,
      description,
      price,
      stock,
      originalImages,
      triggerToast,
      setEdit,
      fetchProducts
    );
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setEdit(false);
  };

  return (
    <div>
      <ProductForm
        name={name}
        category={category}
        description={description}
        price={price}
        stock={stock}
        images={images}
        setName={setName}
        setCategory={setCategory}
        setDescription={setDescription}
        setPrice={setPrice}
        setStock={setStock}
        setImages={setImages}
        handleFileChange={handleFileChange}
        handleImageRemove={handleImageRemove}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        heading={"Edit Product"}
        newlySelectedFiles={newFiles}
      />
      {loading && <Loader />}
    </div>
  );
}
