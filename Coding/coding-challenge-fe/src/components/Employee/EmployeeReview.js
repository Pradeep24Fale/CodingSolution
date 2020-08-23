import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Box, CardContent, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from '@material-ui/icons/Star';
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

function EmployeeReview (props) {
    const classes = useStyles();
    const [reviewData, setReviewData] = useState([]);
    const [empToBeReview, setEmpToBeReview] = useState({});

    const loadReview = () => {
        axios.get("http://localhost:8081/api/v1/reviews")
            .then((res) => {
                const data = res.data;
                const reviews = data.map((item) => {
                    const tempItem = {...item}
                    tempItem['answer'] = ''
                    return tempItem
                });
                setReviewData(reviews)
            }).catch((err) => {
            console.log(err);
        })
    }
    const loadEmployee = () => {
        axios.get(`http://localhost:8081/api/v1/employee/${props.user.reviewEmpId}`)
            .then((res) => {
                setEmpToBeReview(res.data);
            }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        loadReview();
        if(props.user.reviewEmpId) {
            loadEmployee();
        } else {
            setEmpToBeReview({})
        }
    }, [])


    const handleChange = (event, reviewId) => {
        const tempReviewData = reviewData.map((item) => {
            if (item.reviewId === reviewId) {
                item.answer = event.target.value;
            }
            return item;
        });
            setReviewData(tempReviewData);
    }

    const handleFeedback = () => {
        const requestObject = reviewData.map((item) => {
            return {
                reviewId: item.reviewId,
                answer: item.answer,
            }
        });
        axios.post(`http://localhost:8081/api/v1/feedback/${props.user.empId}/${empToBeReview.empId}`, requestObject)
            .then((res) => {
                setEmpToBeReview({})
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <Box p={3} textAlign="center" className={classes.root}>
                    <Box textAlign="left" p={2}>
                        <Typography variant="h5" component="h5">Employee Review</Typography>
                    </Box>
            {
               Object.keys(empToBeReview).length > 0 && empToBeReview.reviewStatus !==1
                ? <><Box textAlign="left" p={2}>
                    <Typography variant="h5" component="h5">{`Please review ${empToBeReview.name}`}</Typography>
                </Box>
                <List>
                {
                    reviewData && reviewData.map((review, index) => {
                        return <Box key={review.empId} p={1} className={classes.card}>
                            <Card>
                                <CardContent>
                                    <ListItem style={{display: 'block'}}>
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
                                        <Box ml={4}>
                                            <Typography variant="subtitle2">
                                                Details:
                                            </Typography>
                                            <ListItemText
                                                primary={review.subtitle}
                                            />
                                        </Box>
                                        {
                                            review.priority === 2
                                                ? <ListItemSecondaryAction>
                                                    <IconButton edge="end">
                                                        <StarIcon/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                                : <></>
                                        }
                                    </ListItem>
                                </CardContent>
                            </Card>
                            <Box p={4}>
                                <RadioGroup aria-label="feedback" name="feedback" value={review.answer}
                                            onChange={(e) => handleChange(e, review.reviewId)}>
                                    <FormControlLabel value="Not Good" control={<Radio/>} label="Not Good"/>
                                    <FormControlLabel value="Average" control={<Radio/>} label="Average"/>
                                    <FormControlLabel value="Good" control={<Radio/>} label="Good"/>
                                    <FormControlLabel value="Best" control={<Radio/>} label="Best"/>
                                </RadioGroup>
                            </Box>
                        </Box>
                    })
                }
                </List>

                <Box p={2}>
                <Button
                color="primary"
                variant="contained"
                onClick={handleFeedback}
                >
                FeedBack
                </Button>
                </Box>
                </>
                    : <Box textAlign="left" p={2}>
                        <Typography variant="h5" component="h5">Sorry You don't have employee to review!!!!</Typography>
                    </Box>
            }
        </Box>
    );
}

export default EmployeeReview;
