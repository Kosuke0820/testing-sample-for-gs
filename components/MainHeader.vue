<template>
  <header>
    <h1>Todo App</h1>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
}
</script>

<style scoped>
header {
  height: 56px;
  background: steelblue;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px 0;
}

h1 {
  color: white;
  font-size: 20px;
  line-height: 56px;
  text-align: left;
}
</style>
