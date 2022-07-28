<template>
  <div>
    <nav>
      <ul>
        <router-link class="li" to="/">Home</router-link>
        <router-link class="li" to="/" >Product List</router-link>
       <router-link class="li" to="/basket" >Basket</router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
</script>

<style scoped>
ul {
  display:flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

.li {
  float: left;
}

.li {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.li:hover {
  background-color: #fb641b;
}

/*.active {*/
/*  background-color: #04AA6D;*/
/*}*/
</style>