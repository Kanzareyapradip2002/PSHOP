import React, { useState } from 'react';
import ROLE from '../common/role';
import { VscChromeClose } from "react-icons/vsc";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, onClose, userId, callFun }) => {
    const [userRole, setUserRole] = useState(role);
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    };

    
    const updateUserRole = async () => {
        try {
            const fetchResponse = await fetch(SummaryApi.UpdateUser.url, {
                method: SummaryApi.UpdateUser.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    role: userRole
                })
            });
            const responseData = await fetchResponse.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                callFun();
            } else {
                toast.error(responseData.message || "Failed to update role");
            }

            console.log("responseData", responseData);
        } catch (error) {
            toast.error("An error occurred while updating the role.");
            console.error("Error updating role:", error);
        }
    };

    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-60'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <VscChromeClose />
                </button>
                    <>
                        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                        <p>Name: {name}</p>
                        <p>Email: {email}</p>
                        <div className='flex items-center justify-between my-4'>
                            <p>Role:</p>
                            <select className='border px-4 py-1 cursor-pointer' value={userRole} onChange={handleOnChangeSelect}>
                                {Object.values(ROLE).map(el => (
                                    <option value={el} key={el}>{el}</option>
                                ))}
                            </select>
                        </div>
                        <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>
                            Change Role
                        </button>
                    </>
            </div>
        </div>
    );
};

export default ChangeUserRole;
