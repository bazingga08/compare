// @flow

import React, { Component } from "react";

// importing the necessary sub-components for the comparison
import Product from "../Product";
import Checkbox from "../Checkbox";

// importing the style from the external css file
import "./home.css";

// importing the necessary images for the list all images (Cherry, orange, nuts, strawberry) and clear image
import cherryImage from "../../images/cherry.png";
import orangeImage from "../../images/orange.png";
import nutsImage from "../../images/nuts.png";
import strawberryImage from "../../images/strawberry.png";
import clearImage from "../../images/close.png";

// declaring the type of states used
type Props = {};
type State = {
  completeList: Array<Object>,
  compareList: Array<Object>,
  showEditAttributes: boolean,
  search: string,
  price: boolean,
  colors: boolean,
  condition: boolean,
  vendors: boolean,
  selectall: boolean,
  prevAttrState: Object
};

class Home extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      // Creating the list of all the items and assigned images into it
      // replaced the static colors (red, green, blue) with (#E86176, #80FFA5, #61B8E8) for the better interactions
      //  rest of the list is not edited
      completeList: [
        {
          id: "1",
          name: "Cherry",
          image: cherryImage,
          price: "$1.99",
          colors: ["#E86176", "#80FFA5", "#61B8E8"],
          condition: "Fresh",
          description: "Two Cherries",
          vendors: ["Fresh Fruits Market", "Fruit Ninja"]
        },
        {
          id: "2",
          name: "Orange",
          image: orangeImage,
          price: "$2.99",
          colors: ["#80FFA5", "#61B8E8"],
          condition: "Frozen",
          description: "Giant Orange",
          vendors: ["Families Market"]
        },
        {
          id: "3",
          name: "Nuts",
          image: nutsImage,
          price: "$1.00",
          colors: ["#E86176"],
          condition: "Frozen",
          description: "Mixed Nuts",
          vendors: ["Amazon Distributor"]
        },
        {
          id: "4",
          name: "Strawberry",
          image: strawberryImage,
          price: "$1.49",
          colors: ["#61B8E8"],
          condition: "Fresh",
          description: "Just Strawberry",
          vendors: ["Big Basket"]
        }
      ],

      // list to add the items which needed to be compared
      compareList: [],

      // flag used to either show/hide the attributes modal control
      showEditAttributes: false,

      // search field to filter attributes inside the modal
      search: "",

      // all the attributes used to toggle the selected item
      price: true,
      colors: true,
      condition: true,
      vendors: true,
      selectall: true,

      // to save the previous selected attribute states on click of cancel in the attribute modal
      prevAttrState: {}
    };

    //  binding all the necessary functions to perform state operations
    (this: any).addCompareProduct = this.addCompareProduct.bind(this);
    (this: any).removeCompareProduct = this.removeCompareProduct.bind(this);
    (this: any).openEditAttributes = this.openEditAttributes.bind(this);
    (this: any).cancelEditAttributes = this.cancelEditAttributes.bind(this);
    (this: any).submitEditAttributes = this.submitEditAttributes.bind(this);
    (this: any).handleChange = this.handleChange.bind(this);
    (this: any).handleCheckboxChange = this.handleCheckboxChange.bind(this);
    (this: any).clearSearch = this.clearSearch.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    //  to deselect the selectall category if any of the other fields are deselected
    if (
      this.state.price &&
      this.state.colors &&
      this.state.condition &&
      this.state.vendors &&
      this.state.selectall === false
    ) {
      this.setState(prevState => ({
        selectall: true
      }));
    }

    // to select all the rest of the attribute if select all is selected
    if (this.state.selectall === true && prevState.selectall === false) {
      this.setState(prevState => ({
        price: true,
        colors: true,
        condition: true,
        vendors: true
      }));
    }
  }

  // to add a item to the compare list
  addCompareProduct(productId) {
    const tempCompareList = [...this.state.compareList];
    // finding the selected item from the list
    const found = this.state.completeList.find(
      product => product.id === productId
    );
    // check if the item exist and if exists add it to the comparison list
    if (found) {
      tempCompareList.push(found);
      this.setState(prevState => ({
        compareList: tempCompareList
      }));
    }
  }

  // to remove a item from the compare list
  removeCompareProduct(productId) {
    const tempCompareList = [...this.state.compareList];
    // finding the selected item exist in  the comparison list
    const foundIndex = this.state.compareList.findIndex(
      product => product.id === productId
    );
    // check if the item exist and if exists remove it from the comparison list
    if (foundIndex >= 0) {
      tempCompareList.splice(foundIndex, 1);
      this.setState(prevState => ({
        compareList: tempCompareList
      }));
    }
  }

  // show the add/edit attributes modal
  openEditAttributes() {
    const showEditAttributes = !this.state.showEditAttributes;
    // changing the flag to open the attribute modal and clearing if any search field exists
    this.setState(prevState => ({
      showEditAttributes,
      search: ""
    }));
    // saving the current attribute states if needed on click of cancel
    if (showEditAttributes) {
      const prevAttrState = {
        price: this.state.price,
        colors: this.state.colors,
        condition: this.state.condition,
        vendors: this.state.vendors,
        selectall: this.state.selectall
      };
      this.setState(prevState => ({
        prevAttrState
      }));
    }
  }

  // canceling the attribute states and reverting to the previous opened states
  cancelEditAttributes() {
    // assigning the previous set attribute states and closing the modal
    const prevAttrState = this.state.prevAttrState;
    this.setState(prevState => ({
      showEditAttributes: false,
      price: prevAttrState.price,
      colors: prevAttrState.colors,
      condition: prevAttrState.condition,
      vendors: prevAttrState.vendors,
      selectall: prevAttrState.selectall
    }));
  }

  // submiting the attribute states
  submitEditAttributes() {
    //  closing the attributes modal
    this.setState(prevState => ({
      showEditAttributes: false
    }));
  }

  // updating the search value on change of input field
  handleChange(e) {
    const { value } = e.target;
    // assigning the value to the search state
    this.setState(prevState => ({
      search: value
    }));
  }

  // handeling the checkbox change of all the attributes
  handleCheckboxChange(name, value) {
    // assigning the values for the respective checkbox onChange of value
    this.setState(prevState => ({
      [name]: value
    }));
    //  deselect the selectall category if any of the other fields are deselected
    if (name !== "selectall" && value === false) {
      this.setState(prevState => ({
        selectall: false
      }));
    }
  }

  // clearing the search field input text
  clearSearch() {
    this.setState(prevState => ({
      search: ""
    }));
  }

  // rendering the checkbox section in the modal
  renderCheckbox() {
    // created a list of all the attributes
    const attribList = [
      { name: "selectall", label: "Select All" },
      { name: "price", label: "Price" },
      { name: "colors", label: "Colors" },
      { name: "condition", label: "Condition" },
      { name: "vendors", label: "Vendors" }
    ];
    // show only the attributes which are searched for the particular search term
    if (this.state.search && this.state.search.length) {
      const foundListLength = attribList.filter(item =>
        this.state.search
          ? item.name.toLowerCase().indexOf(this.state.search) > -1
          : ""
      ).length;
      // to show the no results found if search is inappropirate and button of clear search
      if (foundListLength === 0) {
        return (
          <div className="attribute-modal-no-results">
            No Results found
            <div
              className="attribute-modal-clear-search"
              onClick={this.clearSearch}
            >
              Clear Search
            </div>
          </div>
        );
      }
      // showing the attributes which are searched for the particular search term
      return (
        <div className="attribute-modal-checkbox">
          {attribList
            .filter(item =>
              this.state.search
                ? item.name.toLowerCase().indexOf(this.state.search) > -1
                : ""
            )
            .map(item => (
              <Checkbox
                key={item.name}
                name={item.name}
                label={item.label}
                value={this.state[item.name]}
                handleCheckboxChange={this.handleCheckboxChange}
              />
            ))}
        </div>
      );
    } else {
      // if not searched for anything display all the fields
      return (
        <div className="attribute-modal-checkbox">
          <Checkbox
            name="selectall"
            label="Select All"
            value={this.state.selectall}
            handleCheckboxChange={this.handleCheckboxChange}
          />
          <Checkbox
            name="price"
            label="Price"
            value={this.state.price}
            handleCheckboxChange={this.handleCheckboxChange}
          />
          <Checkbox
            name="colors"
            label="Colors"
            value={this.state.colors}
            handleCheckboxChange={this.handleCheckboxChange}
          />
          <Checkbox
            name="condition"
            label="Condition"
            value={this.state.condition}
            handleCheckboxChange={this.handleCheckboxChange}
          />
          <Checkbox
            name="vendors"
            label="Vendors"
            value={this.state.vendors}
            handleCheckboxChange={this.handleCheckboxChange}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div
        className="container"
        style={{
          overflow: this.state.showEditAttributes ? "hidden" : "scroll"
        }}
      >
        {
          // displaying the list of all the list of products
        }
        <div>
          <div className="product-title">Compare Products</div>
          <div className="products-container">
            {this.state.completeList.map(product => (
              <Product
                key={product.id}
                product={product}
                removeCompareProduct={this.removeCompareProduct}
                addCompareProduct={this.addCompareProduct}
              />
            ))}
          </div>
        </div>
        {
          // showing the list of all the items added to the comparison list
        }
        {this.state.compareList && this.state.compareList.length ? (
          <div className="manage-attributes-section">
            <div
              className="manage-attribute-button"
              onClick={this.openEditAttributes}
            >
              Add/Remove Attributes
            </div>
          </div>
        ) : null}
        {this.state.compareList && this.state.compareList.length ? (
          <div
            className="comparison-section"
            style={{ display: this.state.showEditAttributes ? "none" : "flex" }}
          >
            <div className="comparison-product-title">
              <div
                className="comparison-fields-title"
                style={{
                  background:
                    this.state.compareList && this.state.compareList.length
                      ? "#fff"
                      : "#d5d5d8"
                }}
              ></div>
              {this.state.price ? (
                <div className="comparison-fields-title">Price</div>
              ) : null}
              {this.state.colors ? (
                <div className="comparison-fields-title">Colors</div>
              ) : null}
              {this.state.condition ? (
                <div className="comparison-fields-title">Condition</div>
              ) : null}
              {this.state.vendors ? (
                <div className="comparison-fields-title">Vendors</div>
              ) : null}
            </div>
            {this.state.compareList.map(product => (
              <div key={"cmp_" + product.id} className="comparison-product">
                <div className="comparison-fields">{product.name}</div>
                {this.state.price ? (
                  <div className="comparison-fields">{product.price}</div>
                ) : null}
                {this.state.colors ? (
                  <div className="comparison-fields">
                    {product.colors.map(item => (
                      <div
                        key={"color_" + item + product.id}
                        style={{ background: item }}
                        className="comparison-colors"
                      />
                    ))}
                  </div>
                ) : null}
                {this.state.condition ? (
                  <div
                    className="comparison-fields"
                    style={{
                      background:
                        product.condition === "Fresh" ? "#80FFA5" : "#E86176",
                      color: "#FFF"
                    }}
                  >
                    {product.condition}
                  </div>
                ) : null}
                {this.state.vendors ? (
                  <div className="comparison-fields">
                    {product.vendors.map(item => (
                      <div
                        key={"vendor_" + item + product.id}
                        style={{ marginRight: 5 }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        {
          // to show the modal on click of add/edit attributes
        }

        {this.state.showEditAttributes ? (
          <div className="edit-attribute-modal">
            <div className="attribute-modal">
              <div className="attribute-modal-header">
                Add/Remove Attributes
              </div>
              <div className="attribute-modal-body">
                <div style={{ position: "relative" }}>
                  <input
                    placeholder="search attributes"
                    className="input-text-field"
                    type="text"
                    id="search"
                    name="search"
                    onChange={this.handleChange}
                    value={this.state.search}
                    autoComplete="off"
                  />
                  {this.state.search && this.state.search.length ? (
                    <img
                      src={clearImage}
                      className="clear-search-button"
                      onClick={this.clearSearch}
                      alt="close"
                    />
                  ) : null}
                </div>
                {this.renderCheckbox()}
              </div>
              <div className="attribute-modal-footer">
                <div
                  className="attribute-modal-cancel"
                  onClick={this.cancelEditAttributes}
                  style={{ marginRight: "10px" }}
                >
                  Cancel
                </div>
                <div
                  className="attribute-modal-apply"
                  onClick={this.submitEditAttributes}
                >
                  Apply
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Home;
