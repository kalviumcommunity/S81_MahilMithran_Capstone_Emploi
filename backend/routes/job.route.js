        import express from "express";
        import isAuthenticated from "../middlewares/isAuthenticated.js";
        import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

        const router = express.Router();

        // Routes for jobs
        router.post("/jobs", isAuthenticated, postJob);
        router.get("/jobs", isAuthenticated, getAllJobs);       
        router.get("/admin/jobs", isAuthenticated, getAdminJobs); 
        router.get("/jobs/:id", isAuthenticated, getJobById);   

        export default router;
