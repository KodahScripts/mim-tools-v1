import { createRouter, createWebHistory } from 'vue-router'

import VwCalculator from '@/pages/VwCalculator.vue'
import UtaUploader from '@/pages/UtaUploader.vue'
import CcUploader from '@/pages/CcUploader.vue'
import EmployeeMatch from '@/pages/EmployeeMatch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/vw-calc',
      name: 'vw-calc',
      component: VwCalculator,
    },
    {
      path: '/uta-upload',
      name: 'uta-upload',
      component: UtaUploader,
    },
    {
      path: '/cc-upload',
      name: 'cc-upload',
      component: CcUploader,
    },
    {
      path: '/emp-match',
      name: 'emp-match',
      component: EmployeeMatch,
    },
  ],
})

export default router
