import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {

  return (

    <BrowserRouter>


      <Navbar />


      <Routes>


        <Route 
          path="/" 
          element={<Home />} 
        />


        <Route 
          path="/login" 
          element={<Login />} 
        />


        <Route 
          path="/register" 
          element={<Register />} 
        />


        <Route 
          path="/products" 
          element={<Products />} 
        />


        <Route 
          path="/product/:id" 
          element={<ProductDetails />} 
        />


        <Route 
          path="/cart" 
          element={<Cart />} 
        />


        <Route 
          path="/orders" 
          element={<Orders />} 
        />


        <Route 
          path="/profile" 
          element={<Profile />} 
        />


        <Route 
          path="/admin" 
          element={<AdminDashboard />} 
        />
        <Route path="*" element={<NotFound />} />

      </Routes>


      <Footer />


    </BrowserRouter>

  );

}


export default App;