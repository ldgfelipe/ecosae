let observer;
import Vuex from "vuex";

import {state} from './modulos/state.js';
import {actions} from './modulos/actions.js';
import {mutations} from './modulos/mutations.js';
import {getters} from './modulos/getters.js';

const createStore = () => {
    return new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
}