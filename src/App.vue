<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Keeper Tools</router-link>
      <!--

      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/tutorials" class="nav-link">Tutorials</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
      </div>
      -->
    </nav>

    <div class="container mt-3">
      <router-view
        v-on="$listeners" />
    </div>
  </div>
</template>

<script>


export default {

  name: "app",
  data() {
    return {
      isModalVisible: false,
      modalSlot: undefined,
    };
  },
  created(){

  },
  methods: {

  }
};
</script>

<style>

.button{
    cursor: pointer;
    width: 25px;
    height: 25px;
    background: #b0bec5;
    -o-border-image: url(https://vignette.wikia.nocookie.net/monster-sanctuary/images/3/3b/WhiteBorder.png) 6 stretch;
    border-image: url(https://vignette.wikia.nocookie.net/monster-sanctuary/images/3/3b/WhiteBorder.png) 6 stretch;
    border-width: 4px;
    border-style: solid;
    display: flex;
    justify-content: center;
}

.button:hover{
  background: #90a4ae;
}

</style>
