import React, { useState, useEffect } from 'react'
import { adminendpoints } from '../../../endpoints/adminendpoints';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { adminAxios } from '../../../utils/Config';

type User = {
    username: string;
    isActive: boolean;
    status: boolean;
    email: string;
    mobile: number;
    companyName: string;
    companyemail: string;

}
function UserManagement() {
    const [Users, setUsers] = useState<User[]>([]);
    const handleToggleActive = async (user: User) => {
        try {
            let response = await adminAxios.put(adminendpoints.updateRecruiter, user)
            console.log('response.data.userswekf', response.data.users);
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const handleStatus = async (user: User) => {
        try {
            let response = await adminAxios.put(adminendpoints.approveRecruiter, user)
            console.log('response.data.userswekf', response.data.users);
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('endponis', adminendpoints.getallRecruiter);

                let response = await adminAxios.get(adminendpoints.getallRecruiter);
                console.log('response.data.users', response.data.users);
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
        console.log(Users, 'eo');

    }, []);
    useEffect(() => {
        console.log(Users, 'wiwi');

    }, [Users])

    return (
        <div >
            <h1 className='my-2 text-2xl '>Recruiter Management</h1>
            <div className='flex justify-center'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name </TableCell>
                                <TableCell align="left">E-Mail</TableCell>
                                <TableCell align="left">Mobile</TableCell>
                                <TableCell align="left">Company Name</TableCell>
                                <TableCell align="left">Company E-Mail</TableCell>
                                <TableCell align="left">Active</TableCell>
                                <TableCell align="left">Status</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {Users.map((user) => (
                                <TableRow
                                    key={user.email}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.username}
                                    </TableCell>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="left">{user.mobile}</TableCell>
                                    <TableCell align="left">{user.companyName}</TableCell>
                                    <TableCell align="left">{user.companyemail}</TableCell>
                                    <TableCell align="left">
                                        {user.status ? (
                                            <span>Approved</span>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleStatus(user)}
                                            >
                                                Approve?
                                            </Button>
                                        )}
                                    </TableCell>


                                    <TableCell align="left">
                                        <Button
                                            variant="contained"
                                            color={user.isActive ? 'secondary' : 'primary'}
                                            onClick={() => handleToggleActive(user)}
                                        >
                                            {user.isActive ? 'Block' : 'Unblock'}
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div >
    );

}

export default UserManagement

