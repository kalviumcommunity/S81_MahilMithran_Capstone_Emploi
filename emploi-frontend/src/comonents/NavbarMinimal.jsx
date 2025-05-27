  import { Link } from "react-router-dom";

  const NavbarMinimal = () => {
    return (
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          EMPLOI
        </div>

        {/* Login Button */}
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </nav>
    );
  };

  export default NavbarMinimal;
