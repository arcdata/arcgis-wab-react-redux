import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash/debounce';
import GeosearchInput from '../components/GeosearchInput';
import GeosearchResults from '../components/GeosearchResults';
import { suggest, select } from '../actions';

class Geosearch extends Component {
  constructor(props) {
    super(props);

    this.handleSearchTextChange = debounce(this.handleSearchTextChange.bind(this), props.delay);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleUpArrow = this.handleUpArrow.bind(this);
    this.handleDownArrow = this.handleDownArrow.bind(this);
  }

  render() {
    const {
      nls,
      searchText,
      suggestions,
      selectedSuggestionId,
      error
    } = this.props;

    return (
      <div>
        <GeosearchInput
          value={searchText}
          placeholder={nls.placeholder}
          onChange={this.handleSearchTextChange}
          onUpArrow={this.handleUpArrow}
          onDownArrow={this.handleDownArrow} />
        <GeosearchResults
          suggestions={suggestions}
          selectedSuggestionId={selectedSuggestionId}
          onSelectionChange={this.handleSelectionChange}
          onUpArrow={this.handleUpArrow}
          onDownArrow={this.handleDownArrow} />
      </div>
    );
  }

  handleSearchTextChange(text) {
    const { actions } = this.props;
    actions.suggest(text);
  }

  handleSelectionChange(id) {
    const { actions } = this.props;
    actions.select(id);
  }

  handleUpArrow() {
    const { suggestions, selectedSuggestionId, actions } = this.props;
    const suggestionIds = Object.keys(suggestions || {});
    const currentIndex = suggestionIds.indexOf(selectedSuggestionId);
    const nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
    actions.select(suggestionIds[nextIndex]);
  }

  handleDownArrow() {
    const { suggestions, selectedSuggestionId, actions } = this.props;
    const suggestionIds = Object.keys(suggestions || {});
    const currentIndex = suggestionIds.indexOf(selectedSuggestionId);
    const nextIndex = suggestionIds.length > currentIndex + 1 ? currentIndex + 1 : suggestionIds.length - 1;
    actions.select(suggestionIds[nextIndex]);
  }
}

Geosearch.propTypes = {
  delay: PropTypes.number
};

Geosearch.defaultProps = {
  delay: 350
};

const mapStateToProps = (state) => {
  return {
    nls: state.app.nls,
    searchText: state.geosearch.searchText,
    suggestions: state.geosearch.suggestions,
    selectedSuggestionId: state.geosearch.selectedSuggestionId,
    loading: state.geosearch.loading,
    error: state.geosearch.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      suggest,
      select
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Geosearch);
