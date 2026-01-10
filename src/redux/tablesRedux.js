//selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) =>
  tables.find((table) => String(table.id) === String(tableId));

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const LOAD_TABLES = createActionName('LOAD_TABLES');

export const loadTables = (payload) => ({
  type: LOAD_TABLES,
  payload,
});

// thunk
export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then((res) => res.json())
      .then((tables) => dispatch(loadTables(tables)));
  };
};

// action creators
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_TABLES:
      return action.payload;
    default:
      return statePart;
  }
};
export default tablesReducer;
