import React, { useState, useEffect } from 'react';
import { Typography, Paper, Button} from '@mui/material';
import { Grid } from '@mui/material'
import NewsStoryComments from './NewsStoryCommentIds';



const NewsStory = ( story ) => {
    const [data, setData] = useState(null);
    const [showComment, setComments] = useState(false);

    function formattedDateTime(unixtime) {
        var date = new Date(unixtime * 1000);

        return date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US");
    };

    return (
        <Grid item key={story.story.id} xs={12} sm={6} md={4}>
                 <Paper>
                    <div style={{ textAlign: 'left', padding: '10px' }}>
                    <Typography variant="subtitle1" component="h2">{story.story.title}</Typography>
                    <p> {story.story.score > 50 ? "******" : story.story.score > 40 ? "****" : story.story.score > 30 ? "***" : story.story.score > 20 ? "**" : "*"} </p>
                    <a target="_blank" rel="noreferrer" href={story.story.url} component='button' variant="contained" color="primary" >Read More</a>
                    <Typography variant="body2" component="h2">By: {story.story.by}</Typography>
                    <Typography variant="body2" component="h2">Date: {formattedDateTime(story.story.time)}</Typography>
                    {story.kids && story.story.kids.length > 0 && <NewsStoryComments storyId={story.story.id} />}
                     </div>
                 </Paper>
           </Grid>
            )};

export default NewsStory

