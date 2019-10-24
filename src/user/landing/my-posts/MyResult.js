import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class MyResult extends Component {
    render() {
        const {t,i18n}= this.props
        let post = this.props.post
        return (<div>
            <div>{post.title}</div>
            <div>{t("Points")}: {post.points}</div>
            <div>{post.content}</div>
            <div>{post.address}</div>
            <div>{post.category}</div>
            <div><img src={post.picture} alt="concern picture" /></div>

            {/* render responses */}
            {post.responses.length === 0
                ? <div>{t("No response")}.</div>
                : post.responses.map(r => <div> {t("Response")}: {r.content} {t("Employee")}: {r.employee} </div>)}


            {/* render comments \/ */}
            {post.comments.length !== 0 ?
                <div>
                    {post.comments.map(c => {
                        return <div>
                            <div>{c.content}</div>
                        </div>
                    })}
                </div>
                : <div>{t("No Comments")}.</div>
            }
            {post.date}
            {post.status}
        </div>)
    }
}
export default withTranslation('translation') (MyResult);