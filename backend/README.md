
# 💼 FullStack Job Portal App (MERN Stack)

A full-featured **Job Portal Web Application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The platform enables students or job seekers to search and apply for jobs, while recruiters can post job openings, manage applications, and review candidates.

---

## 🎯 Purpose of the Project

The primary goal of this project is to **bridge the gap between job seekers and job providers** in a seamless, modern, and user-friendly environment. The portal is designed especially for students and freshers to find relevant job opportunities and for recruiters to efficiently manage job listings and candidate applications.

---

## 🌟 Benefits to Users

### 🧑‍🎓 For Students / Job Seekers:
- Search for jobs based on role, location, salary, or type.
- Apply directly to job listings with resume uploads.
- Manage and update their profile anytime.
- View status of job applications.
- Secure and fast login using Clerk.

### 🧑‍💼 For Recruiters:
- Post new job openings.
- View applicants for each job.
- Edit or delete job listings.
- Access a dashboard to manage all job posts.
- Save time with a clean and efficient interface.

### 🛡️ Common for All:
- Secure authentication via Clerk.
- Smooth and responsive UI using Chakra UI and Framer Motion.
- Real-time notifications via toast messages.
- Error tracking using Sentry for better reliability.

---

## 🧑‍🎨 What is Done in the Frontend Code

The frontend is built using **React.js**, styled with **Chakra UI**, and animated with **Framer Motion**. It also integrates **Redux Toolkit** for state management and **Clerk** for authentication.

### 🔧 Key Functionalities:
- **Authentication**: Uses Clerk for login, signup, and user role verification (Student or Recruiter).
- **Routing**: React Router is used to define public and protected routes.
- **State Management**: Redux Toolkit handles user data, job listings, applications, and more.
- **Job Display**: Users can view all jobs in a grid layout with filters like role, type, and location.
- **Application Flow**: Students can apply to jobs and view their application status.
- **Recruiter Dashboard**: Recruiters can create jobs, edit them, view applicants, and delete jobs.
- **Profile Management**: Users can edit their name, phone, upload a resume (handled with Cloudinary).
- **Error & Feedback**: Toast notifications show success/error messages; Framer Motion adds smooth animations.



## 🛠️ What is Done in the Backend Code

The backend is built using **Node.js** and **Express.js**, with **MongoDB** as the database, connected via **Mongoose**. It handles all the API logic, validations, user roles, and job operations.

### 🔧 Key Functionalities:
- **Clerk Integration**: Validates Clerk tokens for all secure routes.
- **Job Management**:
  - `POST /jobs`: Recruiters can post jobs.
  - `GET /jobs`: All users can browse available jobs.
  - `PUT /jobs/:id`: Edit a specific job (only recruiter who created it).
  - `DELETE /jobs/:id`: Delete a job (admin or owner).
- **Applications**:
  - `POST /apply/:jobId`: Students can apply to jobs.
  - `GET /applicants/:jobId`: Recruiters view applicants for a job.
- **Profile Management**:
  - `GET /profile`: Get user profile.
  - `PUT /profile`: Update profile and resume (uploaded to Cloudinary).
- **File Uploads**:
  - Integrated with **Cloudinary** to store user resumes and company logos.
- **Error Handling**:
  - Uses custom middleware and logs all errors with **Sentry**.



## ✅ Summary

This MERN-based Job Portal is a robust, production-ready application that empowers both **job seekers and recruiters** with a clean, user-friendly interface and a powerful backend. It includes modern tools like **Clerk**, **Cloudinary**, **Redux Toolkit**, and **Sentry**, ensuring both scalability and reliability.

