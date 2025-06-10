import axios from "axios";
import { uploadtoCloudinary } from "../../Funcs/UploadtoCloudinary";

export function fetchCategories(setCategories, setAllCategories) {
  if (
    typeof setCategories !== "function" &&
    typeof setAllCategories !== "function"
  ) {
    console.warn("fetchCategory: No valid state setters provided.");
    return;
  }

  fetch("http://localhost:8080/SpaceAPI/CategoryCRUD.php")
    .then((res) => res.json())
    .then((data) => {
      const updatedData = data.map((category) => ({
        ...category,
        img: JSON.parse(category.img),
      }));

      console.log(updatedData);

      if (typeof setCategories === "function") setCategories(updatedData);
      if (typeof setAllCategories === "function") setAllCategories(updatedData);
    })
    .catch((err) => console.error("Failed to load categories:", err));
}

export function getCategoryNameFromProductByID(setCategoryName, product) {
  fetch(
    `http://localhost:8080/SpaceAPI/CategoryCRUD.php?id=${product.categoryID}`
  )
    .then((res) => res.json())
    .then((data) => {
      setCategoryName(data.categoryName);
    })
    .catch((err) => {
      console.error("Failed to fetch category name:", err);
    });
}

export function handleCategoryDelete(
  category,
  setLoading,
  fetchCategories,
  setDeleteBox,
  triggerToast
) {
  setLoading(true);
  fetch(
    `http://localhost:8080/SpaceAPI/CategoryCRUD.php?id=${category.categoryID}`,
    {
      method: "DELETE",
    }
  )
    .then(async (response) => {
      setLoading(false);
      const data = await response.json();

      if (response.ok) {
        fetchCategories();
        setDeleteBox(false);
        triggerToast("Category deleted successfully");
      } else if (response.status === 409) {
        // Foreign key constraint — category in use
        triggerToast(
          data.error || "Cannot delete: this category is being used."
        );
      } else {
        triggerToast("Delete failed: " + (data.error || "Unknown error"));
      }
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error deleting category:", error);
      triggerToast("Network or server error occurred.");
    });
}

export async function handleCategoryCreate(
  setLoading,
  imageFile,
  name,
  triggerToast,
  setCreate,
  fetchCategories
) {
  try {
    setLoading(true);

    const uploadedImage = [];

    if (imageFile) {
      const img = await uploadtoCloudinary(imageFile);
      uploadedImage.push(img);
    } else {
      triggerToast("An image is required for the category.");
      setLoading(false);
      return;
    }

    const newCategory = {
      categoryName: name,
      img: uploadedImage,
    };

    await axios.post(
      "http://localhost:8080/SpaceAPI/CategoryCRUD.php",
      newCategory
    );

    triggerToast("Category uploaded successfully!");
    setLoading(false);
    setCreate(false);
    fetchCategories();
  } catch (error) {
    console.error("Category creation error:", error);

    const errorMessage =
      error.response?.data?.error || "Upload failed. Please try again.";
    triggerToast(errorMessage);
    setLoading(false);
  }
}

export async function handleCategoryEdit(
  setLoading,
  category,
  name,
  imageFile,
  triggerToast,
  setEdit,
  fetchCategories
) {
  try {
    setLoading(true);

    let updatedImgArr = category.img;
    let deletedImgs = [];

    if (imageFile) {
      // If there's a new image, upload it
      const newImg = await uploadtoCloudinary(imageFile);

      // If there was an old image, mark it for deletion
      if (category.img && category.img[0] && category.img[0].public_id) {
        deletedImgs.push(category.img[0].public_id);
      }
      updatedImgArr = [newImg];
    }

    const updatedCategory = {
      categoryID: category.categoryID,
      categoryName: name,
      img: updatedImgArr,
      deletedImgs: deletedImgs, // Send public_ids of images to be deleted
    };

    await axios.put(
      "http://localhost:8080/SpaceAPI/CategoryCRUD.php",
      updatedCategory
    );

    triggerToast("Category updated successfully!");
    setLoading(false);
    setEdit(false);
    fetchCategories();
  } catch (error) {
    console.error("Category edit error:", error);
    const errorMessage =
      error.response?.data?.error || "Update failed. Please try again.";
    triggerToast(errorMessage);
    setLoading(false);
  }
}
