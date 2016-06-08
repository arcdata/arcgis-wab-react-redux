import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Graphic from 'esri/graphic';
import Geosearch from '../containers/Geosearch';
import GeosearchInput from '../components/GeosearchInput';
import GeosearchResults from '../components/GeosearchResults';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSuggestionGraphic: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.diffProps(prevProps);
    }

    if (prevState !== this.state) {
      this.diffState(prevState);
    }
  }

  render() {
    const {
      initialized,
      error
    } = this.props;

    if (initialized) {
      return (
        <Geosearch delay={350} />
      );
    } else if (error) {
      return (
        <div>
          <p><b>{error.message}</b></p>
          <p>{error.stack}</p>
        </div>
      );
    } else {
      return (
        <div>Intitialization is in progress...</div>
      );
    }
  }

  diffProps(prevProps) {
    const {
      suggestions,
      selectedSuggestionId,
      active
    } = this.props;
    const {
      suggestions: prevSuggestions,
      selectedSuggestionId: prevSelectedSuggestionId,
      active: prevActive
    } = prevProps;
    let stateChanges = null;

    if (suggestions !== prevSuggestions || selectedSuggestionId !== prevSelectedSuggestionId || active !== prevActive) {
      if (selectedSuggestionId && suggestions) {
        const selectedSuggestion = suggestions[selectedSuggestionId];
        if (selectedSuggestion && selectedSuggestion.geometry && active) {
          stateChanges = Object.assign({}, stateChanges, {
            selectedSuggestionGraphic: new Graphic({
              geometry: selectedSuggestion.geometry,
              symbol: {
                color: [255, 0, 0, 255],
                size: 8,
                angle: 0,
                xoffset: 0,
                yoffset: 0,
                type: 'esriSMS',
                style: 'esriSMSCircle',
                outline: {
                  color: [0, 0, 0, 255],
                  width: 1,
                  type: 'esriSLS',
                  style: 'esriSLSSolid'
                }
              }
            })
          });
        } else {
          stateChanges = Object.assign({}, stateChanges, {
            selectedSuggestionGraphic: null
          });
        }
      } else {
        stateChanges = Object.assign({}, stateChanges, {
          selectedSuggestionGraphic: null
        });
      }
    }

    if (stateChanges) {
      this.setState(stateChanges);
    }
  }

  diffState(prevState) {
    const { map } = this.props;
    const { selectedSuggestionGraphic } = this.state;
    const { selectedSuggestionGraphic: prevSelectedSuggestionGraphic } = prevState;

    if (selectedSuggestionGraphic !== prevSelectedSuggestionGraphic) {
      if (prevSelectedSuggestionGraphic) {
        map.graphics.remove(prevSelectedSuggestionGraphic);
      }
      if (selectedSuggestionGraphic) {
        map.graphics.add(selectedSuggestionGraphic);
        map.centerAt(selectedSuggestionGraphic.geometry);
      }
    }
  }
}

App.propTypes = {
  map: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    id: state.app.id,
    config: state.app.config,
    nls: state.app.nls,
    initialized: state.app.initialized,
    error: state.app.error,
    active: state.app.active,
    suggestions: state.geosearch.suggestions,
    selectedSuggestionId: state.geosearch.selectedSuggestionId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
