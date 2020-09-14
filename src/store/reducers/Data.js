import * as actions from "../actions";

const initialState = {
  data: [],
};

const historyDataReceived = (state, action) => {
  const { getMeasurements } = action;
  return {
    ...state,
    data: getMeasurements.map( measurement => {
      return {...measurement};
    }),
  };
};

const newMeasurementReceived = (state, action) => {

  const thirtyMinuteInterval = 30 * 60 * 1000;

  const { newMeasurement } = action;

  if( state.data.length === 0 ) {
    return state;
  }

  if( state.data[0].metric !== newMeasurement.metric ) {
    return state;
  }

  const data = state.data.filter( 
    measurement => ( measurement.at > newMeasurement.at - thirtyMinuteInterval )
  );

  data.push(newMeasurement);

  return {
    ...state,
    data: data.map( measurement => {
      return {...measurement};
    }),
  };
};

const handlers = {
  [actions.HISTORY_DATA_RECEIVED]: historyDataReceived,
  [actions.NEW_MEASUREMENTS_RECEIVED]: newMeasurementReceived,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state,action);
};