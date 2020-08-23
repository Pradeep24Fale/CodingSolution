import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from "./TopMenu/TopMenu";
import MainContent from "./MainContent/MainContent";
import Footer from "./Footer/Footer";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}));

function PrivateLayout(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TopMenu />
            <MainContent>
                {props.children}
            </MainContent>
            <Footer />
        </div>
    );
}

export default PrivateLayout;
