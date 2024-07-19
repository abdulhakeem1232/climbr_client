import React, { useState, useEffect } from 'react';
import { adminAxios } from '../../../utils/Config';
import { adminendpoints } from '../../../endpoints/adminendpoints';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface Skill {
    _id: string;
    skill: string;
}

function SkillsManagement() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [open, setOpen] = useState(false);
    const [newSkill, setNewSkill] = useState('');
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            let response = await adminAxios.get(adminendpoints.getallskills);
            setSkills(response.data?.skills);
        } catch (err) {
            console.error("ERROR WHILE FETCHING SKILLS:", err);
        }
    };

    const handleOpen = () => {
        setOpen(true);
        setEditingSkill(null);
        setNewSkill('');
    };

    const handleClose = () => {
        setOpen(false);
        setEditingSkill(null);
        setNewSkill('');
    };

    const handleAddSkill = async () => {
        try {
            await adminAxios.post(adminendpoints.addskills, { skill: newSkill });
            fetchSkills();
            handleClose();
        } catch (err) {
            console.error("ERROR WHILE ADDING SKILL:", err);
        }
    };

    const handleEditSkill = (skill: Skill) => {
        setEditingSkill(skill);
        setNewSkill(skill.skill);
        setOpen(true);
    };

    const handleUpdateSkill = async () => {
        if (editingSkill) {
            try {
                console.log('skill');
                await adminAxios.put(adminendpoints.updateskills, {
                    _id: editingSkill._id,
                    skill: newSkill
                });
                fetchSkills();
                handleClose();
            } catch (err) {
                console.error("ERROR WHILE UPDATING SKILL:", err);
            }
        }
    };

    const handleDeleteSkill = async (skillId: string) => {
        try {
            await adminAxios.delete(`${adminendpoints.deleteskills}/${skillId}`);
            fetchSkills();
        } catch (err) {
            console.error("ERROR WHILE DELETING SKILL:", err);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className='my-4 text-3xl font-bold text-gray-800'>Skills Management</h1>
            <div className="flex justify-start mb-4">
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Add Skill
                </Button>
            </div>
            <div className="">
                <TableContainer component={Paper} className='w-fit' >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Skill</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {skills?.map((skill) => (
                                <TableRow key={skill._id}>
                                    <TableCell component="th" scope="row">
                                        {skill.skill}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleEditSkill(skill)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteSkill(skill._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Skill"
                        type="text"
                        fullWidth
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={editingSkill ? handleUpdateSkill : handleAddSkill}>
                        {editingSkill ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default SkillsManagement;
