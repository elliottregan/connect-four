import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ConnectFour from '@/components/ConnectFour.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'ConnectFour',
      component: ConnectFour,
      props: {
      	totalPlayers: 2,
      }
    }
  ]
});
