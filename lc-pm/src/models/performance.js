import { updatePf,createPf,getPfList,getTranList,removePf} from '@/services/performance';

export default {
  namespace: 'performance',

  state: {
    PfList:[],
    TranList:[]
  },

  effects: {
    *getPfList({callback}, { call, put }) {
      const response = yield call(getPfList);
      yield put({
        type: 'savePf',
        payload: response,
      });
      callback(response)
    },
    *getTranList({payload}, { call, put }) {
      const response = yield call(getTranList,payload);
      yield put({
        type: 'saveTran',
        payload: response,
      });
    },

    *removePf({payload,callback}, { call, put }) {
      const response = yield call(removePf,payload);
      callback(response)
    },

    *updatePf({ payload ,callback}, { call, put }) {
      const response = yield call(updatePf,payload);
      callback(response)
    },

    *createPf({ payload ,callback}, { call, put }) {
      const response = yield call(createPf,payload);
      callback(response)
    },

  },

  reducers: {
    savePf(state, action) {
      return {
        ...state,
        PfList: action.payload,
      };
    },

    saveTran(state, action) {
      return {
        ...state,
        TranList: action.payload,
      };
    },
  },
};
