// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import AlanEatsLogo from "../Images/AlanEatsLogo.png";
// import "./css/Admin.css";
// import { capitalize } from "@material-ui/core";
// import result from "../Images/result.gif";

// const Admin = () => {
//   const [orderData, setOrderData] = useState([]);
//   const [newStatus, setNewStatus] = useState({});

//   const orderId = JSON.parse(localStorage.getItem("orderId"));
//   const time = JSON.parse(localStorage.getItem("orderTime"));

//   useEffect(() => {
//     axios.get(`/api/order/`).then((res) => {
//       setOrderData([...res?.data?.data]);

//       // localStorage.setItem(
//       //   "orderTime",
//       //   JSON.stringify([res?.data?.data?.createdAt])
//       // );
//     });
//   }, [newStatus.orderId, newStatus.status, newStatus.createdAt, orderData]);

//   useEffect(() => {
//     console.log(newStatus);
//     if (newStatus.status === "Completed") {
//       axios.delete(`/api/order/${newStatus.orderId}`);
//     } else if (newStatus) {
//       axios.patch(
//         `/api/order/${newStatus.orderId}`,
//         {
//           status: newStatus.status,
//           orderId: newStatus.orderId,
//           createdAt: newStatus.createdAt,
//         }
//       );
//     }
//   }, [newStatus.orderId, newStatus.status, newStatus.createdAt]);

//   return (
//     <div className="admin">
//       <Link to="/">
//         <img className="logo__img" src={AlanEatsLogo} alt="alan eat" />
//       </Link>
//       <h1>Admin Panel</h1>
//       {orderData?.length > 0 ? (
//         <>
//           <table className="orderTable">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Customer Name</th>
//                 <th>Order Id</th>
//                 <th>Order Status Time</th>
//                 <th>Order Status</th>
//               </tr>
//             </thead>
//             {orderData?.map((order, idx) => (
//               <tr>
//                 <th>{idx + 1}</th>
//                 <th>{capitalize(order.username)}</th>
//                 <th>{order.orderId}</th>
//                 <th>
//                   {new Date(order.createdAt).toLocaleString("en-US", {
//                     hour: "numeric",
//                     minute: "numeric",
//                     hour12: true,
//                   })}
//                 </th>
//                 <th>
//                   <select
//                     value={
//                       order.orderId === newStatus.orderId
//                         ? newStatus.status
//                         : order.status
//                     }
//                     onChange={(e) => {
//                       setNewStatus({
//                         orderId: order.orderId,
//                         status: e.target.value,
//                         createdAt: Date.now(),
//                       });
//                     }}
//                   >
//                     <option>Placed</option>
//                     <option>Confirmed</option>
//                     <option>Prepared</option>
//                     <option>Out for Delivery</option>
//                     <option>Completed</option>
//                   </select>
//                 </th>
//               </tr>
//             ))}
//           </table>
//         </>
//       ) : (
//         <div className="emptyOrders">
//           <img
//             className="emptyOrders__img"
//             src="https://delivery.namkalam.in/wp-content/uploads/2021/03/delivery.gif"
//             alt=""
//           />
//           <img className="secondary__text" src={result} alt="" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlanEatsLogo from "../Images/AlanEatsLogo.png";
import "./css/Admin.css";
import { capitalize } from "@material-ui/core";
import result from "../Images/result.gif";

const Admin = () => {
  const [orderData, setOrderData] = useState([]);
  const [newStatus, setNewStatus] = useState({});

  const orderId = JSON.parse(localStorage.getItem("orderId"));
  const time = JSON.parse(localStorage.getItem("orderTime"));

  useEffect(() => {
    // Use a separate function to fetch the order data and avoid unnecessary dependencies
    const fetchOrderData = async () => {
      try {
        const res = await axios.get(`/api/order`);
        setOrderData([...res.data.data]);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData(); // Call the function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array for initial data fetch

  useEffect(() => {
    if (newStatus.status === "Completed") {
      // Use a try-catch block for axios requests
      try {
        console.log("new status inside delete", newStatus)
        axios.delete(`/api/order/${newStatus.orderId}`);
      } catch (error) {
        // Handle errors here
        console.error("Error deleting order:", error);
      }
    } else if (newStatus.orderId) { // Check if newStatus.orderId exists
      try {
        console.log("newStatus", newStatus);
        axios.patch(`/api/order/${newStatus.orderId}`, {
          status: newStatus.status,
          orderId: newStatus.orderId,
          createdAt: newStatus.createdAt,
        });
      } catch (error) {
        // Handle errors here
        console.error("Error updating order status:", error);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStatus]);

  return (
    <div className="admin">
      <Link to="/">
        <img className="logo__img" src={AlanEatsLogo} alt="alan eat" />
      </Link>
      <h1>Admin Panel</h1>
      {orderData.length > 0 ? ( // Simplify the conditional check
        <>
          <table className="orderTable">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Order Id</th>
                <th>Order Status Time</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody> {/* Use tbody for table body */}
              {orderData.map((order, idx) => (
                <tr key={order.orderId}>
                  <td>{idx + 1}</td>
                  <td>{capitalize(order.username)}</td>
                  <td>{order.orderId}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </td>
                  <td>
                    <select
                      value={
                        order.orderId === newStatus.orderId
                          ? newStatus.status
                          : order.status
                      }
                      onChange={(e) => {
                        setNewStatus({
                          orderId: order.orderId,
                          status: e.target.value,
                          createdAt: Date.now(),
                        });
                      }}
                    >
                      <option>Placed</option>
                      <option>Confirmed</option>
                      <option>Prepared</option>
                      <option>Out for Delivery</option>
                      <option>Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="emptyOrders">
          <img
            className="emptyOrders__img"
            src="https://delivery.namkalam.in/wp-content/uploads/2021/03/delivery.gif"
            alt=""
          />
          <img className="secondary__text" src={result} alt="" />
        </div>
      )}
    </div>
  );
};

export default Admin;

