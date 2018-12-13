import { getDepartList, addDepart, removeDepart, updateDepart ,getDepartPara} from '@/services/depart';

export default {
  namespace: 'depart',

  state: {
    departList: [],
    departPara:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      if (!payload) {
        payload = { page: 1 };
      }
      const response = yield call(getDepartList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchPara(_, { call, put }) {

      const response = yield call(getDepartPara);
      yield put({
        type: 'savePara',
        payload: response,
      });
    },

    *addDepart({ payload, callback }, { call, put }) {
      const response = yield call(addDepart, payload);
      callback(response);
    },

    *removeDepart({ payload, callback }, { call, put }) {
      const response = yield call(removeDepart, payload);
      callback(response);
    },

    *updateDepart({ payload, callback }, { call, put }) {
      const response = yield call(updateDepart, payload);
      callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        departList: action.payload,
      };
    },
    savePara(state, action) {
      console.log(action)
      return {
        ...state,
        departPara: action.payload,
      };
    },
  },
};
