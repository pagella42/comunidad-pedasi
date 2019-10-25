import React, { Component } from 'react';
import { withTranslation } from 'react-i18next'
import './verifypost.css'
class VerifyPost extends Component {

    reviewPost = (event) => {
        let name = event.currentTarget.name
        this.props.reviewPost(name)
    }

    render() {
        const {t,i18n}=this.props
        return (
            <div>
                <div>{t("Are you sure to post this post")} ? </div>
                <div>
                    <div>{t("Title")}: {this.props.post.title}</div>
                    <div>{t("Content")}: {this.props.post.content}</div>
                    <div>{t("Address")}: {this.props.post.address}</div>
                    <div>{t("Category")}: {this.props.post.category}</div>
                </div>
                <button name="confirm" onClick={this.reviewPost}>{t("Confirm")}</button>
                <button name="review" onClick={this.reviewPost}>{t("Go back to post")}</button>
            </div>
        );
    }
}

export default withTranslation('translation') (VerifyPost);