function ProductCard({ product }) {
  return (
    <div className="card p-3 m-2">
      <h4>{product?.name || "Product Name"}</h4>
      <p>₹ {product?.price || 0}</p>

      <button className="btn btn-primary">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;