import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!data.email || !data.password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // API call to login endpoint
      let response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,  // Sending email instead of username
          password: data.password
        })
      });

      let resData = await response.json();
    //   console.log(resData.CheckFOrExistanceUser.name)
      
      if (response.ok) {
        // Login successful
        alert('Login successful');

        localStorage.setItem("user", JSON.stringify(resData.CheckFOrExistanceUser));
        
        navigate("/adminpage");

      } else {
        // Handle error messages from API
        setError(resData.message || 'Login failed, please try again.');
      }

    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center bg-yellow-400 py-2 mb-4">Login Page</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-black rounded-lg"
              placeholder="Enter Your Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-black rounded-lg"
              placeholder="Enter Your Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
