import usermodel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res) => {
    const User = req.body;
    if (!User.email || !User.password) {
        return res
            .status(400)
            .json({ error: "Email and Password are required!" });
    }

    try {
        const waitingUser = await usermodel.findOne({
            email: User.email.trim(),
        });
        if (!waitingUser)
            return res
                .status(404)
                .json({ error: "No user found with this email!" });
        const password = await bcrypt.compare(
            User.password,
            waitingUser.hashPassword,
        );
        if (!password) {
            console.log("Wrong password");
            return res.status(401).json({ error: "password didnt match" });
        }
        //add jwt token here...
        const token = jwt.sign(
            {
                userId: waitingUser._id,
                userName: waitingUser.name,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1hr" },
        );

        const Data = {
            token: token,
            user: {
                name: waitingUser.name,
                userId: waitingUser._id,
            },
        };

        res.json({
            token: token,
            user: {
                name: waitingUser.name,
                id: waitingUser._id,
            },
        });
    } catch (error) {
        res.status(500).send("Error in Internal server");
    }
};

export const createAc = async (req, res) => {
    const newUser = req.body;
    if (
        !newUser.name ||
        !newUser.email ||
        !newUser.password ||
        !newUser.confirmPassword
    ) {
        return res.status(400).json({ error: "Every Field is not filled" });
    }
    try {
        const UserExist = await usermodel.findOne({ email: newUser.email });
        if (UserExist) {
            return res.status(401).json({ error: "The User already exist!!" });
        }
        const saveUser = new usermodel({
            name: newUser.name,
            email: newUser.email,
            hashPassword: newUser.password,
        });

        await saveUser.save();
        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" });
    }
};
