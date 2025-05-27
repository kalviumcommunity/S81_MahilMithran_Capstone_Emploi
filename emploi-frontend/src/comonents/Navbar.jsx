  import { Link } from "react-router-dom";

  const Navbar = () => {
    return (
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">
          EMPLOI
        </div>

        <div className="space-x-6">
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600">
            Jobs
          </Link>
          <Link to="/browse" className="text-gray-700 hover:text-blue-600">
            Browse
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600">
            Profile
          </Link>
        </div>
      </nav>
    );
  };

  export default Navbar;
