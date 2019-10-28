import React, { Component } from 'react';
import Result from './Result';
import axios from 'axios'
import Consts from '../../Consts'
const CREATE_ROUTE = Consts.CREATE_ROUTE
class Results extends Component {
    constructor(){
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount = async () =>{
        let filter={category:this.props.category}
        let data = await axios.post(CREATE_ROUTE(`data/posts`),filter)
        data = data.data
        this.setState({data})
        
    }
    render() {
        return this.state.data.length<1?
        null: (<div>{this.state.data.map(c =>  <div key={c._id}><Result post = {c} /></div>)}</div>)
    }
}
export default Results;