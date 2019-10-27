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
        const post = await axios.get(`http://localhost:4000/data/posts/id/${pID}`)
        const responses = await axios.get(`http://localhost:4000/data/responses/${pID}`)
        const comments = await axios.get(`http://localhost:4000/data/comments/${pID}`)
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
                                    <div id="title_problem"><h3 >{p.title}</h3></div>
                                    <hr></hr>
                                </div>
                                <div>
                                    <Typography color="textSecondary" gutterBottom> Complaint  </Typography>
                                    <div id="description">{p.content}</div>

                                </div>
                            </div>
                            <div id="imgcont">
                                {p.picture ? <img id="img"  src={p.picture} alt="Evidence"></img>: <img src="https://via.placeholder.com/300"/>}

                            </div> 
                        </div>
                        <hr></hr>

                        <div id="comments">{c.map(c => <div key={c._id}>{c.content} - {c.user} - {c.date}</div>)}</div>
                        <div id="category">{p.category}</div>
                        <div id="address">{p.address}</div>
                        <div id="container_response">
                            {r.map(c => <div key={c._id}>{c.content} - {c.employee} - {c.date}</div>)}
                            < Responses idPost={this.state.post._id} getData={this.getData} />
                        </div>
                        <div id="status_post">{p.status}</div>

                    </CardContent>
                </Card>
            </div></div>
        )
    }
}

export default withTranslation('translation')(ResultDetail)
