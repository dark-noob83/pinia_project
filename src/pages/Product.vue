<template>
  <div>
    <div class="container mt-5">
      <div class="row g-3">
        <div v-for="product in products" :key="product.id" class="col-md-3">
          <div class="card">
            <img class="card-img-top" :src="product.image" alt="" />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">
                {{ product.description }}
              </p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <button @click="addToCart(product)" class="btn btn-outline-success btn-sm">Add To Cart</button>
              <span>{{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useProductStore } from "../store/product";
import { useCartStore } from "../store/cart";

export default {
  setup() {
    const productStore = useProductStore();
    const cartStore = useCartStore();
    const products = computed(() => productStore.allProducts);

    function addToCart(product){
      cartStore.addToCart(product)
    }

    return {
      products,
      addToCart
    };
  },
};
</script>
