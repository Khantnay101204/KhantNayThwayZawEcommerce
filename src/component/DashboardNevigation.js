import { DashboardNevigationLogo } from "./DashboardNevigationLogo";

export function DashboardNevigation({ children, className }) {
  return (
    <div className={`dashboardNevigation ${className}`}>
      <DashboardNevigationLogo />
      {children}
    </div>
  );
}
