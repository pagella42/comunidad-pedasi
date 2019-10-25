import React, { Component } from 'react';
import { withTranslation } from 'react-i18next'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class VerifyPost extends Component {

    reviewPost = (event) => {
        let name = event.currentTarget.name
        this.props.reviewPost(name)
    }

    render() {
        const { t, i18n } = this.props
        return (

            <div>
                <Button size="small" color="primary" name="confirm" onClick={this.reviewPost}>{t("Confirm")}</Button>
                    
                <Button size="small" color="primary" name="review" onClick={this.reviewPost}>{t("Go back to post")}</Button>
            </div>

            

           
        );
    }
}

export default withTranslation('translation')(VerifyPost);