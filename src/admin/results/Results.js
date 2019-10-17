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
    componentDidMount = async () =>{
        let data = await axios.get(`http://localhost:4000/data/posts/category/${this.props.category}`
        )
        data = data.data
        
        this.setState({data})
        
    }
    render() {
        return (<div>  
            {this.state.data.map(c =>  <div key={c._id}><Result post = {c} /></div>
            )}
        </div>)
    }
}
export default Results;