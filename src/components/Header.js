// src/components/Header.js
import React from 'react';
import { Grid, AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    console.log(location);

    const getPageTitle = () => {
        if (location.pathname === '/new' || location.pathname === '/') {
            return 'Hacker News! ... The Newest Stories';
        }
        else if (location.pathname === '/top') {
            return 'Hacker News! ... The Top Stories';
        }
        else if (location.pathname === '/best') {
            return 'Hacker News! ... The Best Stories';
        }
        else if (location.pathname === '/shows') {
            return 'Hacker News! ... The Shows';
        }
        else if (location.pathname === '/asks') {
            return 'Hacker News! ... The Asks';
        }
        else if (location.pathname === '/polls') {
            return 'Hacker News! ... The Polls';
        }
        else if (location.pathname === '/jobs') {
            return 'Hacker News! ... The Jobs';
        }
        else {
            return 'Hacker News!';
        }
    };

    const getPageColor = () => {
        switch (location.pathname) {
            case '/':
                return '#2196f3'; // Blue for Home
            case '/about':
                return '#4caf50'; // Green for About
            case '/contact':
                return '#ff5722'; // Orange for Contact
            default:
                return '#2196f3'; // Default color
        }
    };

    return (
        <AppBar position="static" style={{ backgroundColor: getPageColor() }}>
            <Toolbar>
                <Grid container justifyContent="center">
                <Typography variant="h2" component="div">
                    {getPageTitle()}
                    </Typography>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
