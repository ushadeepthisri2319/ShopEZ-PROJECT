import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="text-white mt-5"
      style={{
        background: "linear-gradient(90deg,#310dfd,#6a11cb)",
      }}
    >
      <div className="container py-5">
        <div className="row text-center text-md-start">

          <div className="col-md-4 mb-4">
            <h3 className="fw-bold">🛍️ ShopEZ</h3>

            <p className="mt-3">
              Your one-stop online shopping destination for
              Mobiles, Laptops, Electronics and Fashion products.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>

            <p>
              <Link
                to="/"
                className="text-white text-decoration-none"
              >
                🏠 Home
              </Link>
            </p>

            <p>
              <Link
                to="/products"
                className="text-white text-decoration-none"
              >
                🛍️ Products
              </Link>
            </p>

            <p>
              <Link
                to="/cart"
                className="text-white text-decoration-none"
              >
                🛒 Cart
              </Link>
            </p>

            <p>
              <Link
                to="/orders"
                className="text-white text-decoration-none"
              >
                📦 Orders
              </Link>
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contact</h5>

            <p>📧 support@shopez.com</p>
            <p>🌐 www.shopez.com</p>
            <p>📍 India</p>
          </div>

        </div>

        <hr className="border-light" />

        <p className="text-center mb-0">
          © 2026 <strong>ShopEZ</strong>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;