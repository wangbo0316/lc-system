import {getDepartList } from '@/services/api';

export default {
  namespace: 'depart',

  state: {
    departList: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getDepartList);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {

        ...state,
        departList: action.payload,
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
