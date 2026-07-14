import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {

  const [cart, setCart] = useState([]);


  const fetchCart = async () => {

    try {

      const response = await API.get("/cart");
      setCart(response.data);

    } catch(error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchCart();

  }, []);




  const placeOrder = async (item) => {

    try {


      const totalPrice = item.products.reduce(

        (total, productItem) =>

          total +
          (productItem.product?.price || 0)
          *
          productItem.quantity,

        0

      );



      await API.post("/orders",{

        user:item.user,

        products:item.products.map((productItem)=>({

          product:productItem.product._id,

          quantity:productItem.quantity

        })),

        totalPrice

      });



      await API.delete(`/cart/${item._id}`);


      alert("Order Placed Successfully! 🎉");

      fetchCart();



    } catch(error){

      console.log(error);

      alert("Failed to place order");

    }

  };





  const removeCart = async(id)=>{

    try{

      await API.delete(`/cart/${id}`);

      alert("Removed from Cart");

      fetchCart();


    }catch(error){

      console.log(error);

    }

  };





  const updateQuantity = async(
    cartId,
    productId,
    quantity
  )=>{


    try{


      if(quantity < 1) return;


      await API.put(

        `/cart/${cartId}/${productId}`,

        {
          quantity
        }

      );


      fetchCart();



    }catch(error){

      console.log(error);

    }

  };




  return (

    <div className="container mt-5">


      <h2 className="text-center text-primary fw-bold mb-5">

        🛒 My Shopping Cart

      </h2>




      {
        cart.length === 0 ? (

          <div className="text-center">

            <h3>
              Your cart is empty 🛒
            </h3>


            <p className="text-muted">
              Add products and continue shopping
            </p>


          </div>


        ) : (


          cart.map((item)=>(


            <div
              className="card shadow border-0 mb-4"
              key={item._id}
            >


              <div className="card-body p-4">


              {

              item.products.map((productItem)=>(



                <div
                  className="row align-items-center mb-4 border-bottom pb-4"
                  key={productItem._id}
                >



                  <div className="col-md-3 text-center">


                    <div
                      className="p-3 bg-light rounded"
                    >

                      <img

                        src={
                          productItem.product?.image ||
                          "https://via.placeholder.com/200"
                        }

                        alt="product"

                        className="img-fluid"

                        style={{
                          height:"150px",
                          objectFit:"contain"
                        }}

                      />

                    </div>


                  </div>





                  <div className="col-md-9">


                    <h4 className="fw-bold">

                      {productItem.product?.name}

                    </h4>



                    <p className="text-muted">

                      {productItem.product?.category}

                    </p>



                    <h5 className="text-success fw-bold">

                      ₹{productItem.product?.price}

                    </h5>




                    <p>

                      Subtotal:
                      <strong>
                        ₹
                        {
                          productItem.product?.price *
                          productItem.quantity
                        }
                      </strong>

                    </p>




                    <button

                      className="btn btn-outline-danger rounded-circle"

                      onClick={()=>updateQuantity(
                        item._id,
                        productItem.product._id,
                        productItem.quantity-1
                      )}

                    >

                      -

                    </button>




                    <span className="mx-3 fw-bold fs-5">

                      {productItem.quantity}

                    </span>




                    <button

                      className="btn btn-outline-success rounded-circle"

                      onClick={()=>updateQuantity(
                        item._id,
                        productItem.product._id,
                        productItem.quantity+1
                      )}

                    >

                      +

                    </button>


                  </div>



                </div>



              ))

              }





              <div className="bg-light rounded p-4">


                <h3 className="text-success fw-bold">

                  Total:
                  ₹
                  {
                    item.products.reduce(

                      (total,productItem)=>

                      total+
                      productItem.product.price *
                      productItem.quantity,

                      0

                    )
                  }

                </h3>



                <button

                  className="btn btn-primary me-2"

                  onClick={()=>placeOrder(item)}

                >

                  📦 Place Order

                </button>




                <button

                  className="btn btn-danger"

                  onClick={()=>removeCart(item._id)}

                >

                  🗑️ Remove Cart

                </button>



              </div>



              </div>


            </div>



          ))

        )

      }



    </div>

  );

}


export default Cart;