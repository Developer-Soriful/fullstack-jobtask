import { Link, useNavigate } from "react-router";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">MyShop</div>
            <div className="space-x-4 flex items-center">
                <Link to="/products" className="hover:underline">Products</Link>
                {token && (
                    <>
                        <Link to="/cart" className="hover:underline">Cart</Link>
                        <Link to="/adminPanel" className="hover:underline">Admin Panel</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </>
                )}
                {!token && (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/signup" className="hover:underline">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
