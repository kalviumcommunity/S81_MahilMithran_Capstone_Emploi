    import { User } from "../models/user.model.js";
    import bcrypt from "bcryptjs";
    import jwt from "jsonwebtoken";

        // REGISTER
            export const register = async (req, res) => {
                try {
                    const { fullname, email, phoneNumber, password, role } = req.body;

                    if (!fullname || !email || !phoneNumber || !password || !role) {
                        return res.status(400).json({
                            message: "Something is Missing",
                            success: false,
                        });
                    }

                    const existingUser = await User.findOne({ email });
                    if (existingUser) {
                        return res.status(400).json({
                            message: "User Already Exists with this Email",
                            success: false,
                        });
                    }

                    const hashedPassword = await bcrypt.hash(password, 10);

                    await User.create({
                        fullname,
                        email,
                        phoneNumber,
                        password: hashedPassword,
                        role,
                    });

                    return res.status(201).json({
                        message: "Account Created Successfully",
                        success: true,
                    });
                } catch (error) {
                    console.error("Error during registration:", error);
                    return res.status(500).json({ message: "Server Error", success: false });
                }
            };

            // LOGIN
            export const login = async (req, res) => {
                try {
                    const { email, password, role } = req.body;

                    if (!email || !password || !role) {
                        return res.status(400).json({
                            message: "Something is Missing",
                            success: false,
                        });
                    }

                    const user = await User.findOne({ email });
                    if (!user) {
                        return res.status(400).json({
                            message: "Incorrect Email or Password",
                            success: false,
                        });
                    }

                    const isPasswordMatch = await bcrypt.compare(password, user.password);
                    if (!isPasswordMatch) {
                        return res.status(400).json({
                            message: "Incorrect Email or Password",
                            success: false,
                        });
                    }

                    if (role !== user.role) {
                        return res.status(400).json({
                            message: "Account doesn't exist with current role",
                            success: false,
                        });
                    }

                    const tokenData = {
                        userId: user._id,
                    };

                    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
                        expiresIn: "1d", // 1 day expiration
                    });

                    const safeUser = {
                        _id: user._id,
                        fullname: user.fullname,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        role: user.role,
                        profile: user.profile,
                    };

                    // Secure cookie setup
                    return res.status(200)
                        .cookie("token", token, {
                            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                            httpOnly: true,
                            sameSite: "strict",
                            secure: process.env.NODE_ENV === "production",
                        })
                        .json({
                            message: `Welcome Back ${user.fullname}`,
                            success: true,
                            user: safeUser,
                        });
                } catch (error) {
                    console.error("Error during login:", error);
                    return res.status(500).json({ message: "Server Error", success: false });
                }
            };

        // LOGOUT
        export const logout = async (req, res) => {
            try {
                return res.status(200)
                    .cookie("token", "", { maxAge: 0 }) // Clear the cookie
                    .json({
                        message: "Logged Out Successfully",
                        success: true,
                    });
            } catch (error) {
                console.error("Error during logout:", error);
                return res.status(500).json({ message: "Server Error", success: false });
            }
        };

    // UPDATE PROFILE
    export const updateProfile = async (req, res) => {
        try {
            const { fullname, email, phoneNumber, bio, skills } = req.body;
            const file = req.file; // Handle file upload here if needed

            let skillsArray;
            if (skills) {
                skillsArray = skills.split(",");
            }

            const userId = req.userId; // Comes from authentication middleware

            let user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({
                    message: "User Not Found",
                    success: false,
                });
            }

            if (fullname) user.fullname = fullname;
            if (email) user.email = email;
            if (phoneNumber) user.phoneNumber = phoneNumber;
            if (bio) user.profile.bio = bio;
            if (skills) user.profile.skills = skillsArray;

            // Resume upload and file handling can be added here

            await user.save();

            const updatedUser = {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile,
            };

            return res.status(200).json({
                message: "Profile Updated Successfully",
                user: updatedUser,
                success: true,
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            return res.status(500).json({ message: "Server Error", success: false });
        }
    };
