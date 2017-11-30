/**
 * Created by sd on 2017/2/22.
 */
import {HIDELOADING, LOADING} from './types'

const state = {
    loading: false
};

const mutations = {
    [LOADING](state) {
        state.loading = true;
    },
    [HIDELOADING](state) {
        state.loading = false;
    }
};

const getters =  {
    loading: (state) => {
        return state.loading
    }
}

export default {
    state,
    mutations,
    getters
}