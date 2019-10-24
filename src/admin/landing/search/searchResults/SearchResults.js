import React, { Component } from 'react';
import Result from '../../../results/Result';
import { withTranslation } from 'react-i18next';

class SearchResults extends Component {
    render() {
        const {t,i18n} = this.props
        return (
            <div>
                {this.props.foundPosts.length > 0 ? 
                this.props.foundPosts.map(post => <Result post={post}/>) 
                : <div>{t("No results")}.</div>
            }
            </div>
        );
    }
}

export default withTranslation('translation') (SearchResults);