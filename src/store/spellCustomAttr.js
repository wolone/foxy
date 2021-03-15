const ipcRenderer = window.require("electron").ipcRenderer;

import {
  STORE_SPELL_CUSTOM_ATTR,
  FIND_SPELL_CUSTOM_ATTR,
  UPDATE_SPELL_CUSTOM_ATTR,
  CREATE_SPELL_CUSTOM_ATTR,
} from "../constants";

export default {
  namespaced: true,
  state: () => ({
    spellCustomAttr: {},
  }),
  actions: {
    storeSpellCustomAttr(context, payload) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send(STORE_SPELL_CUSTOM_ATTR, payload);
        ipcRenderer.on(STORE_SPELL_CUSTOM_ATTR, () => {
          resolve();
        });
        ipcRenderer.on(`${STORE_SPELL_CUSTOM_ATTR}_REJECT`, (event, error) => {
          reject(error);
        });
      });
    },
    findSpellCustomAttr({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send(FIND_SPELL_CUSTOM_ATTR, payload);
        ipcRenderer.on(FIND_SPELL_CUSTOM_ATTR, (event, response) => {
          commit(FIND_SPELL_CUSTOM_ATTR, response);
          resolve();
        });
        ipcRenderer.on(`${FIND_SPELL_CUSTOM_ATTR}_REJECT`, (event, error) => {
          reject(error);
        });
      });
    },
    updateSpellCustomAttr(context, payload) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send(UPDATE_SPELL_CUSTOM_ATTR, payload);
        ipcRenderer.on(UPDATE_SPELL_CUSTOM_ATTR, () => {
          resolve();
        });
        ipcRenderer.on(`${UPDATE_SPELL_CUSTOM_ATTR}_REJECT`, (event, error) => {
          reject(error);
        });
      });
    },
    createSpellCustomAttr({ commit }, payload) {
      return new Promise((resolve) => {
        commit(CREATE_SPELL_CUSTOM_ATTR, payload);
        resolve();
      });
    },
  },
  mutations: {
    [FIND_SPELL_CUSTOM_ATTR](state, spellCustomAttr) {
      state.spellCustomAttr = spellCustomAttr;
    },
    [CREATE_SPELL_CUSTOM_ATTR](state, spellCustomAttr) {
      state.spellCustomAttr = spellCustomAttr;
    },
  },
};
