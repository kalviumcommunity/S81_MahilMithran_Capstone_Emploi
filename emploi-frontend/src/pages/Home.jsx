import React from "react";
import Navbar from "../comonents/Navbar";
import "../styles/Home.css";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Remote",
    salary: "$60k - $80k",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Innovatech",
    location: "New York, NY",
    salary: "$70k - $90k",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Minds",
    location: "San Francisco, CA",
    salary: "$50k - $75k",
  },
];

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section text-center bg-blue-600 text-white py-20 px-6">
        <h1 className="text-5xl font-extrabold mb-4">
          Emploi - No.1 Job Portal for Your Career
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Find your dream job, connect with top companies, and grow your career
          with ease.
        </p>
        <a
          href="/register"
          className="btn-primary px-8 py-3 rounded-md font-semibold"
        >
          Get Started
        </a>
      </section>

      {/* Featured Jobs */}
      <section className="featured-jobs container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="job-card border rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-700 mb-1">{job.company}</p>
              <p className="text-gray-500 mb-2">{job.location}</p>
              <p className="font-semibold text-blue-600">{job.salary}</p>
              <button className="btn-outline mt-4 w-full py-2 rounded-md">
                View Job
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section bg-gray-50 py-16 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Emploi?</h2>
          <p className="text-gray-700 mb-8">
            Emploi provides the best job opportunities, verified companies,
            career advice, and easy application process to make your job hunt
            smooth and effective.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-semibold text-xl mb-2">Verified Companies</h3>
              <p className="text-gray-600">
                We partner only with trusted companies to ensure you find real
                opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Career Growth</h3>
              <p className="text-gray-600">
                Access resources and advice to improve your skills and advance
                your career.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Easy Applications</h3>
              <p className="text-gray-600">
                Apply quickly with your profile and track your applications in
                one place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
