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
import Typography from '@material-ui/core/Typography';
import Consts from '../../../Consts'
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

                    <Card className='resuldetails' style={{ maxWidth: 1000 }}>
                        <CardContent>
                            <div id="usercont">
                                <div>
                                    <Typography color="textSecondary" gutterBottom> User information  </Typography>
                                    {p.user ?
                                        <div id="user_info">
                                            <div><span className="userinfotitle">Name:  </span> {p.user.name}</div>
                                            <div><span className="userinfotitle"> National ID:</span>  {p.user.ID}</div>
                                            <div><span className="userinfotitle">Phone number:</span>   {p.user.phone}</div>
                                            <div><span className="userinfotitle">Adrress:  </span>{p.user.address}</div>
                                            <div><span className="userinfotitle">Email: </span>{p.user.email}</div>
                                        </div>
                                        : null}
                                </div>
                                <div>
                                    <Typography color="textSecondary" gutterBottom> Suspend user  </Typography>
                                    {p.user ? < Banner userPhone={p.user.phone} /> : null}

                                </div>


                            </div><hr></hr>
                            <div id="complaintcont">
                                <div>
                                    <div>
                                        <Typography color="textSecondary" gutterBottom> Complaint title  </Typography>
                                        <div> <span id="title_problem" style={{ fontSize: "1.5em", fontWeight: "bold" }}>{p.title}</span> <span style={{ color: "gray" }}>({p.date ? p.date.slice(0, 10) : null})</span></div>
                                        <hr></hr>
                                    </div>
                                    <div>
                                        <Typography color="textSecondary" gutterBottom> Complaint category</Typography>
                                        <div id="category" style={{ fontWeight: "bold" }}>{p.category ? p.category[0].toUpperCase() + p.category.slice(1) : null}</div>
                                        <hr></hr>
                                    </div>
                                    <div>
                                        <Typography color="textSecondary" gutterBottom> Votes received </Typography>
                                        Likes: {p.points}
                                        <hr></hr>
                                    </div>
                                    <div>
                                        <Typography color="textSecondary" gutterBottom> Complaint Location</Typography>
                                        <div id="address">{p.address}</div>
                                        <hr></hr>

                                    </div>
                                    <div>
                                        <Typography color="textSecondary" gutterBottom> Complaint  </Typography>
                                        <div id="description">{p.content}</div>

                                    </div>

                                </div>
                                <div id="imgcont">
                                    {p.picture ? <img id="img" src={p.picture} alt="Evidence"></img> : <img src="https://via.placeholder.com/300" />}

                                </div>

                            </div><hr></hr>

                            <div>
                                <Typography color="textSecondary" gutterBottom> Complaint comments </Typography>

                                <div id="comments">{c.map(c => <div key={c._id}> <span style={{ fontWeight: "bold" }}>{c.user}:</span> {c.content}  <span style={{ color: "gray" }}>({c.date.slice(0, 10)})</span></div>)}</div>
                                <hr id="bighr"></hr>
                            </div>



                            <div id="responsecontainer">
                                <Typography style={{fontSize: "1.2em"}} color="textSecondary" gutterBottom> Case administration </Typography><br></br>
                                <Typography  color="textSecondary" gutterBottom> Send a response </Typography>

                                < Responses idPost={this.state.post._id} getData={this.getData} /><br></br>
                                <Typography color="textSecondary" gutterBottom> Actual complaint status </Typography>

                                <div id="status_post">Status: {p.status}</div><br></br>
                                <div id="container_response">
                                    <Typography color="textSecondary" gutterBottom> Responses </Typography>
                                    {r[0] ?
                                        <div>
                                         
        {r.map(c => <div key={c._id}><span style={{ fontWeight: "bold" }}>{c.employee}:</span> {c.content} <span style={{ color: "grey" }}>({c.date.slice(0, 10)})</span> </div>)} </div> :
                                        " No responses yet"
                                    }
                                </div>


                            </div>


                        </CardContent>
                    </Card>
                </div></div>
        )
    }
}

export default withTranslation('translation')(ResultDetail)
