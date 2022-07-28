import { createStore } from "vuex";
// import AuthModule from "./modules/AuthModule"
import getProductModule from "./modules/getProduct"
const store = createStore({
  state: {
    loading: false,
    url : "https://nonchalant-fang.glitch.me/"

  },
    modules: {
      getProductModule
    //   Content
    }
})
export default store