import helper from '@/helper'
import ApiService from '@/services/ApiService'

   const  state = {
    error: null,
    loading: false,
    productData : null,
    basketProduct : [],
    }


const  getters = {
    getProductList: state => state.productData,
    getBasketProduct : state => state.basketProduct,
}

const mutations = {
    setProductList(state, payload) {
        state.productData = payload;
    },
    async setProductinBasket(state,payload){
        await state.basketProduct.push(payload);
        helper.writeToLocal("basketProduct",state.basketProduct);
    },
    setCheckLocalStorageBasketItem(state,payload){
        if(localStorage.getItem(payload)){
            state.basketProduct = helper.readFromLocal('basketProduct');
        }
    }
}


const actions = {

    productList({ rootState,commit }) {
        return new Promise((resolve, reject) => {
                ApiService.get(rootState.url+"listing")
            .then(({ data }) => {

                    commit('setProductList', data);
                    resolve(data);
                }).catch(error => {
                        reject(error);
                    }
                );
            }
        )
    },
    checkLocalstorageBasketItem({rootState,commit},payload){
        commit("setCheckLocalStorageBasketItem",payload)
    }

}
export default {
    state,
    getters,
    mutations,
    actions
}