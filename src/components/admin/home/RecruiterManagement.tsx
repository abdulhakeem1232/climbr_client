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
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

type User = {
    username: string;
    isActive: boolean;
    status: boolean;
    email: string;
    mobile: number;
    companyName: string;
    companyemail: string;
};

function UserManagement() {
    const [Users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [actionType, setActionType] = useState<'toggleActive' | 'approveStatus' | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const handleToggleActive = async (user: User) => {
        setCurrentUser(user);
        setActionType('toggleActive');
        setShowConfirmation(true);
    };

    const handleStatus = async (user: User) => {
        setCurrentUser(user);
        setActionType('approveStatus');
        setShowConfirmation(true);
    };

    const handleConfirmAction = async () => {
        if (currentUser && actionType) {
            try {
                let response;
                if (actionType == 'toggleActive') {
                    response = await adminAxios.put(adminendpoints.updateRecruiter, currentUser);
                } else if (actionType == 'approveStatus') {
                    response = await adminAxios.put(adminendpoints.approveRecruiter, currentUser);
                }
                if (response) {
                    console.log('Updated user:', response.data.users);
                    setUsers(response.data.users);
                    applyFilters(response.data.users);
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
        setShowConfirmation(false);
    };

    const handleCloseModal = () => {
        setShowConfirmation(false);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        applyFilters(Users);
    };

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setFilter(event.target.value as string);
        applyFilters(Users);
    };

    const applyFilters = (users: User[]) => {
        let result = users;

        if (searchTerm) {
            result = result.filter(user =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
                // ||user.companyName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply status filter
        switch (filter) {
            case 'blocked':
                result = result.filter(user => !user.isActive);
                break;
            case 'unblocked':
                result = result.filter(user => user.isActive);
                break;
            case 'approved':
                result = result.filter(user => user.status);
                break;
            case 'pending':
                result = result.filter(user => !user.status);
                break;
        }

        setFilteredUsers(result);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('endpoints', adminendpoints.getallRecruiter);
                let response = await adminAxios.get(adminendpoints.getallRecruiter);
                console.log('Fetched users:', response.data.users);
                setUsers(response.data.users);
                applyFilters(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 className='my-2 text-2xl'>Recruiter Management</h1>
            <div className='flex justify-between mb-4'>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <FormControl variant="outlined" style={{ minWidth: 120 }}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                        value={filter}
                        onChange={handleFilterChange}
                        label="Filter"
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="blocked">Blocked</MenuItem>
                        <MenuItem value="unblocked">Unblocked</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                </FormControl>
            </div>
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
                            {filteredUsers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user) => (
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
                                            <Button
                                                variant="contained"
                                                color={user.isActive ? 'secondary' : 'primary'}
                                                onClick={() => handleToggleActive(user)}
                                            >
                                                {user.isActive ? 'Block' : 'Unblock'}
                                            </Button>
                                        </TableCell>
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
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <TablePagination
                rowsPerPageOptions={[2, 10, 25]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ConfirmationModal
                show={showConfirmation}
                onClose={handleCloseModal}
                onConfirm={handleConfirmAction}
                message={`Are you sure you want to ${actionType === 'toggleActive' ? (currentUser?.isActive ? 'block' : 'unblock') : 'approve'} ${currentUser?.username}?`}
            />
        </div>
    );
}

export default UserManagement;
