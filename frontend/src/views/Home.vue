<template>
    <div>
        <ProductList :productData = "productData"></ProductList>
    </div>
</template>

<script setup>
import {ref, onMounted, onBeforeMount, computed , defineProps} from "vue";
import ProductList from "@/components/ProductList.vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const router = useRouter();
const store = useStore();
const productData = computed(() => store.getters["getProductList"]);

store.dispatch("productList").then(
    (response) => {
      productData.value = response;
    }
)


</script>
<style>

</style>