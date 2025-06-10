import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import ToastMessage from "../component/ToastMessage";
import DashboardHeading from "../component/DashboardHeading";
import ProductInsertBox from "./ProductInsertBox";
import ControlBar from "../component/ControlBar";
import { fetchProducts } from "./productCrudFuncs/ProductCrudFuncs";

export function ProductDashboard({
  toastMsg,
  showToast,
  setShowToast,
  triggerToast,
}) {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [create, setCreate] = useState(false);

  const refresh = () => {
    fetchProducts(setProducts, setAllProducts);
  };
  useEffect(() => {
    fetchProducts(setProducts, setAllProducts);
  }, []);

  return (
    <div className="productDashboard">
      <DashboardHeading string={"Product Dashboard"} />
      <ControlBar
        setCreate={setCreate}
        create={create}
        allObjs={allProducts}
        setObjs={setProducts}
        fetchObjs={refresh}
        objName={"productName"}
      >
        <ProductInsertBox
          triggerToast={triggerToast}
          setCreate={setCreate}
          fetchProducts={refresh}
        />
      </ControlBar>
      <ProductList
        triggerToast={triggerToast}
        products={products}
        fetchProducts={refresh}
      />
      {showToast && (
        <ToastMessage message={toastMsg} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
