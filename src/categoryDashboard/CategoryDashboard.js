import { useEffect, useState } from "react";
import ControlBar from "../component/ControlBar";
import DashboardHeading from "../component/DashboardHeading";
import CategoryList from "./CategoryList";
import ToastMessage from "../component/ToastMessage";
import { fetchCategories } from "./categoryCrudFuncs/CategoryCrudFuncs";
import CategoryInsertBox from "./CategoryInsertBox";

export default function CategoryDashboard({
  toastMsg,
  showToast,
  setShowToast,
  triggerToast,
}) {
  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [create, setCreate] = useState(false);

  const refresh = () => {
    fetchCategories(setCategories, setAllCategories);
  };
  useEffect(() => {
    fetchCategories(setCategories, setAllCategories);
  }, []);

  return (
    <div className="categoryDashboard">
      <DashboardHeading string={"Category Dashboard"} />
      <ControlBar
        setCreate={setCreate}
        create={create}
        allObjs={allCategories}
        setObjs={setCategories}
        fetchObjs={refresh}
        objName={"categoryName"}
      >
        <CategoryInsertBox
          setCreate={setCreate}
          triggerToast={triggerToast}
          fetchCategories={refresh}
        />
      </ControlBar>
      <CategoryList
        triggerToast={triggerToast}
        categories={categories}
        fetchCategories={refresh}
      />
      {showToast && (
        <ToastMessage message={toastMsg} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
