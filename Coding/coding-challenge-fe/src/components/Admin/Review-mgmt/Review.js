import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../Context/auth";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {Box, CardContent, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

function Review () {
    const classes = useStyles();
    const history = useHistory();
    const [reviewData, setReviewData] = useState([]);
    const [createRevFlg, setCreateRevFlg] = useState(false);
    const [value, setValue] = useState({
        title: '',
        subtitle: '',
        priority: 0
    })

    const loadReview = () => {
        axios.get("http://localhost:8081/api/v1/reviews")
            .then((res) => {
                setReviewData(res.data)
            }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        loadReview();
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/api/v1/review/${id}`)
            .then((res) => {
                loadReview();
            }).catch((err) => {
            console.log(err);
        })
    }

    const handleCreateReview = () => {
        setCreateRevFlg(true);
    }

    const handleChange = (event, id) => {
        if(id==="title"){
            setValue({...value, title: event.target.value})
        } else if(id === "subtitle") {
            setValue({...value, subtitle: event.target.value})
        }else if (id === "priority") {
            setValue({...value, priority: Number(event.target.value)})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestObject = value;
        if(requestObject.title !== '' && requestObject.subtitle !== '' && requestObject.priority !== '' ) {
            axios.post("http://localhost:8081/api/v1/reviews", requestObject)
                .then((res) => {
                    loadReview();
                    setCreateRevFlg(false);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setValue({title: '', subtitle: '', priority: 0});
        setCreateRevFlg(false);
    }


    const handleReviewInfo = (id) => {
        history.push(`/review-mgmt/${id}`);
    }

    return (
        <Box textAlign="center" className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box textAlign="left" p={2}>
                        <Typography variant="h5" component="h5">Review Management</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        !createRevFlg && <Box p={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleCreateReview}
                            >
                                Create Review
                            </Button>
                        </Box>
                    }
                </Grid>
            </Grid>
            {
                !createRevFlg
                    ?  <List>
                        {
                            reviewData && reviewData.map((review, index) => {
                                return <Box key={review.empId} p={1} className={classes.card}>
                                    <Card>
                                        <CardContent>
                                            <ListItem onClick={() => {handleReviewInfo(review.reviewId)}}>
                                                <Box style={{display: 'flex'}}>
                                                <Box>
                                                    <Typography variant="h6" component="h6">{index + 1}.</Typography>
                                                </Box>
                                                <Box ml={2}>
                                                    <ListItemText
                                                        primary={review.title}
                                                    />
                                                </Box>
                                                </Box>
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete">
                                                        <DeleteIcon onClick={() => {
                                                            handleDelete(review.reviewId)
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
                                    <TextField id="standard-basic" label="Review Title"
                                               value={value.title}
                                               onChange={(e) => handleChange(e, "title")}
                                    />
                                </FormControl>
                            </Box>
                            <Box p={1}>
                                <FormControl className={classes.formControl}>
                                    <TextField id="standard-basic" label="Review Subtitle"
                                               value={value.subtitle}
                                               onChange={(e) => handleChange(e, "subtitle")}
                                    />
                                </FormControl>
                            </Box>
                            <Box p={1}>
                                <FormControl className={classes.formControl} component="fieldset">
                                    <FormLabel component="legend">Set Priority</FormLabel>
                                    <RadioGroup aria-label="Set as Admin" name="Set as Admin" value={value.priority} onChange={(e) => handleChange(e, "priority")}>
                                        <FormControlLabel value={2} control={<Radio />} label="High" />
                                        <FormControlLabel value={1} control={<Radio />} label="Medium" />
                                        <FormControlLabel value={0} control={<Radio />} label="low" />
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

export default Review;
