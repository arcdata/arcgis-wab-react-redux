import React, { Component, PropTypes } from 'react';

export default class GeosearchResults extends Component {
  constructor(props) {
    super(props);
    this.handleSuggestionItemClick = this.handleSuggestionItemClick.bind(this);
    this.handleSuggestionItemKeyDown = this.handleSuggestionItemKeyDown.bind(this);
  }

  render() {
    const { suggestions, selectedSuggestionId } = this.props;
    const suggestionIds = Object.keys(suggestions || {});
    const suggestionItems = suggestionIds.map((suggestionId, index) => {
      const suggestion = suggestions[suggestionId];
      const className = suggestionId === selectedSuggestionId ? 'jimu-list-item selected' : 'jimu-list-item';
      return (
        <li
          tabIndex="-1"
          key={suggestionId}
          className={className}
          onClick={this.handleSuggestionItemClick.bind(this, suggestionId) }
          onKeyDown={this.handleSuggestionItemKeyDown}>
          <span className="jimu-list-item label">
            {suggestion.loading ? 'Fetching geometry...' : suggestion.text}
          </span>
        </li>
      );
    });

    return (
      <ul className='jimu-list-container geosearch'>
        {suggestionItems}
      </ul>
    );
  }

  handleSuggestionItemClick(id) {
    this.props.onSelectionChange && this.props.onSelectionChange(id);
  }

  handleSuggestionItemKeyDown(event) {
    console.log(event);
    event.keyCode === 38 && this.props.onUpArrow && this.props.onUpArrow();
    event.keyCode === 40 && this.props.onDownArrow && this.props.onDownArrow();
  }
}

GeosearchResults.propTypes = {
  suggestions: PropTypes.object,
  selectedSuggestionId: PropTypes.string,
  onSelectionChange: PropTypes.func,
  onUpArrow: PropTypes.func,
  onDownArrow: PropTypes.func
};

GeosearchResults.defaultProps = {
  suggestions: null,
  selectedSuggestionId: null
};
