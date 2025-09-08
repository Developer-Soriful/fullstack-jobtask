import { useState, useEffect, useContext } from "react";
import Filters from "../components/Filters.jsx";
import axiosInstance from "../api/axios.js";
import { CartContext } from "../context/AuthContext.jsx";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("all");
    const { addToCart: addToCartContext } = useContext(CartContext);

    const categories = ["all", "electronics", "clothes", "books"];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axiosInstance.get("/items", category !== "all" ? { params: { category } } : {});
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();
    }, [category]);

    const handleAddToCart = async (productId) => {
        try {
            await axiosInstance.post("/cart", { itemId: productId, quantity: 1 });
            addToCartContext(productId, 1);
            alert("Added to cart");
        } catch (err) {
            console.error("Error adding to cart:", err);
            alert(err.response?.data?.message || "Failed to add to cart");
        }
    };

    return (
        <div className="px-4 py-6 w-full flex flex-col gap-10">
            {/* Filters Section */}
            <div className="mb-6">
                <Filters categories={categories} selectedCategory={category} onCategoryChange={setCategory} />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {products.map((p) => (
                    <div
                        key={p._id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src={p.image || "https://via.placeholder.com/300"}
                                alt={p.name}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4 flex flex-col justify-between h-56">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 truncate">{p.name}</h3>
                                <p className="text-gray-500 text-sm mt-1">{p.category}</p>
                                <p className="text-blue-600 font-bold text-xl mt-2">${p.price}</p>
                            </div>
                            <button
                                onClick={() => handleAddToCart(p._id)}
                                className="mt-4 w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
                            >
                                <AiOutlineShoppingCart className="mr-2" /> Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
