import Layout from '@/layout'
export default [
  // {
  // 	path: '/404',
  // 	component: () => import('@/views/404'),
  // 	hidden: true
  // },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'test',
        component: () => import('@/views/test'),
        meta: {
          title: '测试',
        },
      },
    ],
  },
  {
    path: '/login',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import('@/views/login'),
        meta: {
          hideNav: true,
          title: '登录',
        },
      },
    ],
  },
]
