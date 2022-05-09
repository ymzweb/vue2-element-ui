<template>
  <div class="home">
    <div class="login-box">
      <Login />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    Login,
  },
};
</script>

<style lang="less" scoped>
.login-box {
  margin: 0 auto;
  width: 50%;
}
</style>
