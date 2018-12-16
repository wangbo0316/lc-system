import { updatePara,getParaList} from '@/services/para';

export default {
  namespace: 'para',

  state: {
    paraList: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getParaList);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *update({ payload ,callback}, { call, put }) {
      const response = yield call(updatePara,payload);
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
  },
};
