import React, { useState, useEffect } from 'react';
import { Typography, Paper} from '@mui/material';
import { List, ListItem } from '@mui/material';


const NewsStoryComments = ({ storyId }) => {
    const [comments, setData] = useState(null);

    useEffect(() => {
        const fetchData = async (domain, storyId) => {
            try {
                const url = domain + storyId + "/comments";
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData('https://appsvc-hackernewsservice.azurewebsites.net/api/HackerNews/', storyId);
    }, [storyId]); // The empty dependency array ensures the effect runs once on component mount

    function formattedDateTime( unixtime )
    {
        var date = new Date(unixtime * 1000);

        return date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US");
    }

    return (
        <div>
            {comments && comments.length && (
                   <List container spacing={2}> {comments.map((comment) =>
                    (
                        <ListItem key={comment.id}>
                           <Paper style={{ padding: '10px', marginBottom: '10px' }}>
                               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                   <Typography variant="caption" style={{ marginLeft: '8px' }} component="p" dangerouslySetInnerHTML={{ __html: comment.text }}></Typography>
                               </div>
                                   <Typography variant="caption" component="p">By: {comment.by}</Typography>
                                   <Typography variant="caption" component="p" color="textSecondary">Date: {formattedDateTime(comment.time)}</Typography>
                            </Paper>
                        </ListItem>

                    ))}
                    </List>
            )}
        </div>
    );
};

export default NewsStoryComments

