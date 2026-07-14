import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {

  const { user, logout } = useContext(AuthContext);

  return (

    <div className="container mt-5">

      <h2 className="text-center text-primary fw-bold mb-4">
        👤 My Profile
      </h2>


      {user ? (

        <div className="row justify-content-center">

          <div className="col-md-6">


            <div className="card shadow-lg border-0 rounded-4 profile-card">


              <div className="card-body text-center p-5">


                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="profile"
                  width="120"
                  className="rounded-circle mb-3"
                />


                <h3 className="fw-bold">
                  {user.name}
                </h3>


                <p className="text-muted">
                  {user.email}
                </p>


                <span className="badge bg-success mb-4">
                  🟢 Active User
                </span>


                <hr />


                <div className="text-start">


                  <h5 className="fw-bold">
                    Account Details
                  </h5>


                  <p>
                    👤 Name: {user.name}
                  </p>


                  <p>
                    📧 Email: {user.email}
                  </p>


                  <p>
                    🛍️ Role: {user.role === "admin" ? "Administrator" : "Customer"}
                  </p>


                </div>


                <hr />


                <div className="d-grid gap-3">


                  <Link
                    to="/orders"
                    className="btn btn-primary rounded-pill"
                  >
                    📦 My Orders
                  </Link>



                  <Link
                    to="/cart"
                    className="btn btn-success rounded-pill"
                  >
                    🛒 My Cart
                  </Link>



                  <button
                    className="btn btn-danger rounded-pill"
                    onClick={logout}
                  >
                    🚪 Logout
                  </button>


                </div>


              </div>


            </div>


          </div>


        </div>


      ) : (


        <div className="text-center">


          <h4>
            Please Login First
          </h4>


          <Link
            to="/login"
            className="btn btn-primary mt-3"
          >
            Login
          </Link>


        </div>


      )}


    </div>

  );
}


export default Profile;