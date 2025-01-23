import Header from "../../components/user/Header";
import Landing from "../../components/user/Landing";
import Products from "../../components/user/Products";

const Home = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    {/* Header */}
    <Header />

    {/* Main Content */}
    <main className="flex flex-col">
      {/* Landing Section */}
      <Landing />

      {/* Products Section */}
      <div className="w-full px-4 py-8 sm:py-12 lg:py-16">
        <Products />
      </div>
    </main>
  </div>
);

export default Home;
