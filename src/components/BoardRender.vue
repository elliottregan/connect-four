<template>
    <article class="board">
      <svg :id="`boardId-${this._uid}`" viewBox="0 0 120 120"></svg>
    </article>
</template>

<script>
import Snap from 'snapsvg';
import BoardBus from '@/services/BoardBus.js';

export default {
  data() {
    return {
      chipsAdded: [],
      colors: [
        '#915c83',
        '#5d8aa8',
      ],
      chipSlotRadius: 8,
      chipSlotPadding: 4,
      chipRadius: 6,
    }
  },
  computed: {
    cellSize: function() {
      return 2*this.chipSlotRadius + this.chipSlotPadding;
    },
  },
  props: ['board'],
  mounted: function() {
    // Unique ID for Vue Component.
    this.drawTarget = Snap(`#boardId-${this._uid}`);
    
    // Draw the inital empty board (a grid of circles representing empty chip slots)
    this.board.forEach((row, x) => {
      row.forEach((col, y) => {
        this.drawEmptyCell(x, y);
      });
    });

    // ************************* //
    // Register Event listeners:
    // ************************* //

    BoardBus.$on('chip-added', newChip => {
      // Keep track of all created chips so they can be removed later.
      this.chipsAdded.push(this.drawChip(newChip.column, newChip.row, this.colors[newChip.playerId-1]));
    });

    BoardBus.$on('reset-board', () => {
      // Remove al the chips on the board.
      this.chipsAdded.forEach( chip => chip.remove());
      // Now that we've removed all the chips from the view, reset the list of added chips. This doesn't affect the game; ony for cleanup.
      this.chipsAdded = [];
    });

  },
  methods: {
    // Draws an enpty cell that will hod a chip.
    drawEmptyCell(row, column) {
      const coord = this.cellCenter(row, column);
      return this.drawTarget.circle(coord.x, coord.y, this.chipSlotRadius);
    },
    // Draws a new chip on the board.
    drawChip(row, column, color) {
      const coord = this.cellCenter(row, column);
      return this.drawTarget.circle(coord.x, coord.y, 0)
      .attr({
        fill: color || '#e32636',
      })
      .animate({
        r: this.chipRadius,
      }, 300);
    },
    cellCenter: function(row, column) {
      // Given a Row and Column, returns the coorindates for the center of a cell.
      // This is used as the center of the circles. 
      return {
        x: this.cellSize*row + this.chipSlotRadius + this.chipSlotPadding/2,
        y: this.cellSize*column + this.chipSlotRadius + this.chipSlotPadding/2,
      };
    },
  }
}
</script>

<style scoped>

  .board {
    background-color: #444;
    padding: 8px 8px 0;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
  }

</style>
