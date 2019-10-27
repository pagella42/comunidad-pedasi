import React, { Component } from 'react';
import './myresult.css'


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faThumbsUpRegular} from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUpSolid} from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withTranslation } from 'react-i18next';
import Button from "@material-ui/core/Button";

library.add(
    faThumbsUpRegular,
    faThumbsUpSolid 
)

class MyResult extends Component {

    render() {
        
        const {t,i18n}= this.props
        let post = this.props.post
        console.log(post.comments)
        return (<div id="myresultcontainer">
             <ExpansionPanel>
             <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                    <div> <span class="postcategory">Category: {post.category} </span> • <span class="postdate">Posted on: {post.date.slice(0, 10)}</span></div>
                    <Typography > {post.title}  </Typography>
                    <span className='postlike'> {post.comments.length} Comments • {post.point} Likes </span>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                <div>{post.content}</div>
            <div>{post.address}</div>
            <div>{post.category}</div>
            <div><img src={post.picture} alt="concern picture" /></div>
            <Button name={post._id} onClick={this.props.deletePost}>Delete</Button>

            {/* render responses */}
            {post.responses.length === 0
                ? <div>{t("No response")}.</div>
                : post.responses.map(r => <div> {t("Response")}: {r.content} {t("Employee")}: {r.employee} </div>)}


            {/* render comments \/ */}
            {post.comments.length !== 0 ?
                <div>
                    {post.comments.map(c => {
                        return <div>
                            <div>{c.user.name}: {c.content}</div>
                        </div>
                    })}
                </div>
                : <div>{t("No Comments")}.</div>
            }
            {post.date}
            {post.status}
                </ExpansionPanelDetails>
            </ExpansionPanel>
          
        </div>)
    }
}
export default withTranslation('translation') (MyResult);