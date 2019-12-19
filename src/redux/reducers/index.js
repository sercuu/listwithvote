import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ListReducer from './export/voteListReducer';

const allField = combineReducers({
  ListReducer,
  form: reduxFormReducer,
});

export default allField;
