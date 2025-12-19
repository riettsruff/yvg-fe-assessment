type ReducersMap = Record<string, (state: any, action: any) => void>;

export const createSlice = ({
  name,
  initialState,
  reducers,
}: {
  name: string;
  initialState: any;
  reducers: ReducersMap;
}) => {
  const actions = Object.keys(reducers).reduce(
    (acc, key) => ({
      ...acc,
      [key]: (payload: any) => ({ type: `${name}/${key}`, payload }),
    }),
    {} as Record<string, (payload: any) => { type: string; payload: any }>,
  );

  const reducer = (state = initialState, action: { type: string; payload?: any }) => {
    const type = action.type?.startsWith(`${name}/`)
      ? action.type.slice(name.length + 1)
      : action.type;
    const caseReducer = (reducers as ReducersMap)[type];
    if (!caseReducer) return state;

    const draft =
      typeof structuredClone === 'function'
        ? structuredClone(state)
        : JSON.parse(JSON.stringify(state));
    caseReducer(draft, action);
    return draft;
  };

  return { reducer, actions };
};

export const configureStore = ({
  reducer,
  middleware,
}: {
  reducer: Record<string, (state: any, action: any) => any>;
  middleware?: (getDefault: () => any) => any;
}) => {
  const state = Object.keys(reducer).reduce(
    (acc, key) => {
      acc[key] = reducer[key](undefined, { type: '@@INIT' });
      return acc;
    },
    {} as Record<string, any>,
  );

  const baseDispatch = (action: any) => {
    Object.keys(reducer).forEach((key) => {
      state[key] = reducer[key](state[key], action);
    });
    return action;
  };

  const storeApi = {
    getState: () => state,
    dispatch: (action: any) => dispatch(action),
  };

  const dispatch = middleware ? middleware(() => storeApi)(baseDispatch) : baseDispatch;

  return {
    dispatch,
    getState: () => state,
  };
};
