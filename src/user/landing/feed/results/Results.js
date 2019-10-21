import React, { Component } from 'react';
import Result from './Result'
class Results extends Component {



    render() {
        return (<div>
            {
                this.props.posts.map(d => {
                    if(!d.private || this.props.phone === d.user.phone){
                        console.log(this.props.posts.map(p => p.title && p.points))
                      return  <Result phone={this.props.phone} post={d} /> 
                    } 
                    
                }
                )
            }
        </div>)
    }
}
export default Results;