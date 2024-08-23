// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/orders', {
//           headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//         });
//         setOrders(response.data);
//       } catch (error) {
//         setError('Failed to fetch orders');
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleStatusChange = async (orderId, status) => {
//     try {
//       await axios.patch(`http://localhost:4000/api/orders/${orderId}/status`, { status }, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//       });
//       setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
//     } catch (error) {
//       setError('Failed to update order status');
//     }
//   };

//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h1>All Orders</h1>
//       {orders.map((order) => (
//         <div key={order._id} className="order">
//           <h2>Order ID: {order._id}</h2>
//           <p>Status: {order.status}</p>
//           <button onClick={() => handleStatusChange(order._id, 'Shipped')}>Mark as Shipped</button>
//           <ul>
//             {order.products.map((product) => (
//               <li key={product._id}>
//                 {/* Display product details */}
//                 {/* Assume we have product information */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminOrders;
