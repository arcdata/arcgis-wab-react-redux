const stateId = 'react-geosearch';

export function loadState() {
  try {
    const serializedState = localStorage.getItem(stateId);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(stateId, serializedState);
  } catch (error) {

  }
}
