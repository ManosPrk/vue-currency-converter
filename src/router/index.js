import Vue from "vue";
import VueRouter from "vue-router";
import ConverterPage from "../views/converter-page";
import CurrencyList from "../views/currency-list";
import RateList from "../views/rate-list";
import ManageCurrency from "../views/manage-currency";
import ManageRate from "../views/manage-rate";

Vue.use(VueRouter);

const parseProps = (r) => ({ id: parseInt(r.params.id) });

const routes = [
  {
    path: "/",
    name: "ConverterPage",
    component: ConverterPage,
  },
  {
    path: "/currencies",
    name: "currency-list",
    component: CurrencyList,
  },
  {
    path: "/rates",
    name: "rate-list",
    component: RateList,
  },
  {
    path: "/rates/:id",
    name: "manage-rate",
    props: parseProps,
    component: ManageRate,
  },
  {
    path: "/currencies/:id",
    name: "manage-currency",
    props: parseProps,
    component: ManageCurrency,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
