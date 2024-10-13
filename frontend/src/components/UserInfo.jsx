import React, { useState, useEffect } from 'react';

const UserInfo = () => {
    const [employees, setEmployees] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetchEmployees();
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.name) {
            setUserName(userData.name); 
        }
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/user');
            if (!response.ok) throw new Error('Failed to fetch employees');
            const data = await response.json();
            setEmployees(data.users);
            console.log(data.users)
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleEdit = (employee) => {
        // console.log(employee)
        setEditingEmployee({ ...employee });
        setIsEditModalOpen(true);
    };

    const handleDelete = (employee) => {
        setEmployeeToDelete(employee);
        setIsDeleteModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/v1/user/${editingEmployee._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingEmployee),
            });
            // console.log(response)
            if (!response.ok) throw new Error('Failed to update employee');
            setIsEditModalOpen(false);
            fetchEmployees();
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/user/${employeeToDelete._id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete employee');
            setIsDeleteModalOpen(false);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const filteredEmployees = employees.filter(employee =>
        Object.values(employee).some(value =>
            value.toString().toLowerCase().includes(searchKeyword.toLowerCase())
        )
    );
    //   console.log(filteredEmployees)

    const handleCreateUser = () => {
        window.location.href = '/createuser';
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Employee List</h1>
                <div className="flex items-center">
                    <span className="font-bold text-xl mr-5">{userName} -</span>
                    <button onClick={handleLogout} className=" font-semibold border-black p-2 rounded-md bg-red-500 text-black hover:scale-105 hover:bg-red-600">Logout</button>
                </div>
            </div>
                <hr/>
                {/* Search Functinality */}
            <div className="flex mt-5 justify-between items-center mb-6">
                <span className='font-semibold text-xl'>Total Count: {employees.length}</span>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Enter Search Keyword"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="mr-2 px-2 py-1 border border-black font-semibold rounded"
                    />
                    <button onClick={handleCreateUser} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Employee</button>
                </div>
            </div>

            {/* Employee Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">Unique Id</th>
                            <th className="border p-2 text-left">Image</th>
                            <th className="border p-2 text-left">Name</th>
                            <th className="border p-2 text-left">Email</th>
                            <th className="border p-2 text-left">Mobile No</th>
                            <th className="border p-2 text-left">Designation</th>
                            <th className="border p-2 text-left">Gender</th>
                            <th className="border p-2 text-left">Course</th>
                            <th className="border p-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee._id} className="hover:bg-gray-50">
                                <td className="border p-2">{employee._id}</td>
                                <td className="border p-2">
                                    {/* {console.log(`http://localhost:3000/${employee.img}`)} */}
                                    <img
                                        src={`http://localhost:3000/${employee.img}`}
                                        alt={employee.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td className="border p-2">{employee.name}</td>
                                <td className="border p-2">{employee.email}</td>
                                <td className="border p-2">{employee.mobile}</td>
                                <td className="border p-2">{employee.designation}</td>
                                <td className="border p-2">{employee.gender}</td>
                                <td className="border p-2">{employee.course}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(employee)} className="text-blue-500 hover:underline mr-2">Edit</button>
                                    <button onClick={() => handleDelete(employee)} className="text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg w-[50%]">
                        <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Name:</label>
                                <input
                                    type="text"
                                    value={editingEmployee.name}
                                    onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Email:</label>
                                <input
                                    type="email"
                                    value={editingEmployee.email}
                                    onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Mobile No:</label>
                                <input
                                    type="number"
                                    value={editingEmployee.mobile}
                                    onChange={(e) => setEditingEmployee({ ...editingEmployee, mobile: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block">Designation</label>
                                <select
                                    name="designation"
                                    value={editingEmployee.designation}
                                    onChange={(e) => setEditingEmployee({ ...editingEmployee, designation: e.target.value })}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="HR">HR</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Sales">Sales</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block">Gender</label>
                                <div>
                                    <label className="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="M"
                                            checked={editingEmployee.gender === 'M'}
                                            onChange={(e) => setEditingEmployee({ ...editingEmployee, gender: e.target.value })}
                                        />
                                        <span className="ml-2">Male</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="F"
                                            checked={editingEmployee.gender === 'F'}
                                            onChange={(e) => setEditingEmployee({ ...editingEmployee, gender: e.target.value })}
                                        />
                                        <span className="ml-2">Female</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block">Course</label>
                                <div>
                                    {['MCA', 'BCA', 'BSC'].map(course => (
                                        <label key={course} className="inline-flex items-center mr-4">
                                            <input
                                                type="checkbox"
                                                name="course"
                                                value={course}
                                                checked={editingEmployee.course.includes(course)}
                                                onChange={(e) => setEditingEmployee({ ...editingEmployee, course: e.target.value })}
                                            />
                                            <span className="ml-2">{course}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>


                            <div className="flex justify-end">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border rounded mr-2">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete {employeeToDelete?.name}?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 border rounded mr-2">Cancel</button>
                            <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfo;