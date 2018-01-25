import Vue from 'vue'
import Router from 'vue-router'
import ConnectFour from '@/components/ConnectFour.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ConnectFour',
      component: ConnectFour,
      props: {
      	totalPlayers: 2,
        boardSize: 6,
        lengthToWin: 4, 
        colors: [
          '#fbcb44',
          '#f5f5f0',
          '#32517d',
          '#f8214d',
          '#e9795e',
        ],
      }
    }
  ]
});
