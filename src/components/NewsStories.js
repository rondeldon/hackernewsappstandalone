import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import { Grid, Button, Link } from '@mui/material'
import { useMsal } from '@azure/msal-react';
import NewsStoryComments from './NewsStoryComments';
import { loginRequest } from './AuthConfig';


const NewsStories = ({ type }) => {
    const { instance, accounts } = useMsal();
    const [stories, setData] = useState(null);
    const newsType = type
    const [getstoryIdComments, setStoryComment] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await instance.acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0]
                });

                const url = 'https://appsvc-hackernewsservice.azurewebsites.net/api/HackerNews/' + newsType;
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token.accessToken}`
                    }
                }) ;
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(newsType);
    }, [newsType, instance, accounts]); 

    function formattedDateTime(unixtime) {
        var date = new Date(unixtime * 1000);

        return date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US");
    };
    const handleClick = (storyId) => {
        if (getstoryIdComments && getstoryIdComments.storyId === storyId)
            setStoryComment(null);
        else
            setStoryComment({ storyId });
        console.log(`Button clicked with dynamicValue: ${storyId}`);
    }

    return (

        stories && stories.length && (
            <Grid container spacing={2}> {stories.map((story) =>
            (
                <Grid item key={story.id} xs={12} sm={6} md={4}>
                    <Paper>
                        <div style={{ textAlign: 'left', padding: '10px' }}>
                            {story.url ? <Link href={story.url}> <Typography variant="subtitle1" component="h2" fontWeight="bold">{story.title}</Typography></Link> : <Typography variant="subtitle1" component="h2" fontWeight="bold">{story.title}</Typography>}
                            {story.text && (
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    <Typography variant="body2" style={{ marginLeft: '8px' }} component="p" dangerouslySetInnerHTML={{ __html: story.text }}></Typography>
                                </div>
                            )}
                            <Typography variant="caption" component="p">By: {story.by}</Typography>
                            <Typography variant="caption" component="p">Date: {formattedDateTime(story.time)}</Typography>
                            {story.kids && story.kids.length > 0 && <Button variant = "outlined" size="small" color="inherit" onClick={() => { handleClick(story.id) }} ><Typography variant="caption">
                                get comments({story.kids.length})
                            </Typography></Button>}
                            {getstoryIdComments && getstoryIdComments.storyId === story.id  && <NewsStoryComments storyId={story.id} ></NewsStoryComments>}  
                        </div>
                    </Paper>
                </Grid>
            )
            )};
            </Grid>
        ));
 
};

export default NewsStories;
