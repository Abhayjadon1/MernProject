


import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import TablePagination from "@mui/material/TablePagination";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    Typography,
    Alert
} from "@mui/material";
import toast from "react-hot-toast";
import axiosInstance from "utils/axiosInstance";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#008080",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [open, setOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("add"); // 'add', 'edit'
    const [formValues, setFormValues] = useState({
        fullName: "",
        email: "",
        dob: "",
        joiningDate: "",
        address: "",
    });
    const [formErrors, setFormErrors] = useState({
        fullName: false,
        email: false,
        dob: false,
        joiningDate: false,
        address: false,
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null); // For edit
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null); // State to hold the employee id to delete
    const [loading, setLoading] = useState(true); // Add this line


    useEffect(() => {
        fetchEmployees(page, rowsPerPage);
    }, [page, rowsPerPage]);

    // const fetchEmployees = () => {
    //     axiosInstance
    //         .get(`/employees`)
    //         .then((response) => {
    //             const employeeData = response.data.data.employees;
    //             const pagination = response.data.data.pagination;
    //             setEmployees(employeeData);
    //             setTotalItems(pagination.totalItems);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching employees:", error);
    //             toast.error("Failed to fetch employees.");
    //         });
    // };
    const fetchEmployees = () => {
        setLoading(true); // Set loading to true before fetching
        axiosInstance
            .get(`/employees`)
            .then((response) => {
                const employeeData = response.data.data.employees;
                const pagination = response.data.data.pagination;
                setEmployees(employeeData);
                setTotalItems(pagination.totalItems);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
                toast.error("Failed to fetch employees.");
            })
            .finally(() => {
                setLoading(false); // Set loading to false after fetching
            });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on changing rows per page
    };
    const handleDeleteClick = (id) => {
        setEmployeeToDelete(id); // Store the id of the employee to be deleted
        setConfirmDialogOpen(true);
    };

    // Confirm deletion
    const confirmDelete = () => {
        if (employeeToDelete) {
            handleDelete(employeeToDelete); // Pass the id to the delete function
        }
        setConfirmDialogOpen(false);
        setEmployeeToDelete(null); // Clear the id after confirmation
    };
    // Close confirmation dialog
    const cancelDelete = () => {
        setConfirmDialogOpen(false);
    };

    const handleClickOpen = (mode, employee = {}) => {
        setDialogMode(mode);
        if (mode === "edit") {
            setFormValues({
                fullName: employee.fullName,
                email: employee.email,
                dob: employee.dob.split("T")[0], // Formatting the date for input field
                joiningDate: employee.joiningDate.split("T")[0],
                address: employee.address,
            });
            setSelectedEmployee(employee);
        } else {
            setFormValues({
                fullName: "",
                email: "",
                dob: "",
                joiningDate: "",
                address: "",
            });
            setSelectedEmployee(null);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        const errors = {
            fullName: !formValues.fullName.trim(),
            email: !formValues.email.trim(),
            dob: !formValues.dob.trim(),
            joiningDate: !formValues.joiningDate.trim(),
            address: !formValues.address.trim(),
        };

        setFormErrors(errors);
        const hasErrors = Object.values(errors).some((error) => error);
        if (hasErrors) {
            toast.error("Please fill out all required fields!");
            return; // Prevent submission if there are errors
        }
        try {
            if (dialogMode === "add") {
                await axiosInstance.post("/employee/add", formValues);
                toast.success("Employee added successfully.");
            } else if (dialogMode === "edit") {
                await axiosInstance.put(`/employees/${selectedEmployee.id}`, formValues);
                toast.success("Employee updated successfully.");
            }
            fetchEmployees(); // Refresh the data
            handleClose(); // Close the dialog
        } catch (error) {
            console.error("Error submitting the form:", error);
            toast.error("Failed to submit the form.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/employees/${id}`);
            fetchEmployees();
            toast.success("Employee deleted successfully.");
        } catch (error) {
            console.error("Error deleting the employee:", error);
            toast.error("Failed to delete the employee.");
        }
    };

    return (
        <div>
            <h3 style={{ textAlign: "right" }}>
                <Button variant="contained" onClick={() => handleClickOpen("add")}>
                    Add New
                </Button>
            </h3>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Sr. No.</StyledTableCell>
                            <StyledTableCell>Employee Name</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">DOB</StyledTableCell>
                            <StyledTableCell align="right">Joining Date</StyledTableCell>
                            <StyledTableCell align="right">Address</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {loading ? (
                        <Typography variant="h4" align="center">Loading...</Typography>
                    ) : (
                        <TableBody>
                            {employees?.map((employee, index) => (
                                <StyledTableRow key={employee.id}>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell>{employee.fullName}</StyledTableCell>
                                    <StyledTableCell align="right">{employee.email}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {new Date(employee.dob).toLocaleDateString()}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {new Date(employee.joiningDate).toLocaleDateString()}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{employee.address}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <EditOutlined
                                            style={{
                                                cursor: "pointer",
                                                fontSize: "20px",
                                                marginRight: "10px",
                                                color: "#008080",
                                            }}
                                            onClick={() => handleClickOpen("edit", employee)}
                                        />
                                        <DeleteOutlined
                                            style={{
                                                cursor: "pointer",
                                                fontSize: "20px",
                                                color: "red",
                                            }}
                                            onClick={() => handleDeleteClick(employee.id)}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
                <TablePagination
                    component="div"
                    count={totalItems}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            {/* Confimation dialog  */}
            <Dialog open={confirmDialogOpen} onClose={cancelDelete}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this employee?
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete}>Cancel</Button>
                    <Button onClick={confirmDelete} color="primary">Delete</Button>
                </DialogActions>
            </Dialog>


            {/* Add/Edit Employee Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{dialogMode === "add" ? "Add Employee" : "Edit Employee"}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Full Name"
                        fullWidth
                        variant="outlined"
                        value={formValues.fullName}
                        onChange={(e) =>
                            setFormValues({ ...formValues, fullName: e.target.value })
                        }
                        error={formErrors.fullName}
                        helperText={formErrors.fullName && "Full Name is required"}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={formValues.email}
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                        error={formErrors.email}
                        helperText={formErrors.email && "Email is required"}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Date of Birth"
                        type="date"
                        fullWidth
                        variant="outlined"
                        value={formValues.dob}
                        onChange={(e) => setFormValues({ ...formValues, dob: e.target.value })}
                        error={formErrors.dob}
                        helperText={formErrors.dob && "Date of Birth is required"}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Joining Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        value={formValues.joiningDate}
                        onChange={(e) =>
                            setFormValues({ ...formValues, joiningDate: e.target.value })
                        }
                        error={formErrors.joiningDate}
                        helperText={formErrors.joiningDate && "Joining Date is required"}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        fullWidth
                        variant="outlined"
                        value={formValues.address}
                        onChange={(e) =>
                            setFormValues({ ...formValues, address: e.target.value })
                        }
                        error={formErrors.address}
                        helperText={formErrors.address && "Address is required"}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">
                        {dialogMode === "add" ? "Add" : "Update"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
