import { useNavigate } from "react-router-dom";

export function NevItems({ itemName, path, pathname }) {
  function handleOnclick() {
    navigate(path);
  }
  const navigate = useNavigate();
  return (
    <div
      className={`nevItems ${pathname === path ? "nevSelected" : ""}`}
      onClick={handleOnclick}
    >
      <p>{itemName}</p>
    </div>
  );
}
