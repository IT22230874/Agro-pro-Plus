import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Dashboard from "./components/finance/Finance";
// import Login from "./Website/LoginRegister/Login";
// import Register from "./Website/LoginRegister/Register";
// import AdminLogin from "./components/LoginRegister/AdminLogin";

import DriverDashboard from "./components/driver/DriverDashboard";
import VehicleDetails from "./components/transportDashboard/VehicleDetails";
import ProcessDetails from "./components/transportDashboard/ProcessDetails";
import CoveringDetails from "./components/transportDashboard/CoveringDetails";
import ScheduleDetails from "./components/transportDashboard/ScheduleDetails";
import DistributerLocationMap from "./components/driver/DistributerLocationMap";
import DistributeDetails from "./components/driver/DistributeDetails";
import StockDetails from "./components/driver/StockDetails";
import Map from "./components/driver/Components/map/Map";
import DriverDetails from "./components/transportDashboard/DriverDetails";


const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     <div>
  //       <Home />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/about",
  //   element: (
  //     <div>
  //       <About />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/shop",
  //   element: (
  //     <div>
  //       <Shop />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/cart",
  //   element: <Cart />,
  // },

  // {
  //   path: "/checkout",
  //   element: (
  //     <div>
  //       <Checkout />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/JoinWithUsSelect",
  //   element: (
  //     <div>
  //       <JoinWithUsSelect />
  //     </div>
  //   ),
  // },

 

  


  // {
  //   path: "/contact",
  //   element: (
  //     <div>
  //       <Contact />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/shop/:id",
  //   element: (
  //     <div>
  //       <SingleProduct />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/admin",
  //   element: (
  //     <div>
  //       <AdminLogin />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/login",
  //   element: (
  //     <div>
  //       <Login />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/register",
  //   element: (
  //     <div>
  //       <Register />
  //     </div>
  //   ),
  // },


  // {
  //   path: "/payments_page",
  //   element: (
  //     <div>
  //       <PaymentsPage />
  //     </div>
  //   ),
  // },
  
 

  // {
  //   path: "/Map",
  //   element: (
  //     <div>
  //       <Map />
  //     </div>
  //   ),
  // },



  // {
  //   path: "/DistributerLocationMap",
  //   element: (
  //     <div>
  //       <DistributerLocationMap />
  //     </div>
  //   ),
  // },
  // {
  //   path: "/Map",
  //   element: (
  //     <div>
  //       <Map />
  //     </div>
  //   ),
  // },
  


  {
    path: "/",
    element: (
      <div>
        <DriverDashboard />
      </div>
    ),
  },

  // {
  //   path: "/SMDashboard",
  //   element: (
  //     <div>
  //       <SMDashboard />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/SupplierDetails",
  //   element: (
  //     <div>
  //       <SupplierDetails />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/SupplierRequests",
  //   element: (
  //     <div>
  //       <SupplierRequests />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/FDashboard",
  //   element: (
  //     <div>
  //       <FDashboard />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/PredictionDetails",
  //   element: (
  //     <div>
  //       <PredictionDetails />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/SupplyRequests",
  //   element: (
  //     <div>
  //       <SupplyRequests />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/ApprovedSupplies",
  //   element: (
  //     <div>
  //       <ApprovedSupplies />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/DeclinedSupplies",
  //   element: (
  //     <div>
  //       <DeclinedSupplies />
  //     </div>
  //   ),
  // },

  // {
  //   path: "/SupplierLocations",
  //   element: (
  //     <div>
  //       <SupplierLocations />
  //     </div>
  //   ),
  // },


 
 
  


  // {
  //   path: "/SalesPage",
  //   element: (
  //     <div>
  //       <SalesPage />
  //     </div>
  //   ),
  // },

  {
    path: "/VehicleDetails",
    element: (
      <div>
        <VehicleDetails />
      </div>
    ),
  },
  {
    path: "/ProcessDetails",
    element: (
      <div>
        <ProcessDetails />
      </div>
    ),
  },
  {
    path: "/DistributeDetails",
    element: (
      <div>
        <DistributeDetails />
      </div>
    ),
  },
  {
    path: "/StockDetails",
    element: (
      <div>
        <StockDetails />
      </div>
    ),
  },
  {
    path: "/CoveringDetails",
    element: (
      <div>
        <CoveringDetails />
      </div>
    ),
  },

 
  // {
  //   path: "/ExpensePage",
  //   element: (
  //     <div>
  //       <ExpensePage />
  //     </div>
  //   ),
  // },


  {
    path: "/ScheduleDetails",
    element: (
      <div>
        <ScheduleDetails />
      </div>
    ),
  },

  {
    path: "/DriverDetails",
    element: (
      <div>
        <DriverDetails />
      </div>
    ),
  },

  // {
  //   path: "/addproduct",
  //   element: (
  //     <div>
  //       <AddProduct />
  //     </div>
  //   ),
  // },

]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
