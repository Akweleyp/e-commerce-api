// import jwt from "jsonwebtoken";

import {expressjwt} from "express-jwt";
import { UserModel } from "../models/user.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256']
});


// N.B : You always have to write this function yurself, there is not written documentation for it.
export const isAuthorized = (roles) => {
    return async (req, res, next) => {
    // Find user by Id
    const user = await UserModel.findById(req.auth.id);
    
    // Check if roles includes user role
    if(roles?.includes(user.role)){
        next()
    } else{
        res.status(403).json('You are not authorised!');
    }

    }

}
// export const isAuthenticated = (req, res, next) => {
//   console.log(req.headers);
//   // Get authorization header
//   const authorization = req.headers.authorization;
//   // Check the presence of Authorization
//    if(!authorization) {
//     return res.status(401).json('Auhtorization header does not exist');
//    }

//   // Get access token from Authorization
//   const token = authorization.split(" ")[1];

//   // Check if token exists
//   if (!token){
//     return res.status(401).json('Acess token not provided!');

//   }
//   // Verify and decode the access token
//   const decoded = jwt.verify(
//     token,
//     process.env.JWT_SECRET_KEY,

//     (error, decoded) => {
//         // Handle verify error
//       if (error) {
//         return res.status(401).json(error);
//       }

//       // Add decoded to request object
//       req.user = decoded;
//       // Proceed to next handler
//       next();
//     }
//   );
// };
