import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Cart from "../pages/Cart";
import AdminProducts from "../../admin/AdminProducts";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Redirect root "/" to "/products"
      { path: "/", element: <Navigate to="/products" replace /> },

      { path: "products", element: <Products /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        )
      },
      {
        path: "adminPanel",
        element: (
          <ProtectedRoute adminOnly={true}>
            <AdminProducts />
          </ProtectedRoute>
        )
      }
    ]
  }
]);
