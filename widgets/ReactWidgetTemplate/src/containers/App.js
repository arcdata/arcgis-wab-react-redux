import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Class representing a root application component connected to Redux store to select state from and dispatch actions.
 *
 * @extends Component
 */
class App extends Component {
  /**
   * Creates an app.
   *
   * @param {Object} props Properties provided during app creation.
   */
  constructor(props) {
    super(props);

    // Initial internal state of the component.
    // Usually used to hold mutable state specific to the component domain.
    this.state = {};
  }

  /**
   * React lifecycle method.
   * Called on every props or state change.
   *
   * @param {Object} prevProps Previous properties.
   * @param {Object} prevState Previous state.
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.diffProps(prevProps);
    }

    if (prevState !== this.state) {
      this.diffState(prevState);
    }
  }

  /**
   * React lifecycle method.
   * Called on every props or state change.
   *
  * @returns {Object} A virtual representation of a native DOM component or another composite component.
   */
  render() {
    const {
      id,
      config,
      nls,
      active,
      initialized,
      error,
      wkid
    } = this.props;

    if (initialized) {
      return (
        <div>
          <div>Widget ID: {id}</div>
          <div>Initialized: {JSON.stringify(initialized) }</div>
          <div>Active: {JSON.stringify(active) }</div>
          <div>Label from nls: {nls.label}</div>
          <div>Label from config: {config.label}</div>
          <div>WKID: {wkid}</div>
        </div>
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

  /**
   * Calculates internal state changes.
   * Called on every props change.
   *
   * @param {Object} prevProps Previous properties.
   */
  diffProps(prevProps) {
    let stateChanges = null;

    if (stateChanges) {
      this.setState(stateChanges);
    }
  }

  /**
   * Applies internal state changes.
   * Usually used to update UI components managed outside React (Esri map, layers, etc.).
   */
  diffState(prevState) {
  }
}

App.propTypes = {
  map: PropTypes.object.isRequired,
};

/**
 * Calculates component properties from application state managed by Redux
 */
const mapStateToProps = (state) => {
  return {
    id: state.app.id,
    config: state.app.config,
    nls: state.app.nls,
    initialized: state.app.initialized,
    error: state.app.error,
    active: state.app.active,
    wkid: state.app.wkid
  };
};

// Connect component to application state and actions
export default connect(
  mapStateToProps
)(App);
