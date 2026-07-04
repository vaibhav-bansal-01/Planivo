import logo from "../../assets/Planivo_Logo.png";

function Logo({ className = "w-24" }) {
  return (
    <img
      src={logo}
      alt="Planivo Logo"
      className={`object-contain ${className}`}
    />
  );
}

export default Logo;
