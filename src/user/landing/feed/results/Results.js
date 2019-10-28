import React, { Component } from 'react';
import Result from './Result'
class Results extends Component {



    render() {
        return (<div>
            {
                this.props.posts.map(d => {
                    if (!d.private || this.props.phone === d.user.phone) {
                        return <Result updateOnecomment={this.props.updateOnecomment}
                            updateOnelike={this.props.updateOnelike}
                            loginPopup={this.props.loginPopup}
                            getPosts={this.props.getPosts}
                            phone={this.props.phone} post={d} 
                            user={this.props.user}
                            getUser={this.props.getUser}  />
                    }
                }
                )
            }
        </div>)
    }
}
export default Results;