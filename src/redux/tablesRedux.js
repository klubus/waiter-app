//selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) =>
  tables.find((table) => String(table.id) === String(tableId));

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const LOAD_TABLES = createActionName('LOAD_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

export const loadTables = (payload) => ({
  type: LOAD_TABLES,
  payload,
});

export const updateTable = (payload) => ({ type: UPDATE_TABLE, payload });

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
    case UPDATE_TABLE:
      return statePart.map((table) =>
        table.id === action.payload.id ? { ...table, ...action.payload } : table
      );
    default:
      return statePart;
  }
};
export default tablesReducer;
