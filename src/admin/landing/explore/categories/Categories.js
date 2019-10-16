import React, { Component } from "react";
import Category from "./Category";
class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [
        "Violence",
        "Public Disturbance",
        "Tresspassing",
        "Public Space",
        "Utilities",
        "General",
        "Noise",
        "Disorderly Conduct"
      ]
    };
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
