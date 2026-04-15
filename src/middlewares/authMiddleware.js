import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({message: "No Token Available"})
    };

    const verifyToken = authHeader.split(" ")[1];

    try{

        const decodedToken = jwt.verify(verifyToken, process.env.ACCESS_TOKEN_SECRET)

        res.locals.user = decodedToken;

        next()
    } catch {
        return res.status(401).json({message: "Invalid Token"});
    }
};