import React, {useEffect, useState} from 'react';
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
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

function ReviewInfo () {
    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const [updateRevFlg, setUpdateRevFlg] = useState(false);
    const [value, setValue] = useState(null)

    const loadReview = () => {
        axios.get(`http://localhost:8081/api/v1/review/${id}`)
            .then((res) => {
                setValue(res.data);
            }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        loadReview();
    }, [])


    const handleUpdateEmp = () => {
        setUpdateRevFlg(!updateRevFlg);
    }

    const handleChange = (event, id) => {
        if(id==="title"){
            setValue({...value, title: event.target.value})
        } else if(id === "subtitle") {
            setValue({...value, subtitle: event.target.value})
        } else if (id === "priority") {
            setValue({...value, priority: event.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestObject = value;
        if(requestObject.title !== '' && requestObject.subtitle !== '' && requestObject.priority !== '' ) {
            axios.put(`http://localhost:8081/api/v1/review/${id}`, requestObject)
                .then((res) => {
                    history.push("/review-mgmt");
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push("/review-mgmt");
    }



    return (
        <Box textAlign="center" className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box textAlign="left" p={2}>
                        <Typography variant="h5" component="h5">Review Info</Typography>
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
                            {updateRevFlg
                                ? <FormControl className={classes.formControl}>
                                    <TextField id="standard-basic" label="Review Title"
                                               value={value.title}
                                               onChange={(e) => handleChange(e, "title")}
                                    />
                                </FormControl>
                                : <FormControl className={classes.formControl}>
                                    <Typography variant="subtitle2" component="subtitle2">Review Title</Typography>
                                    <Typography variant="caption" component="subtitle2">{value.title}</Typography>
                                </FormControl>
                            }
                        </Box>
                        <Box p={1}>
                            {updateRevFlg
                                ? <FormControl className={classes.formControl}>
                                    <TextField id="standard-basic" label="Review Title"
                                               value={value.subtitle}
                                               onChange={(e) => handleChange(e, "subtitle")}
                                    />
                                </FormControl>
                                : <FormControl className={classes.formControl}>
                                    <Typography variant="subtitle2" component="subtitle2">Review Subtitle</Typography>
                                    <Typography variant="caption" component="subtitle2">{value.subtitle}</Typography>
                                </FormControl>
                            }
                        </Box>
                        <Box p={1}>
                            {updateRevFlg
                                ? <FormControl className={classes.formControl} component="fieldset">
                                    <FormLabel component="legend">Set Priority</FormLabel>
                                    <RadioGroup aria-label="Set as Admin" name="Set as Admin" value={value.priority}
                                                onChange={(e) => handleChange(e, "priority")}>
                                        <FormControlLabel value={2} control={<Radio />} label="High" />
                                        <FormControlLabel value={1} control={<Radio />} label="Medium" />
                                        <FormControlLabel value={0} control={<Radio />} label="Low" />
                                    </RadioGroup>
                                </FormControl>
                                : <FormControl className={classes.formControl} component="fieldset">
                                    <Typography variant="subtitle2"
                                                component="subtitle2">Priority</Typography>
                                    <Typography variant="caption"
                                                component="subtitle2">{value.priority === 2 ? 'High' : value.priority === 1 ? 'Medium' : 'Low' }</Typography>
                                </FormControl>
                            }
                        </Box>
                        {updateRevFlg
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

export default ReviewInfo;
