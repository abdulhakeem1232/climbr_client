import React, { useState, useEffect } from 'react';
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
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

type User = {
    username: string;
    isActive: boolean;
    email: string;
    mobile: number;
}

function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [usersPerPage] = useState<number>(3);
    const [filter, setFilter] = useState<string>('all');

    const handleToggleActive = async (user: User) => {
        setCurrentUser(user);
        setShowConfirmation(true);
    };

    const handleConfirmToggleActive = async () => {
        if (currentUser) {
            try {
                let response = await adminAxios.put(adminendpoints.updateUser, currentUser);
                setUsers(response.data.users);
                applyFilters(response.data.users);
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
                setUsers(response.data.users);
                applyFilters(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const applyFilters = (userList: User[]) => {
        let result = userList;

        if (searchTerm) {
            result = result.filter(user =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filter !== 'all') {
            result = result.filter(user =>
                (filter === 'blocked' && !user.isActive) || (filter === 'unblocked' && user.isActive)
            );
        }

        setFilteredUsers(result);
    };

    useEffect(() => {
        applyFilters(users);
    }, [searchTerm, filter]);

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className='my-4 text-3xl font-bold text-gray-800'>User Management</h1>
            <div className="mb-4 flex justify-between items-center">
                <TextField
                    label="Search users"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControl variant="outlined" style={{ minWidth: 120 }}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as string)}
                        label="Filter"
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="blocked">Blocked</MenuItem>
                        <MenuItem value="unblocked">Unblocked</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TableContainer component={Paper} className="shadow-lg">
                <Table aria-label="user table">
                    <TableHead className="bg-gray-200">
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell align="left"><strong>E-Mail</strong></TableCell>
                            <TableCell align="left"><strong>Mobile</strong></TableCell>
                            <TableCell align="left"><strong>Status</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentUsers.map((user) => (
                            <TableRow key={user.email}>
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
            <div className="mt-4 flex justify-center">
                <Pagination
                    count={Math.ceil(filteredUsers.length / usersPerPage)}
                    page={currentPage}
                    onChange={paginate}
                    color="primary"
                />
            </div>
            <ConfirmationModal
                show={showConfirmation}
                onClose={handleCloseModal}
                onConfirm={handleConfirmToggleActive}
                message={`Are you sure you want to ${currentUser?.isActive ? 'block' : 'unblock'} ${currentUser?.username}?`}
            />
        </div>
    );
}

export default UserManagement;
