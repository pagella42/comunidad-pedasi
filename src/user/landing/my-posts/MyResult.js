import React, { Component } from 'react';



import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faThumbsUpRegular} from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUpSolid} from '@fortawesome/free-solid-svg-icons'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


library.add(
    faThumbsUpRegular,
    faThumbsUpSolid 
)

class MyResult extends Component {
    render() {
        let post = this.props.post
        return (<div>
             <ExpansionPanel>
                <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                    <Typography > {post.title} <span className='viewlike'>{post.points}<FontAwesomeIcon icon={['fas', 'thumbs-up']} /></span> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <div>{post.content}</div>
            <div>{post.address}</div>
            <div>{post.category}</div>
            <div><img src={post.picture} alt="concern picture" /></div>

            {/* render responses */}
            {post.responses.length === 0
                ? <div>No response.</div>
                : post.responses.map(r => <div> Response: {r.content} Employee: {r.employee} </div>)}


            {/* render comments \/ */}
            {post.comments.length !== 0 ?
                <div>
                    {post.comments.map(c => {
                        return <div>
                            <div>{c.content}</div>
                        </div>
                    })}
                </div>
                : <div>No Comments.</div>
            }
            {post.date}
            {post.status}
                </ExpansionPanelDetails>
            </ExpansionPanel>
          
        </div>)
    }
}
export default MyResult;