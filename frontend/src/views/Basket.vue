<template>
<div>
  <div>
    <h4 class="basket-title">MY CART (3)</h4>
    <div class="basket-container" v-for="(product,key) in basketProduct" :key="key">
      <div class="image-container">
        <img class="basket-image" :src="product.image">
        <div class="basket-footer">
          <button class="counter-button">-</button>
          <input class="product-counter" type="number" :value="product.count" max="3">
          <button @click="plusInBasketProduct(key)" class="counter-button">+</button>
        </div>
      </div>

      <div class="product-description">
        <p>{{product.name}}</p>
        <p>{{helper.amountTypeFilter(product.currency) }}{{ product.price }}</p>
      </div>
      <div class="remove-button">
        <button>REMOVE</button>
      </div>

    </div>
    <div class="footer-container">
      <button @click="returnHome()">CONTINUE SHOPPING</button>
      <button>PLACE ORDER</button>
    </div>
  </div>
</div>
</template>

<script setup>
import {ref, onBeforeMount, computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import helper from "@/helper";

const router = useRouter();
const store = useStore();
store.commit("setCheckLocalStorageBasketItem","basketProduct");
const basketProduct = computed(() => store.getters["getBasketProduct"]);
const plusInBasketProduct = (productKey) => {
  console.log(basketProduct[productKey]);
}
const returnHome = () => {
  router.push('/');
}
</script>

<style scoped>
body{
  background-color: #f9f9f9;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.basket-title{
  text-align: left;
  padding:0 0 0.6rem 2%;
  border-bottom: 1px solid rgba(192, 181, 181, 0.3);

}
.basket-container{
  display:flex;
  margin-bottom:2%;
  padding: 2% 0 ;
  border-bottom: 1px solid rgba(192, 181, 181, 0.3);
}
.basket-image {
  width: 10%;
}
.basket-footer{
  display:flex;
  justify-content: center;
}
.counter-button
{
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
.product-counter
{
  width: 30px;
  text-align: center;
}

</style>