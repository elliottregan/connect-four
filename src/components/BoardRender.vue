<template>
  <div>
    <!-- <pre>
      <span v-for="(row, index) in board" :key="index">
        <span v-for="(col, index) in row" :key="index">{{col}}</span>
      </span>
    </pre> -->
    <article class="board">
      <svg id="drawTarget" viewBox="0 0 120 120"></svg>
    </article>
  </div>
</template>

<script>
import Snap from 'snapsvg';

export default {
  data() {
    return {
      chipsAdded: [],
      colors: [
        '#915c83',
        '#5d8aa8',
      ],
    }
  },
  props: ['board', 'chips'],
  watch: {
    chips: function(newVal) {
      // If a new chip was added, draw it.
      // Save the drawn chip so it can be removed later.
      if (newVal[newVal.length-1]) {
        this.chipsAdded.push(this.drawChip(newVal[newVal.length-1].column, newVal[newVal.length-1].row, this.colors[newVal[newVal.length-1].playerId-1]));
      }
      // Otherwise, remove all the chips
      else {
        this.chipsAdded.forEach( chip => {
          chip.remove();
        })
        this.chipsAdded = [];
      }
    }
  },
  mounted: function() {
    this.drawTarget = Snap("#drawTarget");
    
    this.board.forEach((row, x) => {
      row.forEach((col, y) => {
        this.drawCircle(x, y);
      });
    });
    
  },
  methods: {
    drawCircle(row, column) {
      const circleRadius = 8;
      const padding = 4;
      const cellSize = 2*circleRadius + padding
      return this.drawTarget.circle(cellSize*row + circleRadius + padding/2, cellSize*column +circleRadius + padding/2, circleRadius);
    },
    drawChip(row, column, color) {
      const circleRadius = 8;
      const padding = 4;
      const chipRadius = 6;
      const cellSize = 2*circleRadius + padding
      return this.drawTarget.circle(cellSize*row + circleRadius + padding/2, cellSize*column + circleRadius + padding/2, 0)
      .attr({
        fill: color || '#e32636',
      })
      .animate({
        r: chipRadius
      }, 300);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .board {
    background-color: #444;
    padding: 8px 8px 0;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
  }

</style>
