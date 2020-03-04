// @flow

import React, { Component } from "react";

// importing the style from the external css file
import "./checkbox.css";

// declaring the type of states used
type Props = {
  value: boolean,
  name: string,
  label: string,
  handleCheckboxChange: () => void
};
type State = {
  checkbox: boolean
};

class Checkbox extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      // assign the list of all the attributes to true
      checkbox: true
    };
    //  binding all the necessary functions to perform state operations
    (this: any).handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // get the existing state of attribute from the parent
    this.setState(prevState => ({
      checkbox: this.props.value
    }));
  }
  //  update the state of attribute from the parent if there is any change update the state
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState(prevState => ({
        checkbox: this.props.value
      }));
    }
  }

  // toggle the state of the attribute onchange
  handleInputChange() {
    const checkbox = !this.state.checkbox;
    this.setState(prevState => ({
      checkbox
    }));
    // call the parent function onchange of the checkbox attribute
    this.props.handleCheckboxChange(this.props.name, checkbox);
  }

  render() {
    return (
      <div className="checkbox-section">
        {
          // checkbox value
        }
        <label>
          <input
            style={{ marginRight: 10 }}
            type="checkbox"
            name={this.props.name}
            checked={this.state.checkbox}
            onChange={this.handleInputChange}
          />
          {
            // name of the check box
          }
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
