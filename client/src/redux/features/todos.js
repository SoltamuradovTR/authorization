const initialState = {
  loading: true,
  items: [],
  error: null,
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case "todos/fetch-todos/pending":
      return {
        ...state,
        loading: true,
      };
    case "todos/fetch-todos/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "todos/fetch-todos/rejected":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };
    default:
      return state;
  }
};

export default todos;

export const fetchTodos = () => {
  return async (dispatch, getState) => {
    const state = getState()

    dispatch({ type: "todos/fetch-todos/pending" });

    try {
      const res = await fetch("/todos", {
        headers: {
          'Authorization': `Bearer ${state.application.token}`
        }
      });
      const json = await res.json();

      if (json.error) {
        dispatch({
          type: "todos/fetch-todos/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "todos/fetch-todos/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "todos/fetch-todos/rejected", error: e.toString() });
    }
  };
};
