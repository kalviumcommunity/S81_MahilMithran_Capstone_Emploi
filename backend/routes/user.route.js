                import express from "express";
                import { register, login, logout, updateProfile } from "../controllers/user.controller.js";
                import isAuthenticated from "../middlewares/isAuthenticated.js"; // Corrected import for default export

                const router = express.Router();

                    router.post("/register", register);
                    router.post("/login", login);
                router.get("/logout", isAuthenticated, logout);
                router.put("/profile/update", isAuthenticated, updateProfile);

                export default router;
