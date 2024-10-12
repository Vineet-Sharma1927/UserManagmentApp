import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '', // New password field
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    img: null,
  });
  const navigate = useNavigate(); 

  const [error, setError] = useState('');

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      const updatedCourses = checked
        ? [...formData.course, value]
        : formData.course.filter(course => course !== value);
      setFormData({ ...formData, course: updatedCourses });
    } else if (type === 'file') {
      setFormData({ ...formData, img: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      if (key === 'course') {
        form.append(key, JSON.stringify(formData[key]));
      } else if (key === 'img') {
        if (formData[key]) {
          form.append(key, formData[key]);
        }
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/user', {
        method: 'POST',
        body: form,
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.message || 'Failed to create user');
      } else {
        console.log(result);
        alert('User created successfully!');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          password: '', // Reset password field
          mobile: '',
          designation: '',
          gender: '',
          course: [],
          img: null,
        });
        navigate("/adminpage");
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create user. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-slate-100 shadow-md rounded-md border ">
      <h2 className="text-2xl font-bold mb-5">Create Employee</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Mobile No</label>
          <input
            type="number"
            name="mobile"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Designation</label>
          <select
            name="designation"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.designation}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Gender</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                onChange={handleInputChange}
                checked={formData.gender === 'M'}
                required
              />
              Male
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="gender"
                value="F"
                onChange={handleInputChange}
                checked={formData.gender === 'F'}
                required
              />
              Female
            </label>
          </div>
        </div>

        {/* Course */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Course</label>
          <div>
            {['MCA', 'BCA', 'BSC'].map((course) => (
              <label key={course} className="mr-4">
                <input
                  type="checkbox"
                  name="course"
                  value={course}
                  onChange={handleInputChange}
                  checked={formData.course.includes(course)}
                />
                {course}
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Image Upload</label>
          <input
            type="file"
            name="img"
            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md"
            onChange={handleInputChange}
            accept="image/jpeg,image/png"
            required
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default CreateUser;