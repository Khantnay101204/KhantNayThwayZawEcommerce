import { MenuBtn } from "./MenuBtn";

export function DashboardHeader({ setNevOpen, nevOpen }) {
  return (
    <div className="dashboardHeader">
      <MenuBtn setNevOpen={setNevOpen} nevOpen={nevOpen} />
    </div>
  );
}
