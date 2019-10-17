import React, { Component } from 'react'
import axios from 'axios'

class ResultDetail extends Component {

    constructor() {
        super()
        this.state = {
            post: []
        }
    }

    getData = async () => {
        const response = await axios.get(`http://localhost:4000/data/posts/id/${this.props.match.params.id}`)
        this.setState({ post: response })
    }
    componentDidMount = () => {
        this.getData()
    }

    render() {
        const matchID = this.props.match.params.id
        console.log(this.state.post)
        console.log(this.state.post.data)
        // console.log(this.state.post.data.title)

        return (
            <div >{matchID}
            </div>
        )
    }
}
export default ResultDetail