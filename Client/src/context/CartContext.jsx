import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartCount, setCartCount] = useState(0);


  const fetchCartCount = async () => {
    try {

      const response = await API.get("/cart");

      let count = 0;

      response.data.forEach((cart) => {

        cart.products.forEach((item) => {
          count += item.quantity;
        });

      });

      setCartCount(count);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    fetchCartCount();

  }, []);


  return (
    <CartContext.Provider
      value={{
        cartCount,
        fetchCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};