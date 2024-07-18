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
import ConfirmationModal from '../../user/home/ConfirmationModal';

type User = {
    username: string;
    isActive: boolean;
    email: string;
    mobile: number;

}
function UserManagement() {
    const [Users, setUsers] = useState<User[]>([]);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const handleToggleActive = async (user: User) => {
        setCurrentUser(user);
        setShowConfirmation(true);
    };

    const handleConfirmToggleActive = async () => {
        if (currentUser) {
            try {
                let response = await adminAxios.put(adminendpoints.updateUser, currentUser);
                console.log('Updated user:', response.data.users);
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
        setShowConfirmation(false);
    };
    const handleCloseModal = () => {
        setShowConfirmation(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await adminAxios.get(adminendpoints.getallUser);
                console.log('response.data.users', response.data.users);
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
        console.log(Users, 'eo');

    }, []);

    return (
        <div >
            <h1 className='my-2 text-2xl '>UserManagement</h1>
            <div className='flex justify-center'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name </TableCell>
                                <TableCell align="left">E-Mail</TableCell>
                                <TableCell align="left">Mobile</TableCell>
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
                                    <TableCell align="left">{user.mobile || "Not Available"}</TableCell>
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
            <ConfirmationModal
                show={showConfirmation}
                onClose={handleCloseModal}
                onConfirm={handleConfirmToggleActive}
                message={`Are you sure you want to ${currentUser?.isActive ? 'block' : 'unblock'} ${currentUser?.username}?`}
            />
        </div >
    );

}

export default UserManagement

