export default function Filters({ categories, selectedCategory, onCategoryChange }) {
    return (
        <div className="mb-4 flex space-x-4">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`px-3 py-1 rounded ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
