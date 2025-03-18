import React, { useState } from "react";
import { Link } from "react-router-dom";

const Carts = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Blue Denim Shirt",
      color: "Blue",
      size: "M",
      price: 17.99,
      quantity: 1,
      image:
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp",
    },
    {
      id: 2,
      name: "Red Hoodie",
      color: "Red",
      size: "M",
      price: 17.99,
      quantity: 1,
      image:
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/13a.webp",
    },
  ]);

  const handleQuantityChange = (id, amount) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 py-10">
      <div className="container mx-auto px-4 lg:px-20">
        <h2 className="text-center text-3xl text-white font-bold mb-6">
          Your Cart
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4 mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1 px-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Color: {item.color}</p>
                    <p className="text-gray-600 text-sm">Size: {item.size}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    ❌
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <div className="border-b pb-4 mb-4">
              <p className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </p>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 mt-4 rounded-md">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carts;
