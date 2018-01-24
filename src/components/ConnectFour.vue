<script>
import Vue from 'vue';
import BoardRender from '@/components/BoardRender.vue';
import BoardBus from '@/services/BoardBus.js';
import GameLogic from '@/services/gameLogicSvc.js';

export default {
  components: {
    BoardRender
  },
  props: ['total-players'],
  data() {
    return {
      lengthToWin: 4,
      board: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
      totalTurns: 0,
    }
  },
  computed: {
    hasWon: function() {
      return this.checkForWin_ANY(this.board, this.lengthToWin) || false;
    },
    currentTurn: function() {
      return this.totalTurns % this.totalPlayers + 1;
    }
  },
  methods: {
    resetGame() {
      this.board = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];
      this.totalTurns = 0;
      BoardBus.$emit('reset-board');
    },
    addChip(playerId, column) {
      if (this.hasWon) {
        return;
      }
      this.totalTurns++;

      // Starting from the bottom of the board, 
      // check each row to see if the chosen column has a chip.
      // Add a new chip to the first row that doesn't already have a chip in it.
      for (let row = this.board.length - 1; row >= 0; row--) {
        if (this.board[row][column] === 0) {

          const addedChip = {
            row,
            column,
            playerId,
          }
          // Since this.board is an array, we need to trigger a state update
          // https://vuejs.org/v2/guide/list.html#Caveats 
          Vue.set(this.board[row], column, playerId);
          BoardBus.$emit('chip-added', addedChip);
          return;
        }
      };
    },
    checkForWin_Vert: GameLogic.checkForWin_Vert,
    checkForWin_Hori: GameLogic.checkForWin_Hori,
    checkForWin_RUp: GameLogic.checkForWin_RUp,
    checkForWin_RDown: GameLogic.checkForWin_RDown,
    checkForWin_ANY: GameLogic.checkForWin_ANY,
  },
};

</script>

<template>
  <div>

    <div class="board-container">
      <div class="button-wrapper">
        <button @click="addChip(currentTurn, 0)" class="column-button"></button>
        <button @click="addChip(currentTurn, 1)" class="column-button"></button>
        <button @click="addChip(currentTurn, 2)" class="column-button"></button>
        <button @click="addChip(currentTurn, 3)" class="column-button"></button>
        <button @click="addChip(currentTurn, 4)" class="column-button"></button>
        <button @click="addChip(currentTurn, 5)" class="column-button"></button>
      </div>
      <board-render :board="board"></board-render>
      <article class="message-wrapper" v-if="hasWon">
        <div class="message-box">
          <h1 :v-if="hasWon">Player {{hasWon.playerId}} has won!</h1>
          <button @click="resetGame()" class="reset-button">Play Again?</button>
        </div>
      </article>
    </div>

  </div>
</template>

<style lang="scss">

  .message-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .message-box {
      background-color: #fff;
      padding: 1.2rem 4rem;
      border: 4px solid #000;
      border-radius: 10px;
    }
  }

  .board-container {
    position: relative;
    max-width: 400px;
    margin: auto;
  }

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
        transform: scale(.9);
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
