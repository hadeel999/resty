const initialState = {
    methodUrl: [],
    results: [],
  };
  
  export default function historyReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case 'ADD_HISTORY':
        const methodUrl = [
          ...state.methodUrl,
          `${payload.method}:${payload.url}`,
        ];
        const results = [...state.results, payload.results];
        return { methodUrl: methodUrl, results: results };
      case 'CLEAR_HISTORY':
        const clearedMethodUrl = [];
        const clearedResults = [];
        return { methodUrl: clearedMethodUrl, results: clearedResults };
      default:
        return state;
    }
  }
  
  export const addAction = (payLoad) => {
    return {
      type: 'ADD_HISTORY',
      payload: payLoad,
    };
  };
  
  export const removeAction = (payLoad) => {
    return {
      type: 'REMOVE_HISTORY',
      payload: payLoad,
    };
  };
  
  export const clearAction = () => {
    return {
      type: 'CLEAR_HISTORY',
      payload: '',
    };
  };