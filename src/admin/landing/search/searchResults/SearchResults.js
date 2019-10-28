import React, { Component } from 'react';
import Result from '../../../results/Result';
import { withTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class SearchResults extends Component {
    render() {
        const { t, i18n } = this.props
        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography >{t("Results")}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            {this.props.foundPosts.length > 0 ?
                                this.props.foundPosts.map(post => <Result post={post} />) :

                                        <ExpansionPanel>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                                                <Typography >{t("No results")}</Typography>
                                            </ExpansionPanelSummary></ExpansionPanel>
                                
                            } </div>


                    </ExpansionPanelDetails>
                </ExpansionPanel>


            </div>
        );
    }
}

export default withTranslation('translation')(SearchResults);