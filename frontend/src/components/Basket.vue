<template>
  <div>
    <div>
      <h4 class="basket-title">MY CART ({{ myProductCount }})</h4>
      <div class="basket-container" v-for="(product,key) in basketProduct" :key="key">
        <div class="image-container">
          <img class="basket-image" :src="product.image">
          <div class="basket-footer">
            <button @click="changeCountBasketProduct(key,0)" class="counter-button" :disabled="isDisableChecker(key)">
              -
            </button>
            <input class="product-counter" type="number" :value="product.count" max="3">
            <button @click="changeCountBasketProduct(key,1)" class="counter-button"
                    :disabled="isDisablePlusChecker(key)">+
            </button>
          </div>
          <!--          <p v-show="error" class="error-budge">{{error}}</p>-->

        </div>
        <div class="product-desc">
          <div class="product-description">
            <p>{{ product.name }}</p>
            <p style="font-weight: bold">{{ helper.amountTypeFilter(product.currency) }}{{ product.price }}</p>
          </div>
          <div class="remove-button-container">
            <button class="remove-button" @click="removeBasketInProduct(key)">REMOVE</button>
          </div>
        </div>
      </div>

      <div class="footer-container">
        <button class="shop-button" @click="returnHome()"> &#8592 CONTINUE SHOPPING</button>
        <button class="place-order-button" @click="postBasketProduct()">PLACE ORDER</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onBeforeMount, computed, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import helper from "@/helper";
import {createToaster} from "@meforma/vue-toaster";


const router = useRouter();
const store = useStore();
const toaster = createToaster({});


store.commit("setCheckLocalStorageBasketItem", "basketProduct");
const basketProduct = computed(() => store.getters["getBasketProduct"]);
const error = computed(() => store.getters["getError"]);
const isDisable = computed(() => store.getters["getisDisable"]);
const isDisablePlus = computed(() => store.getters["getisDisablePlus"]);

let myProductCount = ref(0);
myProductCount = basketProduct.value.length;

const changeCountBasketProduct = (productKey, buttonProp) => {
  if (buttonProp) return store.commit("setChangeCountBasketProductPlus", productKey)
  if (!buttonProp) return store.commit("setChangeCountBasketProduct", productKey)
}
const returnHome = () => {
  router.push('/');
}
const postBasketProduct = () => {
  let sendData = [];
  if (basketProduct.value.length > 0) {
    for (let i = 0; i < basketProduct.value.length; i++) {
      if (basketProduct.value[i].count > 0) {
        let data = {
          id: basketProduct.value[i].id,
          amount: basketProduct.value[i].count
        }
        sendData.push(data);
      }
    }
    store.dispatch("basketProductSendApi", sendData).then(
        (response) => {
          toaster.show("Your order has been sent", {type: "success"});
          router.push('/');
        }
    ).catch(
        (error) => {
          toaster.show("Something went wrong", {type: "error"});
        }
    )
  } else {
    toaster.show("Your cart been empty", {type: "error"});
  }
}


const isDisablePlusChecker = (key) => {
  if (key == isDisablePlus.value.key) return true;
  else return false;
}
const isDisableChecker = (key) => {
  if (key == isDisable.value.key) return true;
  else return false;
}

const removeBasketInProduct = (key) => {
  store.commit("setRemoveBasketInProduct", key);
}

</script>

<style scoped>
body {
  overflow: hidden;
  background-color: #f9f9f9;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.basket-title {
  text-align: left;
  padding: 0 0 0.6rem 2%;
  border-bottom: 1px solid rgba(192, 181, 181, 0.3);

}

.basket-container {
  display: flex;
  margin-bottom: 5%;
  border-bottom: 1px solid rgba(192, 181, 181, 0.3);
}

.basket-image {
  width: 10%;
  margin-left: 15%;
  margin-bottom: 1%;

}

.basket-footer {
  display: flex;
  margin-left: 15%;
}

.counter-button {
  margin-right: 10px;
  margin-left: 10px;
  width: 25px;
  font-size: 16px;
  padding: 2px;
  border: 1px solid #948f8f;
  border-radius: 50%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.99);
}

.product-counter {
  width: 30px;
  text-align: center;
}

/*.error-budge {*/
/*  background-color: red;*/
/*  color: white;*/
/*  padding: 1px;*/
/*}*/

.place-order-button {
  background-color: #FB641BF4;
  color: white;
  border: 1px solid #FB641BF4;
  padding: 0.7% 3%;
  font-weight: bold;
  font-size: 16px;
  border-radius: 3px;
  margin-top: 2%;
  margin-left: 1%;
}

.shop-button {
  background-color: rgba(252, 249, 249, 0.99);
  color: rgba(0, 0, 0, 0.79);
  font-weight: bold;
  border: 1px solid rgba(66, 66, 66, 0.1);
  padding: 0.7% 3%;
  font-size: 16px;
  border-radius: 3px;
  margin-top: 2%;
  margin-left: 1%;
}

.footer-container {
  z-index: 9999;
  position: fixed;
  bottom: 0;
  box-shadow: 4px -2px 8px 0px #00000038;
  width: calc(100% - 1px);
  background-color: white;
  padding-bottom: 2%;
  padding-top: 0%;
}

.image-container {
  display: flex;
  flex-direction: column;
  padding: 2%;
}

.product-desc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.remove-button {
  background-color: rgba(252, 249, 249, 0.99);
  color: rgba(0, 0, 0, 0.79);
  border: 1px solid rgba(66, 66, 66, 0.1);
  padding: 10% 20%;
  font-size: 14px;
  border-radius: 3px;
  margin-top: 2%;
  margin-bottom: 5%;
  margin-left: 1%;
}
.product-description{
  display:flex;
  flex-direction:column;
}

.remove-button:hover {
  background-color: rgba(248, 246, 246, 0.99);

}

.shop-button:hover {
  background-color: rgba(238, 234, 234, 0.99);
}

.place-order-button:hover {
  background-color: rgba(227, 91, 26, 0.96);
}

.counter-button:hover {
  background-color: rgba(238, 237, 237, 0.99);
}

@media only screen and (max-width: 1024px) {

  .basket-image {
    width: 33%;
    margin-left: 2%;
    margin-bottom: 3%;
  }

  .basket-footer {
    margin-left: 1%;
  }

  .footer-container {
    padding-top: 2%;
    padding-bottom: 3%;
    width: 100%;
  }

  .image-container {
    max-width: 50%;
  }

  .place-order-button {
    padding: 1.7% 10%;
  }

  .shop-button {
    padding: 1.7% 5%;
  }
  .product-description
  {
    margin-left: -400%;
  }
}
</style>