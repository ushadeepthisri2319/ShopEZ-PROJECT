import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow sticky-top"
      style={{
        background: "linear-gradient(90deg,#310dfd,#6a11cb)",
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          🛍️ ShopEZ
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item mx-2">
              <Link className="nav-link text-white fw-semibold" to="/">
                🏠 Home
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link text-white fw-semibold" to="/products">
                🛍️ Products
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-white fw-semibold position-relative"
                    to="/cart"
                  >
                    🛒 Cart
                    {cartCount > 0 && (
                      <span className="badge bg-danger rounded-pill ms-1">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>

                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-white fw-semibold"
                    to="/orders"
                  >
                    📦 Orders
                  </Link>
                </li>

                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-white fw-semibold"
                    to="/profile"
                  >
                    👤 Profile
                  </Link>
                </li>

                {user?.role === "admin" && (
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link text-warning fw-bold"
                      to="/admin"
                    >
                      🛠️ Admin
                    </Link>
                  </li>
                )}

                <li className="nav-item mx-2">
                  <button
                    className="btn btn-danger rounded-pill px-4 fw-bold"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2">
                  <Link
                    className="btn btn-light rounded-pill px-4 fw-bold"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item mx-2">
                  <Link
                    className="btn btn-warning rounded-pill px-4 fw-bold"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;