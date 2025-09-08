import { useEffect, useState } from "react";
import axiosInstance from "../src/api/axios";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        id: "",
        name: "",
        category: "",
        price: "",
        image: "",
        description: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const res = await axiosInstance.get("/items");
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch products");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add new product
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/items", form);
            setForm({ id: "", name: "", category: "", price: "", image: "", description: "" });
            fetchProducts();
            alert("Product added successfully");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to add product");
        }
    };

    // Edit product
    const handleEdit = (product) => {
        setForm({
            id: product._id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            description: product.description || "",
        });
        setIsEditing(true);
    };

    // Update product
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/items/${form.id}`, form);
            setForm({ id: "", name: "", category: "", price: "", image: "", description: "" });
            setIsEditing(false);
            fetchProducts();
            alert("Product updated successfully");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to update product");
        }
    };

    // Delete product
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axiosInstance.delete(`/items/${id}`);
            fetchProducts();
            alert("Product deleted successfully");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to delete product");
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">Admin Product Management</h2>

            {/* Form */}
            <form
                onSubmit={isEditing ? handleUpdate : handleAdd}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-100 rounded shadow"
            >
                <input
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    required
                />
                <input
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    required
                />
                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                    required
                />
                <input
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                    className="p-2 border rounded w-full"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="p-2 border rounded w-full col-span-2"
                />
                <button
                    type="submit"
                    className={`col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700`}
                >
                    {isEditing ? "Update Product" : "Add Product"}
                </button>
            </form>

            {/* Products Table */}
            <table className="min-w-full border rounded shadow">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Category</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Image</th>
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p._id} className="text-center">
                            <td className="p-2 border">{p.name}</td>
                            <td className="p-2 border">{p.category}</td>
                            <td className="p-2 border">${p.price}</td>
                            <td className="p-2 border">
                                {p.image ? <img src={p.image} alt={p.name} className="w-16 h-16 object-cover mx-auto" /> : "N/A"}
                            </td>
                            <td className="p-2 border">{p.description || "N/A"}</td>
                            <td className="p-2 border space-x-2">
                                <button
                                    onClick={() => handleEdit(p)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(p._id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
