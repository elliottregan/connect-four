<script>
import Vue from 'vue';
import BoardRender from '@/components/BoardRender.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';
import EventCapture from '@/components/EventCaptureLayer.vue';
import BoardBus from '@/services/BoardBus.js';
import GameLogic from '@/services/gameLogicSvc.js';

export default {
  components: {
    BoardRender,
    ScoreBoard,
    EventCapture,
  },
  props: ['total-players', 'colors', 'board-size', 'length-to-win'],
  data() {
    return {
      board: [],
      totalTurns: 0,
      playerColors: [],
      players: [],
    }
  },
  computed: {
    hasWon: function() {
      return this.checkForWin_ANY(this.board, this.lengthToWin) || false;
    },
    currentTurn: function() {
      return this.totalTurns % this.totalPlayers + 1;
    },
  },
  created: function() {
    // Create the board
    console.log(this.boardSize)
    this.board = new Array(this.boardSize).fill().map(() => new Array(this.boardSize).fill().map(() => 0));
    console.log(this.board)
    
    // Shuffle all the possible colors, then drop the colors not needed.
    // This gives you a random color for each player.
    this.playerColors = this.colors.sort(() => .5 - Math.random()).slice(0,this.totalPlayers);

    // Create an array of players.
    this.players = [...this.createUsers(this.totalPlayers, this.colors)];
  },
  methods: {

    // Resets the board and total turns back to the inital conditions.
    // $emits event to tell other components reset as well.
    resetGame() {
      this.board = new Array(this.boardBize).fill().map(() => new Array(this.boardBize).fill().map(() => 0));
      this.totalTurns = 0;
      BoardBus.$emit('reset-board');
    },

    // Given a column index, adds a chip to the first row it can,
    // starting with the highest row index and working back to 0.
    // $emits event to tell other components a new chip has been added.
    addChip(column) {
      const columnIsFull = this.board[0][column];
      if (this.hasWon || columnIsFull) {
        return;
      }

      // Starting from the bottom of the board, 
      // check each row to see if the chosen column has a chip.
      // Add a new chip to the first row that doesn't already have a chip in it.
      for (let row = this.board.length - 1; row >= 0; row--) {
        if (this.board[row][column] === 0) {

          const addedChip = {
            row,
            column,
            playerId: this.currentTurn,
          }

          // Since this.board is an array, we need to trigger a state update
          // https://vuejs.org/v2/guide/list.html#Caveats 
          Vue.set(this.board[row], column, this.currentTurn);

          // Let other components know that a new chip has been added
          BoardBus.$emit('chip-added', addedChip);
          
          // After finding the location to place the chip, break the loop.
          this.totalTurns++;
          return;
        }
      };
    },
    checkForWin_Vert: GameLogic.checkForWin_Vert,
    checkForWin_Hori: GameLogic.checkForWin_Hori,
    checkForWin_RUp: GameLogic.checkForWin_RUp,
    checkForWin_RDown: GameLogic.checkForWin_RDown,
    checkForWin_ANY: GameLogic.checkForWin_ANY,
    createUsers: function* createUsers(n, colors) {
      for (let i of Array(n).keys()) {
        yield {
          playerId: i + 1,
          color: this.playerColors[i],
        };
      }
    },
  },
};

</script>

<template>
  <div>

    <h1>Connect[{{lengthToWin}}]</h1>

    <div class="board-container">
      <event-capture :board="board" :click-column="addChip"></event-capture>
      <board-render :board="board" :colors="playerColors"></board-render>
    </div>

    <score-board :players="players" :current-turn="currentTurn"></score-board>

    <article class="message-wrapper" v-if="hasWon">
      <div class="message-box">
        <h1 :v-if="hasWon">Player {{hasWon.playerId}} has won!</h1>
        <button @click="resetGame()" class=" btn reset-button">Play Again?</button>
      </div>
    </article>

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
    z-index: 10;

    .message-box {
      background-color: #fff;
      padding: 1.2rem 4rem;
      border: 4px solid #000;
      border-radius: 10px;
      box-shadow: 0 0 20px 20px transparentize(#000, .5);
    }

    .btn {
      font-size: 1.1em;
      font-weight: bold;
      background-color: #fff;
      border: 4px solid currentColor;
      border-radius: 8px;
      padding: .5em 1em;
      transition: transform 300ms ease;

      &:hover, &:focus {
        transform: scale(1.05);
        opacity: .8;
      }
    }
  }

  .board-container {
    position: relative;
    max-width: 400px;
    margin: auto;
  }

</style>
