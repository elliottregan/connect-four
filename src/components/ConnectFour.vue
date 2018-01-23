<script>
import Vue from 'vue';
import BoardRender from '@/components/BoardRender.vue';

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
      chips: [],
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
      this.chips = [];
      this.totalTurns = 0;
    },
    addChip(playerId, column) {
      if (this.hasWon) {
        return;
      }
      this.totalTurns++;
      for (let row = this.board.length - 1; row >= 0; row--) {
        if (this.board[row][column] === 0) {
          // Since this.board is an array, we need to trigger a state update
          // https://vuejs.org/v2/guide/list.html#Caveats 
          Vue.set(this.board[row], column, playerId);
          this.chips.push({
            row,
            column,
            playerId,
          });
          return;
        }
      };
    },
    checkForWin_Vert,
    checkForWin_Hori,
    checkForWin_RUp,
    checkForWin_RDown,
    checkForWin_ANY,
  },
}


/* Check for VERTICAL win */
function checkForWin_Vert(board, lengthToWin) {
  for (let row = 0; row <= (board.length - lengthToWin); row++) {
    for (let col = 0; col < board[row].length; col++) {

      const streak = board[row][col] !== 0 &&
            (board[row][col] === board[row + 1][col] &&
             board[row][col] === board[row + 2][col] &&
             board[row][col] === board[row + 3][col]);

      if (streak) {
        // return the id of player with streak
        return board[row][col];
      }

    }
  }
}

/* Check for HORIZONTAL win */
function checkForWin_Hori(board, lengthToWin) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col <= (board[row].length - lengthToWin); col++) {

      const streak = board[row][col] !== 0 &&
            (board[row][col] === board[row][col + 1] &&
             board[row][col] === board[row][col + 2] &&
             board[row][col] === board[row][col + 3]);

      if (streak) {
        // return the id of player with streak
        return board[row][col];
      }

    }
  }
}

/* Check for RIGHT DOWN win */
function checkForWin_RDown(board, lengthToWin) {
  for (let row = 0; row < (board.length - lengthToWin); row++) {
    for (let col = 0; col < (board[row].length - lengthToWin + 1); col++) {

      const streak = board[row][col] !== 0 &&
            (board[row][col] === board[row + 1][col + 1] &&
             board[row][col] === board[row + 2][col + 2] &&
             board[row][col] === board[row + 3][col + 3]);

      if (streak) {
        // return the id of player with streak
        return board[row][col];
      }

    }
  }
}


/* Check for RIGHT UP win */
function checkForWin_RUp(board, lengthToWin) {
  for (let row = lengthToWin - 1; row < board.length; row++) {
    for (let col = 0; col < (board.length - lengthToWin + 1); col++) {

      const streak = board[row][col] !== 0 &&
            (board[row][col] === board[row - 1][col + 1] &&
             board[row][col] === board[row - 2][col + 2] &&
             board[row][col] === board[row - 3][col + 3]);

      if (streak) {
        // return the id of player with streak
        return board[row][col];
      }

    }
  }
}

function checkForWin_ANY(board, lengthToWin) {
  const vert = checkForWin_Vert(board, lengthToWin);
  const hori = checkForWin_Hori(board, lengthToWin);
  const rUp = checkForWin_RUp(board, lengthToWin);
  const rDown = checkForWin_RDown(board, lengthToWin);

  if (vert) {
    return {
      playerId: vert,
      type: 'VERTICAL',
    };
  }

  if (hori) {
    return {
      playerId: hori,
      type: 'HORIZONTAL',
    };
  }

  if (rUp) {
    return {
      playerId: rUp,
      type: 'RIGHT_UP',
    };
  }

  if (rDown) {
    return {
      playerId: rDown,
      type: 'RIGHT_DOWN',
    };
  }

}
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
      <board-render :board="board" :chips="chips"></board-render>
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
        border-radius: 500px;
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
