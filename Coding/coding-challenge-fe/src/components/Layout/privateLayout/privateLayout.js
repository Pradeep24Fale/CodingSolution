import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from "./TopMenu/TopMenu";
import SideMenu from "./SideMenu/SideMenu";
import MainContent from "./MainContent/MainContent";
import Footer from "./Footer/Footer";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}));

function PrivateLayout(props) {
    const classes = useStyles();
    console.log('inside private route')

    return (
        <div className={classes.root}>
            <TopMenu user={props.user} />
            <SideMenu user={props.user} />
            <MainContent>
                {props.children}
            </MainContent>
            <Footer />
        </div>
    );
}

export default PrivateLayout;
