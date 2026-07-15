import { createRouter, createWebHistory, RouteRecordRaw } from "@ionic/vue-router";
import TabsPage from "../views/TabsPage.vue";

import { useAuth } from "@/composables/useAuth";

// Lazy load components
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import ResetPasswordPage from "../views/ResetPasswordPage.vue";
import HomePage from "../views/HomePage.vue";
import CollectionPage from "../views/CollectionPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import ContatoForm from "../components/ContatoForm.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect:  () => {
       const { estaLogado } = useAuth();
       return estaLogado() ? '/tabs/home' : '/login';
     }

    
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/home",
      },

      {
        path: "home",
        name: "Home",
        component: HomePage,
        meta: { requiresAuth: true },
      },
      {
        path: "collection",
        name: "Collection",
        component: CollectionPage,
        meta: { requiresAuth: true },
      },
      {
        path: "profile",
        name: "Profile",
        component: ProfilePage,
        meta: { requiresAuth: true },
      },
      {
        path: "contact",
        name: "ContatoForm",
        component: ContatoForm,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
   {
        path: "/reset-password",
        name: "ResetPassword",
        component: ResetPasswordPage,
      },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guard de autenticação
router.beforeEach((to, from, next) => {
  const { estaLogado, carregarUsuarioSalvo } = useAuth();

  carregarUsuarioSalvo();

  if (to.meta.requiresAuth && !estaLogado()) {
    next("/login");
  } else if (
    (to.path === "/login" ||
      to.path === "/register" ||
      to.path === "/reset-password") &&
    estaLogado()
  ) {
    next("/tabs/home");
  } else {
    next();
  }
});

export default router;
