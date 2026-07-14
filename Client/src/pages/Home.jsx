import { Link } from "react-router-dom";

function Home() {

  const categories = [
    {
      name: "Mobiles",
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    },
    {
      name: "Laptops",
      category: "Laptop",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    },
    {
      name: "Electronics",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    },
    {
      name: "Fashion",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
    },
    {
    name: "Games",
    category: "Games",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600",
    },
  ];

  return (
    <div className="container mt-4">

      {/* Hero Section */}
      <div
        className="rounded shadow text-white p-5 mb-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "350px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="fw-bold display-4">
          Welcome to ShopEZ 🛍️
        </h1>

        <p className="fs-5 mt-3">
          Shop the latest Mobiles, Laptops, Electronics and Fashion products at the best prices.
        </p>

        <Link to="/products">
          <button className="btn btn-warning btn-lg mt-3">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Categories */}
      <h2 className="text-center fw-bold mb-4">
        Shop By Category
      </h2>

      <div className="row">

        {categories.map((item) => (

          <div
            className="col-md-3 mb-4"
            key={item.category}
          >

            <Link
              to={`/products?category=${item.category}`}
              style={{ textDecoration: "none" }}
            >

              <div
                className="card shadow h-100 border-0 category-card"
                style={{
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "content",
                  }}
                />

                <div className="card-body text-center">

                  <h5 className="fw-bold">
                    {item.name}
                  </h5>

                  <p className="text-muted">
                    Explore the latest collection
                  </p>

                </div>

              </div>

            </Link>

          </div>

        ))}

      </div>

      {/* Features */}
      <h2 className="text-center fw-bold mt-5 mb-4">
        Why Choose ShopEZ?
      </h2>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 h-100 text-center p-4">
            <h1>🚚</h1>
            <h4 className="fw-bold">
              Fast Delivery
            </h4>
            <p className="text-muted">
              Get your orders delivered quickly and safely to your doorstep.
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 h-100 text-center p-4">
            <h1>💳</h1>
            <h4 className="fw-bold">
              Secure Payment
            </h4>
            <p className="text-muted">
              Safe and secure online payment methods for worry-free shopping.
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 h-100 text-center p-4">
            <h1>⭐</h1>
            <h4 className="fw-bold">
              Best Quality
            </h4>
            <p className="text-muted">
              Genuine products with the best quality and affordable prices.
            </p>
          </div>
        </div>

      </div>

      {/* Shopping Banner */}
    <div className="bg-primary text-white text-center rounded shadow p-5 mt-5 mb-5">

      <h2 className="fw-bold">
       🛍️ Explore Latest Collections!
      </h2>

      <p className="fs-5">
        Discover mobiles, laptops, electronics and fashion products at great prices.
      </p>

      <Link to="/products">
       <button className="btn btn-warning btn-lg">
           Shop Now
       </button>
     </Link>

    </div>
  </div>
  );
}

export default Home;