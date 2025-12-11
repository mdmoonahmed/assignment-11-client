import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const Forbidden = () => {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0d0d0d] text-white px-4">
      <AlertTriangle size={70} className="text-red-500 mb-4" />

      <h1 className="text-4xl font-bold mb-2">Forbidden Route.</h1>

      <p className="text-gray-400 mb-4">
         You are not allowed to access this page.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
