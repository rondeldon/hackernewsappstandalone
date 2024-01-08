import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Typography, Paper } from '@mui/material';
import { Grid, Button, Link } from '@mui/material'
import NewsStoryComments from './NewsStoryComments';


const NewsStories = () => {

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

    const [stories, setData] = useState(null);
    const [getstoryIdComments, setStoryComment] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5160/api/HackerNews/jobs');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []); // The empty dependency array ensures the effect runs once on component mount

    function formattedDateTime(unixtime) {
        var date = new Date(unixtime * 1000);

        return date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US");
    };
    const handleClick = (storyId) => {
        // Your logic with dynamicValue

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
                            <Link href={story.url}> <Typography variant="subtitle1" component="h2" fontWeight="bold">{story.title}</Typography></Link>
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
