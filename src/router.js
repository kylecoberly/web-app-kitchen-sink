import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/index";
import Api from "@/views/api";
import PrivacyPolicy from "@/views/privacy";

Vue.use(Router);

export default new Router({
    routes: [{
        path: "/",
        name: "index",
        component: Index
    },{
        path: "/apis/:component",
        name: "apis",
        component: Api
    },{
        path: "/privacy",
        name: "privacy",
        component: PrivacyPolicy
    }]
});
