import React, { Component } from 'react'
import axios from 'axios'
import './ResultDetails.css'
import Responses from '../responses/Responses';
import Banner from '../banner/Banner';
import Landing from '../../admin/landing/Landing';
import { withTranslation } from 'react-i18next';
import Header from '../Header'


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Consts from '../../Consts'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CREATE_ROUTE = Consts.CREATE_ROUTE

class ResultDetail extends Component {

    constructor() {
        super()
        this.state = {
            post: [],
            comments: [],
            responses: [],
        }
    }

    update = event => this.setState({ [event.target.name]: event.target.value })

    getData = async () => {
        const pID = this.props.match.params.id
        const post = await axios.get(CREATE_ROUTE(`data/posts/id/${pID}`))
        const responses = await axios.get(CREATE_ROUTE(`data/responses/${pID}`))
        const comments = await axios.get(CREATE_ROUTE(`data/comments/${pID}`))
        this.setState({ post: post.data, responses: responses.data, comments: comments.data })
    }

    componentDidMount = () => this.getData()

    render() {
        const p = this.state.post
        const r = this.state.responses
        const c = this.state.comments
        const { t, i18n } = this.props
        return (
            <div >
                <Header />
                <div id="resultsdetailcont">
                    <div id="resultsinner">
                        <Card className='resuldetails' style={{ width: "100%" }}>
                            <CardContent>
                                <div id="usercont">
                                    <div>
                                        <Typography color="textSecondary" gutterBottom> {t("User information")}  </Typography>
                                        {p.user ?
                                            <div id="user_info">
                                                <div><span className="userinfotitle">{t("Name")}:  </span> {p.user.name}</div>
                                                <div><span className="userinfotitle"> {t("National ID")}:</span>  {p.user.ID}</div>
                                                <div><span className="userinfotitle">{t("Phone number")}:</span>   {p.user.phone}</div>
                                                <div><span className="userinfotitle">{t("Adrress")}:  </span>{p.user.address}</div>
                                                <div><span className="userinfotitle">{t("Email")}: </span>{p.user.email}</div>
                                            </div>
                                            : null}
                                    </div>
                                    <div>
                                        <Typography color="textSecondary" gutterBottom> {t("Suspend user")}  </Typography>
                                        {p.user ? < Banner userPhone={p.user.phone} /> : null}

                                    </div>


                                </div><hr></hr>
                                <div id="complaintcont">
                                    <div>
                                        <div>
                                            <Typography color="textSecondary" gutterBottom> {("Post title")}  </Typography>
                                            <div> <span id="title_problem" style={{ fontSize: "1.5em", fontWeight: "bold" }}>{p.title}</span> <span style={{ color: "gray" }}>({p.date ? p.date.slice(0, 10) : null})</span></div>
                                            <hr></hr>
                                        </div>
                                        <div>
                                            <Typography color="textSecondary" gutterBottom> {t("Post category")}</Typography>
                                            <div id="category" style={{ fontWeight: "bold" }}>{p.category ? t(p.category[0].toUpperCase() + p.category.slice(1)) : null}</div>
                                            <hr></hr>
                                        </div>
                                        <div>
                                            <Typography color="textSecondary" gutterBottom> {t("Votes received")} </Typography>
                                            {t("Likes")}: {p.points}
                                            <hr></hr>
                                        </div>
                                        <div>
                                            <Typography color="textSecondary" gutterBottom> {t("Post Location")}</Typography>
                                            <div id="address">{p.address}</div>
                                            <hr></hr>

                                        </div>
                                        <div>
                                            <Typography color="textSecondary" gutterBottom> {t("Post")}  </Typography>
                                            <div id="description">{p.content}</div>

                                        </div>

                                    </div>
                                    <div id="imgcont">
                                        {p.picture ? <img id="img" src={p.picture} alt="Evidence"></img> : <img src="https://via.placeholder.com/300" />}

                                    </div>

                                </div><hr></hr>

                                <div>
                                    <ExpansionPanel>

                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                                            {t("Post comments")}
                                        </ExpansionPanelSummary>

                                        <ExpansionPanelDetails>

                                    <div id="comments">{c.map(c => <div key={c._id}> <span style={{ fontWeight: "bold" }}>{c.user}:</span> {c.content}  <span style={{ color: "gray" }}>({c.date.slice(0, 10)})</span></div>)}</div>

                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>


                                </div>
                            </CardContent>
                        </Card>
                        <Card className='responsecard' style={{ width: "100%" }}>
                            <CardContent>

                                <div id="responsecontainer">
                                    <Typography style={{ fontSize: "1.2em" }} color="textSecondary" gutterBottom> {t("Case administration")} </Typography><br></br>
                                    <Typography color="textSecondary" gutterBottom> {t("Send a response")} </Typography>

                                    < Responses idPost={this.state.post._id} getData={this.getData} /><br></br>
                                    <Typography color="textSecondary" gutterBottom> {t("Actual complaint status")} </Typography>

                                    <div id="status_post">{t("Status")}: {p.status}</div><br></br>
                                    <div id="container_response">
                                        <Typography color="textSecondary" gutterBottom> {t("Responses")} </Typography>
                                        {r[0] ?
                                            <div>

                                                {r.map(c => <div key={c._id}><span style={{ fontWeight: "bold" }}>{c.employee}:</span> {c.content} <span style={{ color: "grey" }}>({c.date.slice(0, 10)})</span> </div>)} </div> :
                                            t("No responses yet")
                                        }
                                    </div>


                                </div>


                            </CardContent>
                        </Card>
                    </div></div></div>
        )
    }
}

export default withTranslation('translation')(ResultDetail)
