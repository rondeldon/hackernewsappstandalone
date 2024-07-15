import './App.css';
import NewsStories from './components/NewsStories';
/*import NewsJobs from './components/NewsJobs';*/
import { AppBar, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import Header from './components/Header';
import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./components/AuthConfig"
import { AuthCheck } from "./components/AuthCheck"
import { MsalProvider } from "@azure/msal-react";

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
                            <Route path="/jobs" element={<NewsStories type="jobs" />} />
                            {/*                         <Route path="/polls" element={<NewsPolls />} /> */}
                         </Routes>
                    </Router>
                </div>
            </AuthCheck>
        </MsalProvider>
        );
};
export default App;
