import React, { Component } from 'react';
class MyResult extends Component {
    render() {
        let post = this.props.post
        return (<div>
            <div>{post.title}</div>
            <div>Points: {post.points}</div>
            <div>{post.content}</div>
            <div>{post.address}</div>
            <div>{post.category}</div>
            <div><img src={post.picture} alt="concern picture" /></div>

            {/* render responses */}
            {post.responses.length === 0
                ? <div>No response.</div>
                : post.responses.map(r => <div> Response: {r.content} Employee: {r.employee} </div>)}


            {/* render comments \/ */}
            {post.comments.length !== 0 ?
                <div>
                    {post.comments.map(c => {
                        return <div>
                            <div>{c.content}</div>
                        </div>
                    })}
                </div>
                : <div>No Comments.</div>
            }
            {post.date}
            {post.status}
        </div>)
    }
}
export default MyResult;