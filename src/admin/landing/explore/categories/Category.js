import React, { Component } from 'react';
import Results from '../../../results/Results';
class Category extends Component {
    render() {
        return (
        <div>
            
            <Results category={this.props.category} />
        </div>)
    }
}
export default Category;