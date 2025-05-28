    import { Company } from "../models/company.model.js";

    // ✅ Register Company
    export const registerCompany = async (req, res) => {
        try {
            const userId = req.userId || req.user?.userId || req.body.userId;

            if (!userId) {
                return res.status(401).json({
                    message: "Unauthorized: Missing user ID",
                    success: false,
                });
            }

            const { name, description, website, location } = req.body;

            if (!name || !description || !website || !location) {
                return res.status(400).json({
                    message: "All fields (name, description, website, location) are required",
                    success: false,
                });
            }

            const newCompany = await Company.create({
                name,
                description,
                website,
                location,
                userId, // ✅ matches schema
            });

            return res.status(201).json({
                message: "Company registered successfully",
                company: newCompany,
                success: true,
            });

        } catch (error) {
            console.error("Register Company Error:", error.message, error.stack);
            return res.status(500).json({
                message: "Server Error",
                success: false,
            });
        }
    };

    // ✅ Get All Companies for Logged-in User
    export const getCompany = async (req, res) => {
        try {
            const userId = req.userId || req.user?.userId;  

            if (!userId) {
                return res.status(401).json({
                    message: "Unauthorized: Missing user ID",
                    success: false,
                });
            }

            const companies = await Company.find({ userId });

            if (!companies || companies.length === 0) {
                return res.status(404).json({
                    message: "No companies found",
                    success: false,
                });
            }

            return res.status(200).json({
                companies,
                success: true,
            });
        } catch (error) {
            console.error("Error in getCompany:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                success: false,
            });
        }
    };

    // ✅ Get Company by ID
    export const getCompanyById = async (req, res) => {
        try {
            const companyId = req.params.id;
            const company = await Company.findById(companyId);

            if (!company) {
                return res.status(404).json({
                    message: "Company not found",
                    success: false,
                });
            }

            return res.status(200).json({
                company,
                success: true,
            });
        } catch (error) {
            console.error("Error in getCompanyById:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                success: false,
            });
        }
    };

    // ✅ Update Company
        export const updateCompany = async (req, res) => {
            try {
                const { name, description, website, location } = req.body;
                const file = req.file;

                // Later: Upload to Cloudinary and add logo URL here

                const updateData = { name, description, website, location };

                const updatedCompany = await Company.findByIdAndUpdate(
                    req.params.id,
                    updateData,
                    { new: true }
                );

                if (!updatedCompany) {
                    return res.status(404).json({
                        message: "Company not found",
                        success: false,
                    });
                }

                return res.status(200).json({
                    message: "Company information updated",
                    company: updatedCompany,
                    success: true,
                });
            } catch (error) {
                console.error("Error in updateCompany:", error);
                return res.status(500).json({
                    message: "Internal Server Error",
                    success: false,
                });
            }
        };
