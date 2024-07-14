import './App.css';
import NewsStories from './components/NewsStories';
import NewsPolls from './components/NewsPolls';
import NewsJobs from './components/NewsJobs';
import { AppBar, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import Header from './components/Header';
import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./components/AuthConfig"
import { AuthCheck } from "./components/AuthCheck"
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";

const App = () => {
    const [value, setValue] = useState(0);
    const env = process.env.ENV || 'development';

    const [msalInstance, setMsalInstance] = useState(null);
    useEffect(() => {
        const msalInstanceTemp = new PublicClientApplication(msalConfig);
        msalInstanceTemp.initialize().then(() => {
            setMsalInstance(msalInstanceTemp);
        });
    }, []);

    if (!msalInstance) {
        return <div>Loading...</div>;
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const useStyles = styled((theme) => ({
        story: {
            position: 'relative',
            height: '400px', // Adjust the height as needed
            color: theme.palette.common.white,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: 'url("path/to/your-background-image.jpg")', // Add your image URL here
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the overlay color and opacity
        },
        storyContent: {
            zIndex: 1,
        },
        button: {
            marginTop: theme.spacing(4),
        },
    }));

    return (
        <MsalProvider instance={msalInstance}>
            <AuthCheck>
                <div>
                    <Router>
                        <AppBar position="static">
                            <Header />
                            <Tabs value={value} onChange={handleChange} >
                                <Tab label="New" component={Link} to="/new" sx={{ '&.Mui-selected': { color: '#4caf50'},}} />
                                <Tab label="Top" component={Link} to="/top" sx={{ '&.Mui-selected': { color: '#4caf50' }, }} />/>
                                <Tab label="Best" component={Link} to="/best" sx={{ '&.Mui-selected': { color: '#4caf50' }, }} />/>
                                <Tab label="Jobs" component={Link} to="/jobs" sx={{ '&.Mui-selected': { color: '#4caf50' }, }} />/>
        {/*                        <Tab label="Polls" component={Link} to="/polls" sx={{ '&.Mui-selected': { color: '#4caf50' }, }} />/>*/}
                                <Tab label="Shows" component={Link} to="/shows" sx={{ '&.Mui-selected': { color: '#4caf50' }, }} />/>
                                <Tab label="Asks" component={Link} to="/asks" sx={{ '&.Mui-selected': { color: '#4caf50' }, }} />/>
                            </Tabs> 
                        </AppBar>
                        <Routes>
                            <Route path="/new" element={<NewsStories type="newstories" />} />
                            <Route path="/top" element={<NewsStories type="topstories" />} />
                            <Route path="/best" element={<NewsStories type="beststories" />} />
                            <Route path="/shows" element={<NewsStories type="shows" />} />
                            <Route path="/asks" element={<NewsStories type="asks" />} />
                            <Route path="/jobs" element={<NewsJobs />} />
                            <Route path="/polls" element={<NewsPolls />} />
                         </Routes>
                    </Router>
                </div>
            </AuthCheck>
        </MsalProvider>
        );
};
export default App;
