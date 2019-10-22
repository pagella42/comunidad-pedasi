import React, { Component } from 'react';
import NewUserSearch from './NewUserSearch';

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
        let currentlySearching = {...this.state.currentlySearching}
        currentlySearching[where] = false
        await this.setState({searchResults: searchResults, currentlySearching: currentlySearching})
        this.checkIfSearchingDone()
    }

    search = () => {
        let currentlySearching = {...this.state.currentlySearching}
        currentlySearching.user = true
        currentlySearching.keywords = true
    }

    render() {
        return (
            <div>
                <NewUserSearch />
                {this.state.finalResult.length > 0 ? 
                // call results else say that there are no results    
            }
                <button onClick={this.search}>Search</button>
            </div>
        );
    }
}

export default NewFilter;