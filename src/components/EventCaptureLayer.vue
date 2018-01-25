<script>
import BoardBus from '@/services/BoardBus.js';

export default {
  props: ['board', 'click-column'],
};

</script>

<template>

  <div class="button-wrapper">
    <button v-for="(col, i) in board" v-bind:key="i" @click="clickColumn(i)" class="column-button"></button>
  </div>

</template>

<style lang="scss">

  .button-wrapper {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 8px 8px;


    .column-button {
      flex: 1 0 auto;
      box-sizing: border-box;
      border: 0;
      margin: 0;
      background: transparent;
      position: relative;

      &::after {
        display: block;
        content: '';
        bottom: -2px;
        right: -2px;
        top: -2px;
        left: -2px;
        border-radius: 5px;
        position: absolute;
        border: 4px solid #fff;
        transform: scale(.95);
        opacity: 0;
        background-color: transparentize(#fff, .9);
        transition: all 500ms ease-in-out;
      }

      &:hover {
        z-index: 2;

        &::after {
          transition: all 100ms ease-in-out;
          transform: scale(1);
          opacity: 1;
        }
      }
    }
  }

</style>
