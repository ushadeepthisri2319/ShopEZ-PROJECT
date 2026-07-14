import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  // Allow only admins
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const emptyProduct = {
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  };

  const [product, setProduct] = useState(emptyProduct);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/products/${editId}`, product);
        alert("Product updated successfully");
      } else {
        await API.post("/products", product);
        alert("Product added successfully");
      }

      setProduct(emptyProduct);
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const editProduct = (item) => {
    setProduct(item);
    setEditId(item._id);
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary fw-bold mb-4">
        🛠️ Admin Dashboard
      </h2>

      <div className="card shadow-lg border-0 rounded-4 p-4 mb-5 admin-card">
        <h4 className="mb-3">
          {editId ? "✏️ Update Product" : "➕ Add New Product"}
        </h4>

        <form onSubmit={saveProduct}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
          />

          <button className="btn btn-success w-100">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      <h3 className="fw-bold mb-4">📦 All Products</h3>

      <div className="row">
        {products.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card shadow-lg border-0 rounded-4 h-100 admin-card">
              <img
                src={item.image || "https://via.placeholder.com/300"}
                className="card-img-top"
                alt={item.name}
                style={{
                  height: "220px",
                  width: "100%",
                  objectFit: "contain",
                  backgroundColor: "#f8f9fa",
                  padding: "10px",
                }}
              />

              <div className="card-body">
                <h5 className="fw-bold">{item.name}</h5>

                <p className="text-muted">{item.description}</p>

                <h5 className="text-success">₹{item.price}</h5>

                <p>
                  <strong>Category:</strong> {item.category}
                </p>

                <span
                  className={`badge ${
                    item.stock > 0 ? "bg-success" : "bg-danger"
                  }`}
                >
                  {item.stock > 0
                    ? `In Stock (${item.stock})`
                    : "Out of Stock"}
                </span>

                <div className="mt-3">
                  <button
                    className="btn btn-primary rounded-pill me-2 px-4"
                    onClick={() => editProduct(item)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="btn btn-danger rounded-pill px-4"
                    onClick={() => deleteProduct(item._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;