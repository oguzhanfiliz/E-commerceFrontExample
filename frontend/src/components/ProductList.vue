<template>
  <div>
    <div class="card-container">
      <div class="card" v-for="(product,key) in productData" :key="key">
        <div class="image-container">
          <img class="product-image" :src="product.image" :alt="product.name">
        </div>
        <div class="product-detail">
          <p class="product-name">{{ product.name }}</p>
          <div class="card-footer">
          <p class="price">{{  helper.amountTypeFilter(product.currency) }}{{ product.price }}</p>
          <button class="btn btn-orange"  @click="addToBasketProduct(product)" >ADD BASKET</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeMount, computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import helper from '@/helper'

const router = useRouter();
const store = useStore();
const productData = ref();
store.dispatch("productList").then(
    (response) => {
      productData.value = response;
    }
)

const addToBasketProduct = async (product) => {
  product['count']=1;
  store.commit("setProductinBasket",product)
  router.push('/basket');
}

</script>

<style scoped>
* {
  font-size: 15px;
  font-family: Arial;
  color: rgba(77, 76, 76, 0.85);
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1%;
  margin-right: 33%;
  margin-left: 33%;
}

.product-image {
  width: 45%;
  height: 50%;
}

.card {
  width: 45%;
  height: 33%;
  border: 1px solid rgb(0 0 0 / 5%);
}
.btn-orange{
  background-color: rgba(251, 100, 27, 0.96);
  border: none;
  border-radius: 3px;
  padding: 0px 40px;
  margin-bottom: 5px;
  color:white;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: initial;
}
.btn-orange:hover{
  background-image: linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.3));
}
.card-footer
{
  display: flex;
  justify-content: space-around;
  margin-bottom:5%;
}
.product-name{
  margin-bottom: 5%;
}
.image-container{
  margin-top:20%;
}
@media only screen and (max-width: 1024px) {
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 1%;
    margin-right: 0;
    margin-left: 0;
  }
  .btn-orange{
   padding: 0px 5px;
  }
  .card{
    margin-top:2%;
  }
}
</style>