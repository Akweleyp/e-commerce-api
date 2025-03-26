import jwt from "jsonwebtoken";
export const authentication = (req, res, next) => {
    const authorization = req.get("authorization");
    if (!(authorization && authorization.startsWith("Bearer"))){
        return res.status(401).json({error: "Access Denied. Login Required"});
    }

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error){
          return res.status(401).json(error)
        }
        req.user = user;
        next();
    })
 
}