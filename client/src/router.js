import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/index";
import Example from "@/views/example";
import PrivacyPolicy from "@/views/privacy";

Vue.use(Router);

export default new Router({
    routes: [{
        path: "/",
        name: "index",
        component: Index
    },{
        path: "/apis/:component",
        name: "api",
        component: Example
    },{
        path: "/patterns/:component",
        name: "pattern",
        component: Example
    },{
        path: "/privacy",
        name: "privacy",
        component: PrivacyPolicy
    }]
});
