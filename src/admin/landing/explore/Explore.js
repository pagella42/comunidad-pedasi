import React, { Component } from 'react';
import Categories from './categories/Categories';
class Explore extends Component {
    constructor() {
        super()
        this.state = {
            name: "name"
        }
    }
    render() {
        return (
        <div>
            
            <Categories />
        </div>)
    }
}
export default Explore;