const ipcRenderer = window.ipcRenderer;

import {
  SEARCH_SPELL_RANKS,
  STORE_SPELL_RANK,
  FIND_SPELL_RANK,
  UPDATE_SPELL_RANK,
  DESTROY_SPELL_RANK,
  CREATE_SPELL_RANK,
  COPY_SPELL_RANK,
} from "../constants";

export default {
  namespaced: true,
  state: () => ({
    spellRanks: [],
    spellRank: {},
  }),
  actions: {
    searchSpellRanks({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send(SEARCH_SPELL_RANKS, payload);
        ipcRenderer.on(SEARCH_SPELL_RANKS, (event, response) => {
          commit(SEARCH_SPELL_RANKS, response);
          resolve();
        });
        ipcRenderer.on(`${SEARCH_SPELL_RANKS}_REJECT`, (event, error) => {
          reject(error);
        });
      });
    },
    storeSpellRank(context, payload) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send(STORE_SPELL_RANK, payload);
        ipcRenderer.on(STORE_SPELL_RANK, () => {
          resolve();
        });
        ipcRenderer.on(`${STORE_SPELL_RANK}_REJECT`, (event, error) => {
          reject(error);
        });
      });
    },
    findSpellRank({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send(FIND_SPELL_RANK, payload);
        ipcRenderer.on(FIND_SPELL_RANK, (event, response) => {
          commit(FIND_SPELL_RANK, response);
          resolve();
        });
        ipcRenderer.on(`${FIND_SPELL_RANK}_REJECT`, (event, error) => {
          reject(error);
        });
      });
    },
    updateSpellRank(context, payload) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send(UPDATE_SPELL_RANK, payload);
        ipcRenderer.on(UPDATE_SPELL_RANK, () => {
          resolve();
        });
        ipcRenderer.on(`${UPDATE_SPELL_RANK}_REJECT`, (event, error) => {
          reject(error);
        });
      });
    },
    destroySpellRank(context, payload) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send(DESTROY_SPELL_RANK, payload);
        ipcRenderer.on(DESTROY_SPELL_RANK, () => {
          resolve();
        });
        ipcRenderer.on(`${DESTROY_SPELL_RANK}_REJECT`, (event, error) => {
          reject(error);
        });
      });
    },
    createSpellRank({ commit }, payload) {
      return new Promise((resolve) => {
        commit(CREATE_SPELL_RANK, payload);
        resolve();
      });
    },
    copySpellRank(context, payload) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send(COPY_SPELL_RANK, payload);
        ipcRenderer.on(COPY_SPELL_RANK, () => {
          resolve();
        });
        ipcRenderer.on(`${COPY_SPELL_RANK}_REJECT`, (event, error) => {
          reject(error);
        });
      });
    },
  },
  mutations: {
    [SEARCH_SPELL_RANKS](state, spellRanks) {
      state.spellRanks = spellRanks;
    },
    [FIND_SPELL_RANK](state, spellRank) {
      state.spellRank = spellRank;
    },
    [CREATE_SPELL_RANK](state, spellRank) {
      state.spellRank = spellRank;
    },
  },
};
