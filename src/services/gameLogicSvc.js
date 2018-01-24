export default {
  checkForWin_Vert,
  checkForWin_Hori,
  checkForWin_RUp,
  checkForWin_RDown,
  checkForWin_ANY,
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