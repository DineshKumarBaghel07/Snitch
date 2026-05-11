import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Product from "../features/products/pages/Product";
import ProductDetails from "../features/products/pages/ProductDetails.jsx";
import SellerProductDetails from "../features/products/pages/SellerProductDetails"
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import Layout from "../layout/Layout.jsx"
import Protected from "../features/auth/component/Protected.jsx";
import DashBoard from "../features/products/pages/Dashboard.jsx"



export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Product/>
      },
      {
                path: "/product/:productId",
                element: <ProductDetails />
            },
            {
                path: "/seller",
                children: [
                    {
                        path: "/seller/create-product",

                        element: <Protected role="seller" >
                            <CreateProduct />
                        </Protected>
                    },
                    {
                        path: "/seller/dashboard",
                        element: <Protected role="seller" >
                            <DashBoard />
                        </Protected>
                    },
                    {
                        path: "/seller/product/:productId",
                        element: <Protected role="seller" >
                            <SellerProductDetails />
                        </Protected>
                    }
                ]
            }
    ]
  }
]);