import { DashboardHeader } from "./DashboardHeader";

export function Dashboard({ setNevOpen, nevOpen, children }) {
  return (
    <div className="dashboard">
      <DashboardHeader setNevOpen={setNevOpen} nevOpen={nevOpen} />
      {children}
    </div>
  );
}
