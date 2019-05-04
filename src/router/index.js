import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/authRedirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "dashboard",
    meta: { roles: ["admin", "editor"] },
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "dashboard",
          noCache: true,
          affix: true,
          roles: ["admin", "editor"]
        }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 杂志管理
  {
    path: "/journal",
    component: Layout,
    redirect: "dashboard",
    meta: { roles: ["admin", "editor"] },
    children: [
      {
        path: "/journalDetail",
        component: () => import("@/views/journalDetail/index"),
        name: "JournalDetail",
        meta: {
          title: "journalDetail",
          icon: "table",
          noCache: true,
          roles: ["admin", "editor"]
        }
      }
    ]
  },
  // 杂志类型管理
  {
    path: "/type",
    component: Layout,
    redirect: "dashboard",
    meta: { roles: ["admin", "editor"] },
    children: [
      {
        path: "/journalType",
        component: () => import("@/views/journalType/index"),
        name: "JournalType",
        meta: {
          title: "journalType",
          icon: "table",
          noCache: true,
          roles: ["admin", "editor"]
        }
      }
    ]
  },
  // 杂志书展管理
  {
    path: "/fair",
    component: Layout,
    redirect: "dashboard",
    meta: { roles: ["admin", "editor"] },
    children: [
      {
        path: "/journalFair",
        component: () => import("@/views/journalFair/index"),
        name: "JournalFair",
        meta: {
          title: "journalFair",
          icon: "table",
          noCache: true,
          roles: ["admin", "editor"]
        }
      }
    ]
  },
  //轮播图管理
  {
    path: "/slide",
    component: Layout,
    redirect: "dashboard",
    meta: { roles: ["admin", "editor"] },
    children: [
      {
        path: "/slideShow",
        component: () => import("@/views/slideShow/index"),
        name: "SlideShow",
        meta: {
          title: "slideShow",
          icon: "table",
          noCache: true,
          roles: ["admin", "editor"]
        }
      }
    ]
  },
  //用户管理
  {
    path: "/user",
    component: Layout,
    redirect: "dashboard",
    meta: { roles: ["admin", "editor"] },
    children: [
      {
        path: "/userManage",
        component: () => import("@/views/userManage/index"),
        name: "UserManage",
        meta: {
          title: "userManage",
          icon: "user",
          noCache: true,
          roles: ["admin", "editor"]
        }
      }
    ]
  },
  //借阅管理
  {
    path: "/borrow",
    component: Layout,
    redirect: "dashboard",
    meta: { roles: ["admin", "editor"] },
    children: [
      {
        path: "/journalBorrow",
        component: () => import("@/views/journalBorrow/index"),
        name: "JournalBorrow",
        meta: {
          title: "journalBorrow",
          icon: "user",
          noCache: true,
          roles: ["admin", "editor"]
        }
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
