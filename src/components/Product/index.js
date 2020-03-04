// @flow

import React, { Component } from "react";

// importing the style from the external css file
import "./product.css";

// declaring the type of states used
type Props = {
  product: Object,
  removeCompareProduct: string => void,
  addCompareProduct: string => void
};
type State = {
  compareSelected: boolean
};

class Product extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      // assign the list of all the items to false
      compareSelected: false
    };
    //  binding all the necessary functions to perform state operations
    (this: any).handleClick = this.handleClick.bind(this);
  }

  // handle the onClick of the item and call the function either to add/remove
  handleClick() {
    const compareSelected = !this.state.compareSelected;
    // updating the item comparison state
    this.setState(prevState => ({
      compareSelected
    }));
    // add it the list if not in the comparison list
    if (compareSelected) {
      this.props.addCompareProduct(this.props.product.id);
    } else {
      // remove it from the list if it exists in the comparison list
      this.props.removeCompareProduct(this.props.product.id);
    }
  }

  render() {
    return (
      <div className="product-card">
        {
          // add/remove button over the whole product card
        }
        <div className="product-card-button-section">
          <button className="product-card-button" onClick={this.handleClick}>
            {this.state.compareSelected ? "REMOVE" : "COMPARE"}
          </button>
        </div>
        {
          // image in the product card
        }
        <img
          className="product-image"
          src={this.props.product.image}
          alt={this.props.product.name}
        />
        {
          // content in the product card
        }
        <div className="product-content">
          <div className="product-title-section">
            <div>{this.props.product.name}</div>
            <div className="product-title-price ">
              {this.props.product.price}
            </div>
          </div>
          {
            // description in the product card
          }
          <div className="product-description">
            {this.props.product.description}
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
