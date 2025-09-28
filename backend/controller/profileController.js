import user from "../models/user.js";
import bcrypt from "bcrypt";

export const profileDetails = async (req, res) => {
    try {
        const userId = req.body;
        const User = await user.findById(userId);
        if (!User) {
            return res.status(404).json({ message: "404:user not found" });
        }
        return res.status(200).json(User);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const editProfile = async (req, res) => {
    try {
        const { id, name, oldPassword, newPassword } = req.body;
        const User = await user.findById(id);
        if (!User) {
            return res.status(404).json({ message: "No User found!!" });
        }
        if (name !== undefined && name !== User.name) User.name = name;
        if (newPassword) {
            const correctPass = await bcrypt.compare(
                oldPassword,
                User.hashPassword,
            );
            if (!correctPass) {
                return res
                    .status(400)
                    .json({ message: "Incorrect Old password" });
            }
            User.hashPassword = newPassword;
        }
        await User.save();
        return res.status(200).json({ message: "User data Updated!" });
    } catch (error) {
        return res.status(500).json({ message: "error" });
    }
};
