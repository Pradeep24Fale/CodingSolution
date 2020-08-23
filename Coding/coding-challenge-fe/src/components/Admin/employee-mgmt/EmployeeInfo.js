import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useAuth} from "../../../Context/auth";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box, CardContent, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { useParams, useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 752,
    },
    card: {
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
    },
}));

function Employee () {
    const {user} = useAuth();
    const userObject = typeof user === 'string' ? JSON.parse(user): user
    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const [employeeData, setEmployeeData] = useState([]);
    const [updateEmpFlg, setUpdateEmpFlg] = useState(false);
    const [value, setValue] = useState(null)

    const loadEmployee = () => {
        axios.get(`http://localhost:8081/api/v1/employee/${id}`)
            .then((res) => {
                setValue(res.data);
            }).catch((err) => {
            console.log(err);
        })
    }

    const loadAllEmployees = () => {
        axios.get("http://localhost:8081/api/v1/employees")
            .then((res) => {
                setEmployeeData(res.data)
            }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        loadEmployee();
        loadAllEmployees();
    }, [])


    const handleUpdateEmp = () => {
        setUpdateEmpFlg(!updateEmpFlg);
    }

    const handleChange = (event, id) => {
        if(id==="username"){
            setValue({...value, name: event.target.value})
        } else if(id === "password") {
            setValue({...value, password: event.target.value})
        } else if (id === "reviewEmpId") {
            setValue({...value, reviewEmpId: event.target.value})
        } else if (id === "admin") {
            setValue({...value, admin: Number(event.target.value)})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestObject = value;
        if(requestObject.password !== '' && requestObject.name !== '' && requestObject.reviewEmpId !== '' ) {
            axios.put(`http://localhost:8081/api/v1/employee/${id}`, requestObject)
                .then((res) => {
                    history.push("/employee-mgmt");
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push("/employee-mgmt");
    }



    return (
        <Box textAlign="center" className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box textAlign="left" p={2}>
                        <Typography variant="h5" component="h5">Employee Info</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}><Box p={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleUpdateEmp}
                            >
                                update
                            </Button>
                        </Box>
                </Grid>
            </Grid>
            {
                value && <Box textAlign="left">
                    <form className={classes.form} onSubmit={handleSubmit} onReset={handleCancel}>
                        <Box p={1}>
                            {updateEmpFlg
                                ? <FormControl className={classes.formControl}>
                                    <TextField id="standard-basic" label="User Name"
                                               value={value.name}
                                               onChange={(e) => handleChange(e, "username")}
                                    />
                                </FormControl>
                                : <FormControl className={classes.formControl}>
                                    <Typography variant="subtitle2" component="subtitle2">Employee Name</Typography>
                                    <Typography variant="caption" component="subtitle2">{value.name}</Typography>
                                </FormControl>
                            }
                        </Box>
                        <Box p={1}>
                            {updateEmpFlg
                                ? value.empStatus !== 1 && value.admin === 0 && <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Select Employee to be
                                        Review</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={value.reviewEmpId}
                                        onChange={(e) => handleChange(e, "reviewEmpId")}
                                    >
                                        {
                                            employeeData && employeeData.filter((data) => data.empId !== userObject.empId && data.admin !== 1 && data.reviewStatus === 0 ).map((employee) => {
                                                return <MenuItem value={employee.empId}>{employee.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                : <FormControl className={classes.formControl} component="fieldset">
                                    <Typography variant="subtitle2" component="subtitle2">Employee to be Review</Typography>
                                    <Typography variant="caption" component="p">{
                                        value.reviewEmpId ? employeeData && value && employeeData.find((employee) => employee.empId === Number(value.reviewEmpId))?.name : 'Not Assigned'
                                    }</Typography>
                                </FormControl>
                            }
                        </Box>
                        <Box p={1}>
                            {updateEmpFlg
                                ? <FormControl className={classes.formControl} component="fieldset">
                                    <FormLabel component="legend">Set as Admin</FormLabel>
                                    <RadioGroup aria-label="Set as Admin" name="Set as Admin" value={value.admin}
                                                onChange={(e) => handleChange(e, "admin")}>
                                        <FormControlLabel value={1} control={<Radio/>} label="Yes"/>
                                        <FormControlLabel value={0} control={<Radio/>} label="No"/>
                                    </RadioGroup>
                                </FormControl>
                                : <FormControl className={classes.formControl} component="fieldset">
                                    <Typography variant="subtitle2"
                                                component="subtitle2">Admin</Typography>
                                    <Typography variant="caption"
                                                component="subtitle2">{value.admin === 1 ? 'Yes' : 'No'}</Typography>
                                </FormControl>
                            }
                        </Box>
                        {
                            !updateEmpFlg && <Box p={1}>
                                <FormControl className={classes.formControl} component="fieldset">
                                    <Typography variant="subtitle2"
                                                component="subtitle2">Is busy with other review?</Typography>
                                    <Typography variant="caption"
                                                component="subtitle2">{value.empStatus === 1 ? 'Busy' : 'Free'}</Typography>
                                </FormControl>
                            </Box>
                        }
                        {!updateEmpFlg
                        && <Box p={1}>
                            <FormControl className={classes.formControl} component="fieldset">
                                <Typography variant="subtitle2"
                                            component="subtitle2">Review status</Typography>
                                <Typography variant="caption"
                                            component="subtitle2">{value.reviewStatus === 1 ? 'Reviewed' : value.reviewStatus === 2 ? 'Assigned' : 'Not reviewed'}</Typography>
                            </FormControl>
                        </Box>
                        }
                        {updateEmpFlg
                            ? <Box p={2}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            type="reset"
                                            color="primary"
                                            variant="contained"
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            : <></>
                        }
                    </form>
                </Box>
            }
        </Box>
    );
}

export default Employee;
