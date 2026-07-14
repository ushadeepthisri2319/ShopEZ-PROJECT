import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function ProductDetails() {

  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response = await API.get(`/products/${id}`);
        setProduct(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProduct();

  }, [id]);

  const addToCart = async () => {

    if (!user) {
      alert("Please login first");
      return;
    }

    try {

      await API.post("/cart", {

        user: user._id,

        products: [
          {
            product: id,
            quantity: 1,
          },
        ],

      });

      alert("Added to Cart");

    } catch (error) {

      console.log(error);
      alert("Failed to add cart");

    }

  };

  if (!product) {

    return (
      <h3 className="text-center mt-5">
        Loading...
      </h3>
    );

  }

  return (

    <div className="container mt-5">

      <div className="card shadow-lg border-0 product-details-card">

        <div className="row g-0">

          <div className="col-md-6">

            <img
              src={product.image || "https://via.placeholder.com/500"}
              alt={product.name}
              className="img-fluid rounded-start product-details-image"
              style={{
                height: "500px",
                width: "100%",
                objectFit: "contain",
              }}
            />

          </div>

          <div className="col-md-6">

            <div className="card-body p-4">

              <h2 className="fw-bold">
                {product.name}
              </h2>

              <p className="text-muted">
                {product.description}
              </p>

              <h3 className="text-success fw-bold">
                ₹{product.price}
              </h3>

              <p>
                <strong>Category:</strong> {product.category}
              </p>

              <p>
                <strong>Available Stock:</strong> {product.stock}
              </p>

              <div className="mb-3">

                <span className="badge bg-warning text-dark me-2">
                  ⭐ 4.8 Rating
                </span>

                <span
                  className={`badge ${
                    product.stock > 0
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {product.stock > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </span>

              </div>
              <ul className="list-group mb-4">

                <li className="list-group-item">
                  🚚 Free Delivery Available
                </li>

                <li className="list-group-item">
                  🔒 100% Secure Payment
                </li>

                <li className="list-group-item">
                  🔄 7 Days Easy Return
                </li>

              </ul>

              <button
                className="btn btn-primary btn-lg w-100"
                onClick={addToCart}
                disabled={product.stock === 0}
              >
                🛒 Add to Cart
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProductDetails;