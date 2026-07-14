import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/login", formData);
      console.log("RESPONSE DATA:", JSON.stringify(response.data, null, 2));
      // Debug token response
      console.log("Full response:", response);
      console.log("Token value:", response.data.token);
      console.log("Data keys:", Object.keys(response.data));

      // Save JWT Token
      localStorage.setItem("token", response.data.token);

      console.log("Saved token:", localStorage.getItem("token"));

      // Save User
      login(response.data.user);

      alert(response.data.message);

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary">
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;