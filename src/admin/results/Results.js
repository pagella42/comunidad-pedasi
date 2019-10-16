import React, { Component } from 'react';
import Result from './Result';
import axios from 'axios'
class Results extends Component {
    constructor(){
        super()
        this.state = {
            data: []
        }
    }
    async componentDidMount() {
        let data = await axios.get(
            `http://localhost:4000/data/posts/${this.props.category}`
        )
        
        this.setState({data : data})
    }
    render() {
        return (<div>
            {this.state.data.map(c => {
                return <Result post = {c} />
            })}
        </div>)
    }
}
export default Results;