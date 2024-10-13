import React, { useEffect, useState } from 'react';

function AdminPage() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUserName(userData.name); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    window.location.href = '/'; 
  };
  const handleEmployeeList=()=>{
    window.location.href = "/userinfo"
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yellow-400 p-4">
        <nav className="flex justify-between items-center">
          <div>
            <ul className="flex space-x-4">
              <li className="text-black font-bold">DashBord</li>
              <li className="text-blue-900">Home</li>
              <li className="text-blue-900  hover:scale-105"><button onClick={handleEmployeeList} >Employee List</button></li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-900 font-bold text-xl mr-5">{userName} -</span>
            <button onClick={handleLogout} className=" font-semibold border-black p-2 rounded-md bg-red-500 text-black hover:scale-105 hover:bg-red-600">Logout</button>
          </div>
        </nav>
      </header>

      <main className="flex flex-col justify-center items-center mt-20">
        <h1 className="text-2xl font-bold">Welcome Admin Panel</h1>
      </main>
    </div>
  );
}

export default AdminPage;
