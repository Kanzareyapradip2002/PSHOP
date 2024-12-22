import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdEditOff, MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../Components/ChangeUserRole';
import ROLE from '../common/role';
import { useNavigate } from 'react-router-dom';
import SeandSecreatKEY from '../Components/SeandSecreatKEY';

const AllUsers = () => {
    const [isSendingKey, setIsSendingKey] = useState(false);
    const [userDetails, setUserDetails] = useState({ name: "", email: "", role: "", _id: "" });
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    const buttonStyle = 'bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white';

    const fetchAllUsers = async () => {
        try {
            const response = await fetch(SummaryApi.AllUser.url, {
                method: SummaryApi.AllUser.method,
                credentials: 'include',
            });

            const dataResponse = await response.json();
            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Failed to fetch users");
            console.error(error);
        }
    };

    const sendMessage = () => {
        navigate("/Seand-Massge-Oner");
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{moment(user.createdAt).format('LL')}</td>
                            <td>
                                {user.role === ROLE.GENERAL ? (
                                    <button onClick={sendMessage} aria-label="Send Message">
                                        <div className={buttonStyle}>
                                            <MdEditOff />
                                        </div>
                                    </button>
                                ) : (
                                    <button
                                        className={buttonStyle}
                                        onClick={() => {
                                            if (!isSendingKey) setUserDetails(user);
                                            setIsSendingKey(!isSendingKey);
                                        }}
                                        aria-label={isSendingKey ? "Edit User Role" : "Send Secret Key"}
                                    >
                                        <div className={buttonStyle}>
                                            {isSendingKey ? <MdModeEdit /> : <MdEditOff />}
                                        </div>
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {isSendingKey && (
                <SeandSecreatKEY
                    onClose={() => setIsSendingKey(false)}
                    name={userDetails.name}
                    email={userDetails.email}
                    role={userDetails.role}
                    userId={userDetails._id}
                    callFun={fetchAllUsers}
                />
            )}
        </div>
    );
};

export default AllUsers;
