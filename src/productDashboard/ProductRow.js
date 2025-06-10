import { useState, useEffect } from "react";
import { EditnDelete } from "../component/EditnDelete";
import { ProductEditBox } from "./ProductEditBox";
import { ModelBox } from "../component/ModelBox";
import { DeleteComfirmationBox } from "../component/DeleteComfirmationBox";
import { handleProductDelete } from "./productCrudFuncs/ProductCrudFuncs";
import { getCategoryNameFromProductByID } from "../categoryDashboard/categoryCrudFuncs/CategoryCrudFuncs";

export default function ProductRow({ product, fetchProducts, triggerToast }) {
  const [deleteBox, setDeleteBox] = useState(false);
  const [edit, setEdit] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product.categoryID) {
      getCategoryNameFromProductByID(setCategoryName, product);
    }
  }, [product]);

  return (
    <tr>
      <td>
        <div className="productRowImages">
          {product.imgArr.map((img, idx) => (
            <img src={img.url} alt={`product-${idx}`} key={idx} />
          ))}
        </div>
      </td>
      <td>{product.productName}</td>
      <td>{categoryName || "Loading..."}</td>
      <td>{product.price}</td>
      <td>{product.stock}</td>
      <td>
        <div className="productRowActionsBtn">
          <EditnDelete setEdit={setEdit} setDeleteBox={setDeleteBox} />

          {edit && (
            <ModelBox>
              <ProductEditBox
                product={product}
                setEdit={setEdit}
                fetchProducts={fetchProducts}
                triggerToast={triggerToast}
              />
            </ModelBox>
          )}
          {deleteBox && (
            <ModelBox>
              <DeleteComfirmationBox
                loading={loading}
                setDeleteBox={setDeleteBox}
                handleDelete={() =>
                  handleProductDelete(
                    product,
                    setLoading,
                    fetchProducts,
                    triggerToast,
                    setDeleteBox
                  )
                }
                objName={"Product"}
                triggerToast={triggerToast}
              />
            </ModelBox>
          )}
        </div>
      </td>
    </tr>
  );
}
