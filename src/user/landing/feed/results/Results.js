import React, { Component } from 'react';
import Result from './Result'
class Results extends Component {



    render() {
        return (<div>
            {
                this.props.posts.map(d => {
                    if(!d.private  || this.props.phone === d.user.phone){
                        
                        
                      return  <Result getPosts={this.props.getPosts} phone={this.props.phone} post={d} /> 
                    } 
                    
                }
                )
            }
        </div>)
    }
}
export default Results;