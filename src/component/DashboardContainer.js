import { useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { HomeDashboard } from "../HomeDashboard";
import { ProductDashboard } from "../productDashboard/ProductDashboard";
import { NevItems } from "./NevItems";
import { Dashboard } from "./Dashboard";
import { DashboardNevigation } from "./DashboardNevigation";
import CategoryDashboard from "../categoryDashboard/CategoryDashboard";

export function DashboardContainer() {
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
  };
  const [nevOpen, setNevOpen] = useState(true);

  const location = useLocation();
  const { hash, pathname, search } = location;

  return (
    <div className="dashboardContainer">
      <DashboardNevigation
        className={nevOpen ? "" : "dashboardNevigation--closed"}
      >
        <NevItems pathname={pathname} path="/" itemName={"Home"} />
        <NevItems pathname={pathname} path="/product" itemName={"Product"} />
        <NevItems pathname={pathname} path="/category" itemName={"Category"} />
        <NevItems pathname={pathname} itemName={"Customers"} />
        <NevItems pathname={pathname} itemName={"Orders"} />
      </DashboardNevigation>
      <Dashboard setNevOpen={setNevOpen} nevOpen={nevOpen}>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route
            path="/product"
            element={
              <ProductDashboard
                toastMsg={toastMsg}
                showToast={showToast}
                setShowToast={setShowToast}
                triggerToast={triggerToast}
              />
            }
          />
          <Route
            path="/category"
            element={
              <CategoryDashboard
                toastMsg={toastMsg}
                showToast={showToast}
                setShowToast={setShowToast}
                triggerToast={triggerToast}
              />
            }
          />
        </Routes>
      </Dashboard>
    </div>
  );
}
