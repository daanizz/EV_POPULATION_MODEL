import jwt from "jsonwebtoken";

export const verifiedToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "no token provided" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "token missing" });
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Invalid or expired Token" });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
