/**
 * Created by sd on 2017/2/22.
 */
import * as types from './types'

export default {
    loading: ({commit}) => {
        commit(types.LOADING)
    },
    hideloading: ({commit}) => {
        commit(types.HIDELOADING)
    }
}