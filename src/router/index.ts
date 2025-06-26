import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Leaderboard from '@/views/Leaderboard.vue'

const routes = [
  {
    path: '/isbar-game/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/isbar-game/classify',
    name: 'ClassifyGame',
    component: () => import('@/views/ClassifyGame.vue')
  },
  {
    path: '/isbar-game/choice',
    name: 'ChoiceGame',
    component: () => import('@/views/ChoiceGame.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/isbar-game/'
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () => import('@/views/Leaderboard.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory('/isbar-game/'),
  routes
})
