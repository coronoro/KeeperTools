import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: "KeeperTools",
  routes: [
    {
      path: "/",
      alias: "/team",
      name: "team",
      component: () => import("./components/TeamSetup")
    },
    {
      path: "/monster/:id",
      name: "monster-details",
      component: () => import("./components/MonsterPage")
    },
  ]
});
