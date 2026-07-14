import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Orders() {

  const [orders, setOrders] = useState([]);


  const fetchOrders = async () => {

    try {

      const response = await API.get("/orders");

      setOrders(response.data);

    } catch(error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchOrders();

  }, []);



  return (

    <div className="container mt-5">


      <h2 className="text-center text-primary fw-bold mb-5">

        📦 My Orders

      </h2>




      {
        orders.length === 0 ? (

          <div className="text-center p-5">

            <h3>
              No Orders Yet 🛒
            </h3>

            <p className="text-muted">
              Start shopping and place your first order
            </p>


            <Link
              to="/products"
              className="btn btn-primary rounded-pill px-4"
            >

              Continue Shopping

            </Link>


          </div>


        ) : (


          orders.map((order)=>(


            <div
              className="card shadow-lg border-0 rounded-4 mb-4 order-card"
              key={order._id}
            >


              <div className="card-body p-4">



                <div className="d-flex justify-content-between align-items-center flex-wrap">


                  <div>


                    <h5 className="fw-bold">

                      Order Status:

                      <span className="badge bg-warning text-dark rounded-pill ms-2 px-3">

                        {order.status}

                      </span>

                    </h5>


                    <p className="text-muted mb-0">

                      Order ID:
                      {order._id.substring(0,8)}

                    </p>


                  </div>



                  <p className="text-muted">

                    {
                      new Date(order.createdAt)
                      .toLocaleDateString()
                    }

                  </p>


                </div>



                <hr />



                <h3 className="text-success fw-bold">

                  Total Amount:
                  ₹{order.totalPrice}

                </h3>



                <h5 className="fw-bold mt-4">

                  Products

                </h5>





                {
                  order.products.map((item)=>(



                    <div
                      className="row align-items-center border-bottom py-3"
                      key={item._id}
                    >



                      <div className="col-md-3 text-center">


                        <img

                          src={
                            item.product?.image ||
                            "https://via.placeholder.com/200"
                          }

                          alt="product"

                          className="img-fluid"

                          style={{
                            height:"130px",
                            objectFit:"contain"
                          }}

                        />


                      </div>




                      <div className="col-md-9">


                        <h5 className="fw-bold">

                          {item.product?.name}

                        </h5>



                        <p className="text-muted">

                          Category:
                          {item.product?.category}

                        </p>



                        <p>

                          Price:
                          ₹{item.product?.price}

                        </p>



                        <p>

                          Quantity:
                          {item.quantity}

                        </p>



                        <h6 className="text-success fw-bold">

                          Subtotal:
                          ₹
                          {
                            (item.product?.price || 0)
                            *
                            item.quantity
                          }

                        </h6>



                      </div>



                    </div>



                  ))

                }



              </div>


            </div>



          ))


        )

      }



    </div>

  );

}


export default Orders;