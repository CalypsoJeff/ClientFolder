import { useState } from "react";

const CartPage = () => {
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
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-500 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">
                  Color: {item.color} | Size: {item.size}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    className="bg-gray-300 px-3 py-1 rounded-md"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="mx-3 font-semibold">{item.quantity}</span>
                  <button
                    className="bg-gray-300 px-3 py-1 rounded-md"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="text-red-500 mt-2 hover:underline"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="flex justify-between mt-2">
            <span>Subtotal:</span>
            <span className="font-semibold">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Shipping:</span>
            <span className="font-semibold">Free</span>
          </div>
          <div className="flex justify-between mt-2 text-xl font-bold">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
