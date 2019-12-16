import Vue from "vue";
import VueScrollTo from "vue-scrollto";

Vue.use(VueScrollTo, {
  duration: 450,
  easing: "easeOutQuad",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
