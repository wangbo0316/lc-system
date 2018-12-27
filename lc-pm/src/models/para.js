import { updatePara,getParaList,getCurrPara,getOnePara} from '@/services/para';

export default {
  namespace: 'para',

  state: {
    paraList: [],
    currPara:{},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getParaList);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *getCurrPara(_, { call, put }) {
      const response = yield call(getCurrPara);
      yield put({
        type: 'saveCurrPara',
        payload: response,
      });
    },

    *update({ payload ,callback}, { call, put }) {
      const response = yield call(updatePara,payload);
      callback(response)
    },

    *getOnePara({ payload ,callback}, { call, put }) {
      const response = yield call(getOnePara,payload);
      callback(response)
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        paraList: action.payload,
      };
    },

    saveCurrPara(state, action) {
      return {
        ...state,
        currPara: action.payload[0],
      };
    },
  },
};
