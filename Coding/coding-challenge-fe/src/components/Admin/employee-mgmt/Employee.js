import React, {useEffect, useState} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
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
import {useHistory, withRouter} from 'react-router-dom'

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

function Employee() {
    const {user} = useAuth();
    const userObject = typeof user === 'string' ? JSON.parse(user) : user
    const classes = useStyles();
    const history = useHistory();
    const [employeeData, setEmployeeData] = useState([]);
    const [createEmpFlg, setCreateEmpFlg] = useState(false);
    const [value, setValue] = useState({
        name: '',
        password: '',
        reviewEmpId: null,
        admin: 0,
    })

    const loadEmployee = () => {
        axios.get("http://localhost:8081/api/v1/employees")
            .then((res) => {
                setEmployeeData(res.data)
            }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        loadEmployee();
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/api/v1/employee/${id}`)
            .then((res) => {
                loadEmployee();
            }).catch((err) => {
            console.log(err);
        })
    }

    const handleCreateEmp = () => {
        setCreateEmpFlg(true);
    }

    const handleChange = (event, id) => {
        if (id === "username") {
            setValue({...value, name: event.target.value})
        } else if (id === "password") {
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
        if (requestObject.password !== '' && requestObject.name !== '' && requestObject.reviewEmpId !== '') {
            axios.post("http://localhost:8081/api/v1/employees", requestObject)
                .then((res) => {
                    loadEmployee();
                    setCreateEmpFlg(false);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setValue({password: '', name: '', reviewEmpId: '', admin: 0});
        setCreateEmpFlg(false);
    }


    const handleEmployeeInfo = (id) => {
        history.push(`/employee-mgmt/${id}`);
    }

    return (
        <Box textAlign="center" className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box textAlign="left" p={2}>
                        <Typography variant="h5" component="h5">Employee Management</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        !createEmpFlg && <Box p={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleCreateEmp}
                            >
                                Create Employee
                            </Button>
                        </Box>
                    }
                </Grid>
            </Grid>
            {
                !createEmpFlg
                    ? <List>
                        {
                            employeeData && employeeData.filter((data) => data.empId !== userObject.empId && data.admin !== 1).map((employee, index) => {
                                return <Box key={employee.empId} p={1} className={classes.card}>
                                    <Card>
                                        <CardContent>
                                            <ListItem onClick={() => {
                                                handleEmployeeInfo(employee.empId)
                                            }}>
                                                <Box style={{display: 'flex'}}>
                                                    <Box>
                                                        <Typography variant="h6" component="h6">{index + 1}.</Typography>
                                                    </Box>
                                                    <Box ml={2}>
                                                        <ListItemText
                                                            primary={employee.name}
                                                        />
                                                    </Box>
                                                </Box>
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete">
                                                        <DeleteIcon onClick={() => {
                                                            handleDelete(employee.empId)
                                                        }}/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </CardContent>
                                    </Card>
                                </Box>
                            })
                        }
                    </List>
                    : <Box textAlign="left">
                        <form className={classes.form} onSubmit={handleSubmit} onReset={handleCancel}>
                            <Box p={1}>
                                <FormControl className={classes.formControl}>
                                    <TextField id="standard-basic" label="User Name"
                                               value={value.name}
                                               onChange={(e) => handleChange(e, "username")}
                                    />
                                </FormControl>
                            </Box>
                            <Box p={1}>
                                <FormControl className={classes.formControl}>
                                    <TextField id="standard-basic" label="Password"
                                               value={value.password}
                                               onChange={(e) => handleChange(e, "password")}
                                    />
                                </FormControl>
                            </Box>
                            {
                                value.admin === 0 && <Box p={1}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Select Employee to be
                                            Review</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={value.reviewEmpId}
                                            onChange={(e) => handleChange(e, "reviewEmpId")}
                                        >
                                            {
                                                employeeData && employeeData.filter((data) => data.empId !== userObject.empId && data.admin !== 1 && data.reviewStatus === 0).map((employee) => {
                                                    return <MenuItem value={employee.empId}>{employee.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            }
                            <Box p={1}>
                                <FormControl className={classes.formControl} component="fieldset">
                                    <FormLabel component="legend">Set as Admin</FormLabel>
                                    <RadioGroup aria-label="Set as Admin" name="Set as Admin" value={value.admin}
                                                onChange={(e) => handleChange(e, "admin")}>
                                        <FormControlLabel value={1} control={<Radio/>} label="Yes"/>
                                        <FormControlLabel value={0} control={<Radio/>} label="No"/>
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box p={2}>
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
                        </form>
                    </Box>
            }
        </Box>
    );
}

export default withRouter(Employee);
