import CreateBtn from "./CreateBtn";
import { ModelBox } from "./ModelBox";
import SearchBar from "./SearchBar";

export default function ControlBar({
  allObjs,
  setObjs,
  children,
  setCreate,
  create,
  objName,
}) {
  return (
    <div className="controlBar">
      <SearchBar allObjs={allObjs} setObjs={setObjs} objName={objName} />
      <CreateBtn setCreate={setCreate} />
      {create && <ModelBox>{children}</ModelBox>}
    </div>
  );
}
