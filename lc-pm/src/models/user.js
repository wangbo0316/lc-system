import {
  query as queryUsers,
  queryCurrent,
  createUser,
  updateUser,
  removeUser,
} from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      if (!payload) {
        payload = { page: 1 };
      }
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *createUser({ payload, callback }, { call, put }) {
      const response = yield call(createUser, payload);
      callback(response);
    },

    *removeUser({ payload, callback }, { call, put }) {
      const response = yield call(removeUser, payload);
      callback(response);
    },

    *updateUser({ payload, callback }, { call, put }) {
      const response = yield call(updateUser, payload);
      callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      // console.log(action)
      return {
        ...state,
        currentUser: action.payload.results[0] || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
