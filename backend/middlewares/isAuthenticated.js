        import jwt from "jsonwebtoken";

        const isAuthenticated = async (req, res, next) => {
            try {
                // Ensure that the token is being retrieved correctly from cookies
                const token = req.cookies.token; // Check for the token in the cookies

                // If no token is found, return an error
                if (!token) {
                    return res.status(401).json({
                        message: "User not authenticated",
                        success: false,
                    });
                }

                // Verify the token using the secret key
                const decoded = jwt.verify(token, process.env.SECRET_KEY);

                // If the token is valid, the decoded payload will contain the user information
                if (!decoded || !decoded.userId) {
                    return res.status(401).json({
                        message: "Invalid or corrupted token",
                        success: false,
                    });
                }

                // Attach decoded user info to the request
                req.user = decoded;          // Attach the entire decoded token to req.user (optional, for additional user info)
                req.userId = decoded.userId; // Attach userId from the decoded token to req.userId for route handlers

                // Proceed to the next middleware or route handler
                next();
            } catch (error) {
                console.log("Auth Error:", error);

                // Handle specific JWT errors
                if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        message: "Invalid or expired token",
                        success: false,
                    });
                }

                // If there's an unexpected error, respond with a server error
                return res.status(500).json({
                    message: "Server Error",
                    success: false,
                });
            }
        };

        export default isAuthenticated;
