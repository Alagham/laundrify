import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const createOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const getOrderById = (id) =>
    orders.find((order) => order.id === id);

  return (
    <OrderContext.Provider
      value={{ orders, createOrder, getOrderById }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
