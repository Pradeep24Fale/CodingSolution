// Styles and imports were ommited
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {AccountCircle, ExitToApp} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PeopleIcon from '@material-ui/icons/People';
import RateReviewIcon from '@material-ui/icons/RateReview';
import {useAuth} from "../../../../Context/auth";
import {useHistory, withRouter} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundImage: `linear-gradient(#cfd9df,#e2ebf0)`,
        color: 'grey',
    },
    bigAvatar: {
        margin: 30,
        width: 100,
        height: 100,
    },
}));

function SideMenu(props) {
    const classes = useStyles();
    const history = useHistory();
    const {setUser} = useAuth();
    const handleLogOut = () => {
        history.push("/")
        localStorage.removeItem('user');
        setUser(null);
    }

    const handleGoToPage = (path) => {
        history.push(`/${path}`);
    }

    return (
        <Drawer
            open={true}
            variant='permanent'
            anchor='left'
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Grid container justify='center' alignItems='center'>
                <Avatar
                    src='https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
                    className={classes.bigAvatar}
                />
            </Grid>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary={props.user.admin === 1 ? 'Admin Profile' : 'Employee Profile'} />
                </ListItem>
                {
                    props.user.admin === 1 ?
                        <>
                    <ListItem button onClick={() =>handleGoToPage("employee-mgmt")}>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Employee Management"/>
                    </ListItem>
                    <ListItem button onClick={() => handleGoToPage("review-mgmt")}>
                    <ListItemIcon>
                    <RateReviewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Review Management" />
                    </ListItem>
                    </>
                    : <></>
                }
                    <ListItem button onClick={handleLogOut}>
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                    </ListItem>
            </List>
        </Drawer>
    );
}

export default SideMenu;