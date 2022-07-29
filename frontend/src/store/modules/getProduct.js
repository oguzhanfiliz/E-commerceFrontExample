import helper from '@/helper'
import ApiService from '@/services/ApiService'

const state = {
    error: null,
    loading: false,
    productData: null,
    basketProduct: [],
    isDisablePlus: false,
    isDisable: false,
}


const getters = {
    getProductList: state => state.productData,
    getBasketProduct: state => state.basketProduct,
    getError: state => state.error,
    getisDisable: state => state.isDisable,
    getisDisablePlus: state => state.isDisablePlus,
}

const mutations = {
    setProductList(state, payload) {
        state.productData = payload;
    },
    setProductinBasket(state, payload) {
        console.log("here");
        let breakFunc = false;
        if (state.basketProduct.length > 0) {
            state.basketProduct.forEach((element, key) => {
                    if (element.id == payload.id) {
                        if (state.basketProduct[key].count + 1 == 3) {
                            state.isDisablePlus = {key: key, value: true};
                            state.error = "You can't add more than 3 products"
                            setTimeout(() => {
                                state.error = null;

                            }, 3000);
                            breakFunc = true;
                            return
                        } else {
                            state.basketProduct[key].count = state.basketProduct[key].count + 1;
                            breakFunc = true;
                        }
                    }
                }
            )
            if (!breakFunc) {
                state.basketProduct.push(payload);
            }

        } else {
            state.basketProduct.push(payload);
        }
        helper.writeToLocal("basketProduct", state.basketProduct);


    },

    setCheckLocalStorageBasketItem(state, payload) {
        if (localStorage.getItem(payload)) {
            state.basketProduct = helper.readFromLocal('basketProduct');
        }
    },

    setChangeCountBasketProduct(state, payload) {
        state.basketProduct[payload].count -= 1;
        if (state.basketProduct[payload].count < 1) {
            state.isDisable = {key: payload, value: true};
            state.error = "Out of Stock"
            setTimeout(() => {
                state.error = null

            }, 3000);
        }
        state.isDisablePlus = false;
        helper.writeToLocal("basketProduct",  state.basketProduct);

    },
    setChangeCountBasketProductPlus(state, payload) {
        state.basketProduct[payload].count += 1;
        if (state.basketProduct[payload].count > 2) {
            state.isDisablePlus = {key: payload, value: true};
            state.error = "Out of Stock"
            setTimeout(() => {
                state.error = null

            }, 3000);
        }
        state.isDisable = false;
        helper.writeToLocal("basketProduct",  state.basketProduct);
    },
    setBasketDeleteStateandStorage(state) {
        state.basketProduct = [];
        helper.writeToLocal("basketProduct", []);
    },
    setRemoveBasketInProduct(state, payload) {
        state.basketProduct.splice(payload, 1);
        helper.writeToLocal("basketProduct", state.basketProduct);
    }

}


const actions = {

    productList({rootState, commit}) {
        return new Promise((resolve, reject) => {
                ApiService.get(rootState.url + "listing")
                    .then(({data}) => {
                        commit('setProductList', data);
                        return data;
                        resolve(data);
                    }).catch(error => {
                        reject(error);
                    }
                );
            }
        )
    },

    basketProductSendApi({rootState, commit}, payload) {
        return new Promise((resolve, reject) => {
                ApiService.post(rootState.url + "order", payload)
                    .then(({data}) => {
                        commit("setBasketDeleteStateandStorage");
                        resolve(data);
                    }).catch(error => {
                        reject(error);
                    }
                );
            }
        )
    }

}
export default {
    state,
    getters,
    mutations,
    actions
}