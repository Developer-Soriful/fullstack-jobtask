export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="border rounded shadow p-4 flex flex-col justify-between">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2 rounded" />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-green-600 font-semibold">${product.price}</p>
            <button
                onClick={() => onAddToCart(product)}
                className="mt-2 bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
            >
                Add to Cart
            </button>
        </div>
    );
}
