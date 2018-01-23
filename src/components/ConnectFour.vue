<template>
  <div>
    <button @click="addChip(currentTurn, 0)">Add Chip</button>
    <button @click="addChip(currentTurn, 1)">Add Chip</button>
    <button @click="addChip(currentTurn, 2)">Add Chip</button>
    <button @click="addChip(currentTurn, 3)">Add Chip</button>
    <button @click="addChip(currentTurn, 4)">Add Chip</button>
    <button @click="addChip(currentTurn, 5)">Add Chip</button>
    
    <board-render :board="board" :chips="chips"></board-render>
    
    <pre><strong>Has Won:</strong> *{{hasWon}}*</pre>
    <pre><strong>Total Turns: </strong>{{totalTurns}}</pre>

    </div>
</template>

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
      return this.checkForWin_ANY(this.board, this.lengthToWin);
    },
    currentTurn: function() {
      console.log(this.totalTurns, this.totalPlayers)
      return this.totalTurns % this.totalPlayers + 1;
    }
  },
  methods: {
    addChip(playerId, column) {
      if  (this.hasWon) {
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
  created() {
  }
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
  console.log('checking for win...')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
