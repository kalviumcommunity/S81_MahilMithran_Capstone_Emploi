import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ initialUser }) => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "", // comma separated string
    });

    const [profilePhoto, setProfilePhoto] = useState(null); // file object
    const [photoPreview, setPhotoPreview] = useState(null); // preview URL

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    // Load initial user data into form on mount or when initialUser changes
    useEffect(() => {
        if (initialUser) {
            setFormData({
                fullname: initialUser.fullname || "",
                email: initialUser.email || "",
                phoneNumber: initialUser.phoneNumber || "",
                bio: (initialUser.profile && initialUser.profile.bio) || "",
                skills:
                    initialUser.profile && initialUser.profile.skills
                        ? initialUser.profile.skills.join(",")
                        : "",
            });

            if (initialUser.profile && initialUser.profile.profilePhoto) {
                // Adjust this URL as needed (set your backend base URL in env)
                setPhotoPreview(
                    process.env.REACT_APP_API_BASE_URL +
                    "/" +
                    initialUser.profile.profilePhoto
                );
            }
        }
    }, [initialUser]);

    // Handle input changes for text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle profile photo file input change
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setProfilePhoto(file);
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    // Submit updated profile data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const data = new FormData();

            data.append("fullname", formData.fullname);
            data.append("email", formData.email);
            data.append("phoneNumber", formData.phoneNumber);
            data.append("bio", formData.bio);
            data.append("skills", formData.skills);

            if (profilePhoto) {
                data.append("profilePhoto", profilePhoto);
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            };

            const response = await axios.put(
                "http://localhost:8000/api/vq/user/profile/update",
                data,
                config
            );

            if (response.data.success) {
                setMessage("Profile updated successfully!");
            } else {
                setError(response.data.message || "Failed to update profile");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Server error");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

            {message && <p className="mb-4 text-green-600">{message}</p>}
            {error && <p className="mb-4 text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Fullname */}
                <label className="block mb-2 font-semibold" htmlFor="fullname">
                    Full Name
                </label>
                <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 mb-4 rounded"
                />

                {/* Email */}
                <label className="block mb-2 font-semibold" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 mb-4 rounded"
                />

                {/* Phone Number */}
                <label className="block mb-2 font-semibold" htmlFor="phoneNumber">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 mb-4 rounded"
                />

                {/* Bio */}
                <label className="block mb-2 font-semibold" htmlFor="bio">
                    Bio
                </label>
                <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full border p-2 mb-4 rounded"
                    rows={3}
                ></textarea>

                {/* Skills */}
                <label className="block mb-2 font-semibold" htmlFor="skills">
                    Skills (comma separated)
                </label>
                <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full border p-2 mb-4 rounded"
                />

                {/* Profile Photo */}
                <label className="block mb-2 font-semibold" htmlFor="profilePhoto">
                    Profile Photo
                </label>
                {photoPreview && (
                    <div className="mb-2">
                        <img
                            src={photoPreview}
                            alt="Profile Preview"
                            className="w-24 h-24 object-cover rounded-full border"
                        />
                    </div>
                )}
                <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="mb-6"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default Profile;
