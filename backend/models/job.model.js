    import mongoose from 'mongoose';

    const jobSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        requirements: {
            type: [String],
            default: []  // Defaults to an empty array if not provided
        },
        salary: {
            type: Number,
            required: true,
        },
        experienceLevel: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            required: true,
        },
        numberOfOpenings: {
            type: Number,
            required: true,
            default: 1  // Defaults to 1 if not provided
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        applications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Application",
                default: []  // Defaults to an empty array if no applications
            }
        ]
    }, { timestamps: true });

    export const Job = mongoose.model("Job", jobSchema);
