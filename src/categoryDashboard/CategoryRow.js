// src/categoryDashboard/CategoryRow.js

import { useState } from "react";
import { EditnDelete } from "../component/EditnDelete";
import { ModelBox } from "../component/ModelBox";
import { DeleteComfirmationBox } from "../component/DeleteComfirmationBox";
import { handleCategoryDelete } from "./categoryCrudFuncs/CategoryCrudFuncs";
import CategoryEditBox from "./CategoryEditBox"; // Import CategoryEditBox

export default function CategoryRow({
  category,
  fetchCategories,
  triggerToast,
}) {
  const [deleteBox, setDeleteBox] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    handleCategoryDelete(
      category,
      setLoading,
      fetchCategories,
      setDeleteBox,
      triggerToast
    );
  };

  return (
    <tr>
      <td>
        <div className="categoryImage">
          <img src={category.img[0].url} alt={category.categoryName} />
        </div>
      </td>
      <td>{category.categoryName}</td>
      <td>
        <div className="productRowActionsBtn">
          <EditnDelete setEdit={setEdit} setDeleteBox={setDeleteBox} />

          {edit && (
            <ModelBox>
              <CategoryEditBox
                category={category}
                setEdit={setEdit}
                fetchCategories={fetchCategories}
                triggerToast={triggerToast}
              />
            </ModelBox>
          )}
          {deleteBox && (
            <ModelBox>
              <DeleteComfirmationBox
                loading={loading}
                setDeleteBox={setDeleteBox}
                objName={"Category"}
                handleDelete={handleDelete}
              />
            </ModelBox>
          )}
        </div>
      </td>
    </tr>
  );
}
