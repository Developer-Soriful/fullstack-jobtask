import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/AuthContext.jsx";
import axiosInstance from "../api/axios.js";

export default function Cart() {
    const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
    const [backendCart, setBackendCart] = useState([]);

    // Fetch cart from backend
    const fetchCart = async () => {
        try {
            const res = await axiosInstance.get("/cart");
            setBackendCart(res.data);
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Remove item from cart
    const handleRemove = async (itemId) => {
        try {
            await axiosInstance.delete(`/cart/${itemId}`);
            setBackendCart(backendCart.filter((ci) => ci.item._id !== itemId));
            removeFromCart(itemId);
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    // Clear entire cart
    const handleClearCart = async () => {
        try {
            await axiosInstance.delete("/cart"); // backend clears all for the user
            setBackendCart([]);
            clearCart();
        } catch (err) {
            console.error("Error clearing cart:", err);
        }
    };

    const totalPrice = backendCart.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>

            {backendCart.length === 0 ? (
                <p className="text-gray-600 text-lg">Cart is empty</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-2 border">Product</th>
                                <th className="px-4 py-2 border">Quantity</th>
                                <th className="px-4 py-2 border">Price</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {backendCart.map((ci) => (
                                <tr key={ci.item._id} className="text-center hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{ci.item.name}</td>
                                    <td className="px-4 py-2 border">{ci.quantity}</td>
                                    <td className="px-4 py-2 border">${ci.item.price * ci.quantity}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => handleRemove(ci.item._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-6 flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-gray-800">Total: ${totalPrice}</h3>
                        <button
                            onClick={handleClearCart}
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
