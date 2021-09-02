import dotenv from 'dotenv';
dotenv.config();


const config = {
 JWT_SECRET: process.env.JWT_SECRET || 'secret',
 PAYPAL_CLIENT_ID : process.env.PAYPAL_CLIENT_ID || "sb",
 MONGODB_URI: process.env.MONGODB_URI,
 NODE_ENV: process.env.NODE_ENV,
 PORT:process.env.PORT
}

export default config




