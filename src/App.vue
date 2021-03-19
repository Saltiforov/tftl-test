<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import Home from "@/views/Home";

export default {
  name: "App",
  components: { Home }
};
</script>

<style lang="scss">
@font-face {
  font-family: "HelveticaRegular";
  src: url("~@/assets/fonts/HelveticaRegular/HelveticaRegular.woff")
    format("woff");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "HelveticaThin";
  src: url("~@/assets/fonts/HelveticaThin/HelveticaThin.woff") format("woff");
  font-weight: 300;
  font-style: normal;
}
body,
h2,
h1,
h3 {
  margin: 0;
  font-family: "HelveticaRegular";
}

.container {
  //max-width: 1400px;
  max-width: 1260px;
  padding: 0 15px;
  margin: auto;
  box-sizing: border-box;
}
</style>
