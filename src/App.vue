<template>
  <div id="app">
    <v-app>
      <Header></Header>
      <v-main>
        <router-view v-slot="{ Component, route }">
          <Transition :name="route.meta.transition || 'fade'">
            <component :is="Component" />
          </Transition>
        </router-view>
        <Footer></Footer>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Header: () => import("./components/header"),
    Footer: () => import("./components/footer"),
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.btn-central {
  display: flex;
  justify-content: center;
}

.margin1 {
  margin: 0.5vw 0.4vw;
  padding: 0;
}

.shadow-2 {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
