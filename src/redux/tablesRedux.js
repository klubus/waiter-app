//selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) =>
  tables.find((table) => String(table.id) === String(tableId));

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const LOAD_TABLES = createActionName('LOAD_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');

export const loadTables = (payload) => ({
  type: LOAD_TABLES,
  payload,
});

export const updateTable = (payload) => ({ type: UPDATE_TABLE, payload });
export const addTable = (payload) => ({ type: ADD_TABLE, payload});
export const deleteTable = (tableId) => ({
  type: REMOVE_TABLE,
  payload: tableId,
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
    case UPDATE_TABLE:
      return statePart.map((table) =>
        table.id === action.payload.id ? { ...table, ...action.payload } : table
      );
    case REMOVE_TABLE:
      return statePart.filter((table) => table.id !== action.payload);
    case ADD_TABLE:
      return [...statePart, { ...action.payload}];
    default:
      return statePart;
  }
};
export default tablesReducer;
