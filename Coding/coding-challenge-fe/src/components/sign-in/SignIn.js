import React from 'react';
import {Container} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "../../Context/auth";
import {useHistory, withRouter} from "react-router-dom";

import axios from "axios"

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
    }
}));

function SignIn () {
    const classes = useStyles();
    const {setUser} = useAuth();
    const history = useHistory();
    const [value, setValue] = React.useState({
        username: '',
        password: ''
    });

    const handleChange = (event, id) => {
        if(id==="username"){
            setValue({...value, username: event.target.value})
        } else {
            setValue({...value, password: event.target.value})
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestObject = value;
        if(requestObject.password !== '' && requestObject.username !== '') {
            axios.post("http://localhost:8081/authenticate", requestObject)
                .then((res) => {
                    setUser(res.data)
                    console.log(res)
                    localStorage.setItem('user', JSON.stringify(res.data));
                    history.push("/")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <Container maxWidth="xs">
            <Box textAlign="center">
            <form className={classes.form} onSubmit={handleSubmit}>
                <Box p={2}>
                <TextField id="standard-basic" label="User Name"
                           value={value.username}
                           onChange={(e) => handleChange(e, "username")}
                />
                </Box>
                <Box p={2}>
                <TextField id="standard-basic" label="Password"
                           type="password"
                           value={value.password}
                           onChange={(e) => handleChange(e, "password")}
                />
                </Box>
                <Box p={2}>
                    <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    >
                        Submit
                    </Button>
                </Box>
            </form>
            </Box>
        </Container>
    );
}

export default withRouter(SignIn);
