import { useState, useEffect } from 'react';
import useUser from '@/utils/useUser';

// Sample products (like Jumia) with Unsplash images
const products = [
  {
    name: "Samsung Galaxy S21",
    price: "₦320,000",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    description: "128GB, Dual SIM, Phantom Gray",
    category: "Phones & Tablets"
  },
  {
    name: "Nike Air Max 270",
    price: "₦38,000",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef91?auto=format&fit=crop&w=600&q=80",
    description: "Men's Sneakers, Size 42-46",
    category: "Fashion"
  },
  {
    name: "HP Pavilion 15",
    price: "₦415,000",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    description: "Intel Core i5, 8GB RAM, 512GB SSD",
    category: "Computers"
  },
  {
    name: "Binatone Blender",
    price: "₦17,500",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
    description: "1.5L, 350W, 2-speed",
    category: "Home Appliances"
  },
  {
    name: "Rolex Submariner",
    price: "₦3,200,000",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    description: "Automatic, Stainless Steel",
    category: "Watches"
  },
  {
    name: "Adidas Backpack",
    price: "₦14,000",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    description: "Unisex, Water Resistant",
    category: "Fashion"
  },
];

const categories = [
  "Phones & Tablets",
  "Fashion",
  "Computers",
  "Home Appliances",
  "Watches"
];

function MainComponent() {
  const { data: user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  // Filter logic
  const filteredProducts = products.filter(product => {
    return (
      (!selectedCategory || product.category === selectedCategory) &&
      (!search || product.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Jumia_logo.png/320px-Jumia_logo.png" alt="Logo" className="h-7 w-auto" />
            <span className="text-xl font-bold text-purple-700">MiniJumia</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-gray-700 hover:text-purple-700 font-medium">Home</a>
            <a href="#products" className="text-gray-700 hover:text-purple-700 font-medium">Shop</a>
            <a href="#categories" className="text-gray-700 hover:text-purple-700 font-medium">Categories</a>
            <a href="#contact" className="text-gray-700 hover:text-purple-700 font-medium">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-600 text-sm">Hi, {user.email}</span>
                <a href="/dashboard" className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm">Dashboard</a>
                <a href="/account/logout" className="text-purple-700 hover:underline text-sm">Logout</a>
              </>
            ) : (
              <>
                <a href="/account/signin" className="text-purple-700 hover:underline text-sm">Sign In</a>
                <a href="/account/signup" className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm">Sign Up</a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 py-16 mb-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Products <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Everyday!</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
            Shop quality goods from trusted vendors. Fast delivery, great prices, and secure payment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <a href="#products" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">Shop Now</a>
            <a href="/sell" className="border-2 border-purple-600 text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition">Sell on MiniJumia</a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Categories</h2>
        <div className="flex gap-4 flex-wrap">
          <button
            className={`px-5 py-2 rounded-full border font-medium transition ${
              selectedCategory === "" ? "bg-purple-600 text-white" : "bg-white text-purple-600 border-purple-400"
            }`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full border font-medium transition ${
                selectedCategory === cat ? "bg-purple-600 text-white" : "bg-white text-purple-600 border-purple-400"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-4 mb-6">
        <input
          type="text"
          placeholder="Search product..."
          className="w-full sm:w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </section>

      {/* Products */}
      <section id="products" className="max-w-7xl mx-auto px-4 pb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular Products</h2>
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                <img src={p.image} alt={p.name} className="h-56 object-cover w-full" />
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800">{p.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{p.category}</p>
                  <p className="text-gray-700 mb-3 flex-1">{p.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-purple-700 text-lg font-semibold">{p.price}</span>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm transition">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gradient-to-r from-purple-50 to-pink-50 py-12 mt-10">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6">Questions or need support? Reach out!</p>
          <a href="mailto:support@minijumia.com" className="bg-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-purple-700 transition">Email support@minijumia.com</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Jumia_logo.png/320px-Jumia_logo.png" alt="Logo" className="h-7 w-auto" />
            <span className="text-lg font-bold">MiniJumia</span>
          </div>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MiniJumia. All Rights Reserved.
          </div>
          <nav className="flex gap-4">
            <a href="#" className="hover:text-purple-400">Home</a>
            <a href="#products" className="hover:text-purple-400">Shop</a>
            <a href="#categories" className="hover:text-purple-400">Categories</a>
            <a href="#contact" className="hover:text-purple-400">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;
