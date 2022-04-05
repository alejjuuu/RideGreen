<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/testing">Testing</router-link> |
    <router-link to="/maps">Maps</router-link> |
    <router-link to="/Map">maps</router-link>

  </nav>
  <div id="app">
    <maps/>
  </div>
  <router-view/>
</template>

<script>
import maps from './views/maps';

export default{
  name: 'App',
  components: {
    maps
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
