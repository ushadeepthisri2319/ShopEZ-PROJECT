import { useEffect, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Products() {

  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");



  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await API.get("/products");


        if (category) {

          setProducts(
            response.data.filter(
              (product) =>
                product.category === category
            )
          );

        } else {

          setProducts(response.data);

        }


      } catch(error) {

        console.log(error);

      }

    };


    fetchProducts();


  }, [category]);




  const addToCart = async (productId) => {


    if(!user){

      alert("Please login first");
      return;

    }



    try{


      await API.post("/cart",{

        user:user._id,

        products:[

          {

            product:productId,
            quantity:1

          }

        ]

      });


      alert("Added to Cart 🛒");


    }catch(error){

      console.log(error);
      alert("Failed to add to cart");

    }


  };




  return (

    <div className="container mt-5">


      <h2 className="text-center fw-bold text-primary mb-4">

        {category ? `${category} Products` : "All Products"} 🛍️

      </h2>



      <div className="row mb-5">

        <div className="col-md-6 mx-auto">

          <input

            className="form-control shadow-sm"

            placeholder="🔍 Search products..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

          />

        </div>

      </div>




      <div className="row">


      {
        products

        .filter((product)=>

          product.name
          .toLowerCase()
          .includes(search.toLowerCase())

        )

        .map((product)=>(



          <div
            className="col-md-4 mb-4"
            key={product._id}
          >



            <div
              className="card h-100 border-0 shadow-lg product-card"
            >



              <div
                style={{
                  height:"250px",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  background:"#f8f9fa"
                }}
              >

                <img

                  src={
                    product.image ||
                    "https://via.placeholder.com/300"
                  }

                  alt={product.name}

                  style={{
                    maxHeight:"230px",
                    maxWidth:"90%",
                    objectFit:"contain"
                  }}

                />


              </div>




              <div className="card-body text-center">



                <span
                  className={
                    product.stock>0
                    ?
                    "badge bg-success"
                    :
                    "badge bg-danger"
                  }
                >

                  {
                    product.stock>0
                    ?
                    "Available"
                    :
                    "Out of Stock"
                  }

                </span>




                <h5 className="fw-bold mt-3">

                  {product.name}

                </h5>



                <p className="text-warning">

                  ⭐⭐⭐⭐⭐

                </p>



                <p className="text-muted">

                  {
                    product.description.length > 70
                    ?
                    product.description.substring(0,70)+"..."
                    :
                    product.description
                  }

                </p>




                <h4 className="text-success fw-bold">

                  ₹{product.price}

                </h4>




                <p className="text-muted">

                  {product.category}

                </p>




                <div className="d-flex justify-content-center gap-2">


                  <Link

                    to={`/product/${product._id}`}

                    className="btn btn-outline-primary px-4 fw-bold"

                  >

                    View

                  </Link>




                  <button

                    className="btn btn-primary px-4 fw-bold"

                    disabled={product.stock===0}

                    onClick={()=>
                      addToCart(product._id)
                    }

                  >

                    🛒 Add

                  </button>



                </div>



              </div>



            </div>



          </div>



        ))

      }


      </div>


    </div>

  );

}


export default Products;