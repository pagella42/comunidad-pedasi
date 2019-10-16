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
            <h2>It Works!</h2>
            <Categories />
        </div>)
    }
}
export default Explore;