import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { withTranslation } from 'react-i18next';

class Success extends Component {
    constructor(){
        super()
        this.state={
            redirect:false
        }
    }
    renderRedirect=() => {
        if(this.state.redirect){return <Redirect to='/user/home' />}
        else{setTimeout(()=>{this.setState({redirect:true})},3000)}
    }

    render() {
        const {t,i18n} = this.props
        return (
            <div>
                {this.renderRedirect()}
                <h1>{t("Signed Up Successfuly")}</h1>
                <h6>{t("Redirecting to Home page")}...</h6>
            </div>
        );
    }
}

export default withTranslation('translation') (Success);