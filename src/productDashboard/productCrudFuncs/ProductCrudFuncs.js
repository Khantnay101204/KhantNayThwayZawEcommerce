import axios from "axios";
import { uploadtoCloudinary } from "../../Funcs/UploadtoCloudinary";

export function fetchProducts(setProducts, setAllProducts) {
  if (
    typeof setProducts !== "function" &&
    typeof setAllProducts !== "function"
  ) {
    console.warn("fetchProducts: No valid state setters provided.");
    return;
  }

  fetch("http://localhost:8080/SpaceAPI/ProductCRUD.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const updatedData = data.map((product) => ({
        ...product,
        imgArr: JSON.parse(product.imgArr),
      }));

      if (typeof setProducts === "function") {
        setProducts(updatedData);
      }

      if (typeof setAllProducts === "function") {
        setAllProducts(updatedData);
      }
    })
    .catch((error) => console.error("Error fetching products:", error));
}

export function handleProductDelete(
  product,
  setLoading,
  fetchProducts,
  triggerToast,
  setDeleteBox
) {
  setLoading(true);
  fetch(
    `http://localhost:8080/SpaceAPI/ProductCRUD.php?id=${product.productID}`,
    {
      method: "DELETE",
    }
  )
    .then(() => {
      setLoading(false);
      fetchProducts();
      setDeleteBox(false);
      triggerToast("Product deleted successfully");
    })
    .catch((error) => console.error("Error deleting product:", error));
}

export async function handleProductEdit(
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
) {
  try {
    setLoading(true);
    const uploadedObjs = [];
    for (const file of newFiles) {
      const obj = await uploadtoCloudinary(file);
      uploadedObjs.push(obj);
    }

    const finalImgArr = [...images, ...uploadedObjs];

    const deletedImgs = originalImages
      .filter(
        (original) =>
          !finalImgArr.some(
            (current) => current.public_id === original.public_id
          )
      )
      .map((img) => img.public_id); // Only public_id sent to backend

    const updatedProduct = {
      productID: product.productID,
      name,
      category,
      description,
      price,
      stock,
      imgArr: finalImgArr,
      deletedImgs,
    };

    await axios.put(
      "http://localhost:8080/SpaceAPI/ProductCRUD.php",
      updatedProduct
    );

    triggerToast("Product updated successfully");
    setLoading(false);
    setEdit(false);
    fetchProducts();
  } catch (error) {
    console.error("Error updating product:", error);
  }
}

export async function handleProductCreate(
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
) {
  try {
    setLoading(true);

    const uploadedImages = [];
    for (const file of newFiles) {
      const imgObj = await uploadtoCloudinary(file);
      uploadedImages.push(imgObj);
    }

    const newProduct = {
      name,
      category,
      description,
      price,
      stock,
      imgArr: uploadedImages,
    };

    await axios.post(
      "http://localhost:8080/SpaceAPI/ProductCRUD.php",
      newProduct
    );

    triggerToast("Product uploaded successfully!");
    setLoading(false);
    setCreate(false);
    fetchProducts();
  } catch (error) {
    console.error("Upload error:", error);
    triggerToast("Upload failed. Please try again.");
    setLoading(false);
  }
}
