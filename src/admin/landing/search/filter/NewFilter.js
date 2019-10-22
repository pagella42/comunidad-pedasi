import React, { Component } from 'react';
import NewUserSearch from './NewUserSearch';
import NewKeywordSearch from './NewKeywordSearch';

class NewFilter extends Component {
    constructor(){
        super()
        this.state = {
            currentlySearching : {
                // filter: false,
                user: false, 
                keywords: false,
            }, 
            searchResults: {
                // filter: [],
                user: [],
                keywords: []
            },
            finalResult : []
        }
    }

    createFinalResult = () => {
        // this checks if results are in user and keywords
        let finalResult = [...this.state.finalResult]
        this.state.searchResults.user.forEach(post => {
            if(this.state.searchResults.keywords.includes(post)){
                finalResult.push(post)
            }
        })
        this.setState({finalResult: finalResult})
        // finalResult = this.state.searchResults.user
        this.props.saveFinalResult(finalResult)
    }

    checkIfSearchingDone = () => {
        let currentlySearching = {...this.state.currentlySearching}
        if(currentlySearching.user === false && currentlySearching.keywords === false){
            this.createFinalResult()
        }
    }

    saveResults = async (data, where)=>{
        let searchResults = {...this.state.searchResults}
        searchResults[where] = data
        // let currentlySearching = {...this.state.currentlySearching}
        // currentlySearching[where] = false // this has to happen somewhere else - set state after
        await this.setState({searchResults: searchResults})
        this.checkIfSearchingDone()
    }

    search = () => {
        let currentlySearching = {...this.state.currentlySearching}
        currentlySearching.user = true
        currentlySearching.keywords = true
        this.setState({currentlySearching: currentlySearching})
    }
 
    render() {
        return (
            <div>
                <NewUserSearch saveResults={this.saveResults}/>
                <NewKeywordSearch saveResults={this.saveResults} />
                <button onClick={this.search}>Search</button>
            </div>
        );
    }
}

export default NewFilter;