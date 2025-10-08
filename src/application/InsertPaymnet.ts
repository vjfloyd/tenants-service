// import mongoose from 'mongoose';
// import { Payment } from '../adapters/out/common/collections/payment.schema';
//
//
// // Connect to MongoDB (ensure URI is correct)
// mongoose.connect('mongodb://localhost:27017/your_db_name');
//
// async function insertPayment() {
//   const payment = new Payment({
//     tenantId: new mongoose.Types.ObjectId('tenantObjectId'),
//     month: 6,
//     year: 2024,
//     amountToPay: 1500,
//     status: 'pending',
//     paidDate: null,
//     dueDate: new Date('2024-06-30'),
//     consumption: '120'
//   });
//
//   await payment.save();
//   console.log('Payment inserted:', payment);
// }
//
// insertPayment();