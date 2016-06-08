import React, { Component, PropTypes } from 'react';

export default class GeosearchInput extends Component {
  constructor(props) {
    super(props);
    this.handleGeosearchInputChange = this.handleGeosearchInputChange.bind(this);
    this.handleGeosearchInputKeyDown = this.handleGeosearchInputKeyDown.bind(this);

    this.state = {
      value: this.props.value
    };
  }

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    return (
      <input
        type="text"
        className="jimu-input geosearch"
        value={value}
        placeholder={placeholder}
        onChange={this.handleGeosearchInputChange}
        onKeyDown={this.handleGeosearchInputKeyDown} />
    );
  }

  handleGeosearchInputChange(event) {
    this.setState({
      value: event.target.value
    });

    this.props.onChange && this.props.onChange(event.target.value);
  }

  handleGeosearchInputKeyDown(event) {
    if (event.keyCode === 38) {
      this.props.onUpArrow && this.props.onUpArrow();
      return false;
    } else if (event.keyCode === 40) {
      this.props.onDownArrow && this.props.onDownArrow();
      return false;
    } else {
      return true;
    }
  }
}

GeosearchInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onDownArrow: PropTypes.func,
  onUpArrow: PropTypes.func
};

GeosearchInput.defaultProps = {
  value: ''
};
