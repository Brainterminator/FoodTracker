import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../pages/SearchPage.vue";
import TrackerPage from "../pages/TrackerPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import SettingsPage from "../pages/SettingsPage.vue";
import ScannerPage from "../pages/ScannerPage.vue"; // optional

const routes = [
    { path: "/", redirect: "/search" },
    { path: "/search", component: SearchPage },
    { path: "/tracker", component: TrackerPage },
    { path: "/profile", component: ProfilePage },
    { path: "/settings", component: SettingsPage },
    { path: "/scanner", component: ScannerPage },
];

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});