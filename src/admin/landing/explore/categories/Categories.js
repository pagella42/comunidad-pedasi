import React, { Component } from "react";
import Category from "./Category";
import axios from 'axios'
import { withTranslation } from 'react-i18next';

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
    
    
    
    
}
  render() {
    const {t,i18n} = this.props
    return (
      <div>
        {this.state.categories.map(c => {
                return (
                    <div>
                        <div>{t(c)}</div>
                        <Category category={c} />
                    </div>
                    
                )
            })}

      </div>
    );
  }
}
export default withTranslation('translation') (Categories);
