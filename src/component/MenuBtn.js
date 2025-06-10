export function MenuBtn({ setNevOpen, nevOpen }) {
  return (
    <div className="menuBtn">
      <svg
        onClick={() => setNevOpen(!nevOpen)}
        xmlns="http://www.w3.org/2000/svg"
        color="black"
        width="40"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-menu-icon lucide-menu"
      >
        <path d="M4 12h16" />
        <path d="M4 18h16" />
        <path d="M4 6h16" />
      </svg>
    </div>
  );
}
