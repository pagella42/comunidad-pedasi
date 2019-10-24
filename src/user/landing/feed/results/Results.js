import React, { Component } from 'react';
import Result from './Result'
class Results extends Component {



    render() {
        return (<div>
            {
                this.props.posts.map(d => {
                    if(!d.private  || this.props.phone === d.user.phone){
                        
                        
                      return  <Result loginPopup={this.props.loginPopup} phone={this.props.phone} post={d} /> 
                    } 
                    
                }
                )
            }
        </div>)
    }
}
export default Results;