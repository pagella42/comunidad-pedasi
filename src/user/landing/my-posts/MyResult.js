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
import { faUser } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import TextField from '@material-ui/core/TextField';


library.add(
    faThumbsUpRegular,
    faThumbsUpSolid 
)

class MyResult extends Component {

    render() {
        
        const {t,i18n}= this.props
        
        let post = this.props.post
        return (
            <div className="resultcontainer">
            <ExpansionPanel>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                    <div> <span className="postcategory">Category: {post.category} </span> • <span className="postdate">Posted on: {moment(post.date).fromNow()}</span></div>
                    <Typography > {post.title ? post.title[0].toUpperCase() + post.title.slice(1) : null}  </Typography>
                    <span className='postlike'> {post.comments.length} Comments • {this.props.post.points} Likes</span>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>

                    <Typography gutterBottom >

                        <span style={{ fontSize: "1.2em" }}> {post.title ? post.title[0].toUpperCase() + post.title.slice(1) : null}</span>

                        

                    </Typography>

                    <hr style={{ width: "100%" }}></hr>

                    <div className="bigcont">
                        <div>
                            <Typography color="textSecondary" gutterBottom> Location: <span>{post.address}</span> </Typography>


                            <div className="contcont"><div>{post.content[0].toUpperCase() + post.content.slice(1)}</div></div>

                        </div>
                        <div>
                            {post.picture ? <img className="img" src={post.picture} alt="concern picture"></img> : null}
                        </div>
                    </div>
                    <br></br>



                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                            <div style={{ fontWeight: "bold" }}> {t("Comments")}</div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {post.comments ?
                                <div>
                                    {post.comments.map(c => {
                                        return <div>
                                            <span style={{ fontWeight: "bold" }}> {c.user ? c.user.name : null} :</span>
                                            <span>{c.content} </span>
                                            <span style={{ color: "gray" }}>  • ({c.date ? moment(c.date).fromNow() : null})</span>
                                        </div>
                                    })}
                                </div>
                                : <div>No Comments</div>
                            }
                       
                          

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <br></br>
                    <ExpansionPanel>

                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                            <div style={{ fontWeight: "bold" }}>{t("Municipality Response")}</div>
                            <Typography color="textSecondary" gutterBottom> <span>Status: {post.status}</span></Typography>


                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {post.responses.length === 0
                                ? <div>No response.</div>
                                : post.responses.map(r => <div> <span style={{ fontWeight: "bold" }}> {r.employee}: </span> {r.content}  <span style={{ color: "gray" }}>  • ({r.date.slice(0, 10)})</span> </div>)}

                        </ExpansionPanelDetails>
                    </ExpansionPanel>


                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>)
    }
}
export default withTranslation('translation') (MyResult);