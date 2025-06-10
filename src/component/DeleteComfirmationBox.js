import Loader from "../component/Loader";

export function DeleteComfirmationBox({
  handleDelete,
  setDeleteBox,
  loading,
  objName,
}) {
  return (
    <div className="deleteConfirmationBox">
      <p>Are you sure you want to delete this {objName}?</p>
      <div className="deleteConfirmationBtn">
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => setDeleteBox(false)}>No</button>
      </div>

      {loading && <Loader />}
    </div>
  );
}
