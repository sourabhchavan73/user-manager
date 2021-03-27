import React from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
    tabContainer: {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center"
    },

    button:{
        ...theme.typography.button
    },

    title:{
        textDecoration: 'none',
        color: '#fff',
        fontWeight: 500,
        fontSize: '1.5rem'
    },

    iconContainer:{
        margin: '0 1rem'
    }
}))

const Header = () => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar>
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Typography className={classes.title}>
                                User Manager
                            </Typography>
                           
                        </Link>
                        <div className={classes.tabContainer} >
                            <AccountCircle  className={classes.iconContainer}/> 
                            <MailIcon className={classes.iconContainer} />
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default Header
