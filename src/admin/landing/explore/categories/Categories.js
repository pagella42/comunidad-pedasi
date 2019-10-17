import React, { Component } from "react";
import Category from "./Category";
import axios from 'axios'
class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount = async () =>{
    let data = await axios.get(`http://localhost:4000/data/categories/`
    )
    let allCategories= data.data
    let categories = this.state.categories

    allCategories.map(c => c.name).forEach( category => {
      categories.push(category)
      this.setState({categories})   
    });
    
    
    
    console.log(this.state.categories)
    
}
  render() {
    return (
      <div>
        <div></div>
        {this.state.categories.map(c => {
                return (
                    <div>
                        <div>{c}</div>
                        <Category category={c} />
                    </div>
                    
                )
            })}

      </div>
    );
  }
}
export default Categories;
