    import { Job } from "../models/job.model.js";

    // Admin posts a job
    export const postJob = async (req, res) => {
        try {
            const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
            const userId = req.userId; // Assuming this is coming from authentication middleware

            // Validate required fields
            if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
                return res.status(400).json({
                    message: "Something is missing",
                    success: false,
                });
            }

            // Split requirements into an array
            const reqArray = requirements.split(',');

            // Create the job
            const job = await Job.create({
                title,
                description,
                requirements: reqArray,
                salary: Number(salary),
                location,
                jobType,
                experienceLevel: experience,
                position,
                company: companyId,
                created_by: userId
            });

            return res.status(201).json({
                message: "Job created successfully",
                job,
                success: true
            });

        } catch (error) {
            console.error("Error during job creation:", error); // Log error for debugging
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    };

    // Students get all jobs
    export const getAllJobs = async (req, res) => {
        try {
            const keyword = req.query.keyword || "";
            const query = {
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            };

            const jobs = await Job.find(query).populate({
                path: "company",
            }).sort({ createdAt: -1 });

            if (!jobs) {
                return res.status(404).json({
                    message: "Jobs not found",
                    success: false
                });
            }

            return res.status(200).json({
                jobs,
                success: true
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    };

    // Student gets a job by ID
    export const getJobById = async (req, res) => {
        try {
            const jobId = req.params.id;
            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json({
                    message: "Job not found",
                    success: false
                });
            }

            return res.status(200).json({
                job,
                success: true
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    };

    // Admin gets all jobs they created
    // Admin gets all jobs they created
    export const getAdminJobs = async (req, res) => {
        try {
            const adminId = req.userId;  // Make sure userId is set correctly from isAuthenticated
            const jobs = await Job.find({ created_by: adminId });

            if (jobs.length === 0) {
                return res.status(404).json({
                    message: "No jobs found",
                    success: false
                });
            }

            res.status(200).json({
                jobs,
                success: true
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    };
