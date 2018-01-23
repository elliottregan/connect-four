<template>
  <div>
    <!-- <pre>
      <span v-for="(row, index) in board" :key="index">
        <span v-for="(col, index) in row" :key="index">{{col}}</span>
      </span>
    </pre> -->
    <svg id="drawTarget" viewBox="0 0 120 120"></svg>
    <h1>asdf</h1>
    <svg id="green-dot">
          <defs>
              <linearGradient x1="17.2257626%" y1="9.16257513%" x2="74.3112393%" y2="70.9112549%" id="linearGradient-1">
                  <stop stop-color="#B4EC51" offset="0%"></stop>
                  <stop stop-color="#429321" offset="100%"></stop>
              </linearGradient>
              <circle id="path-2" cx="54.5" cy="52.5" r="42.5"></circle>
              <filter x="-22.4%" y="-20.0%" width="144.7%" height="144.7%" filterUnits="objectBoundingBox" id="filter-3">
                  <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                  <feGaussianBlur stdDeviation="6" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                  <feColorMatrix values="0 0 0 0 0.705768287   0 0 0 0 0.925881565   0 0 0 0 0.314575374  0 0 0 0.392776268 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
              </filter>
              <filter x="-17.1%" y="-14.7%" width="134.1%" height="134.1%" filterUnits="objectBoundingBox" id="filter-4">
                  <feMorphology radius="1" operator="erode" in="SourceAlpha" result="shadowSpreadInner1"></feMorphology>
                  <feGaussianBlur stdDeviation="2" in="shadowSpreadInner1" result="shadowBlurInner1"></feGaussianBlur>
                  <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
            <feColorMatrix values="0 0 0 0 0.634725809   0 0 0 0 0.866544545   0 0 0 0 0.283198297  0 0 0 0.596948596 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
        </filter>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Oval-Copy-4">
            <use fill="black" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-2"></use>
            <use fill="url(#linearGradient-1)" fill-rule="evenodd" xlink:href="#path-2"></use>
            <use fill="black" fill-opacity="1" filter="url(#filter-4)" xlink:href="#path-2"></use>
        </g>
    </g>
    </svg>
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
      this.drawChip(newVal[newVal.length-1].column, newVal[newVal.length-1].row, this.colors[newVal[newVal.length-1].playerId-1])
    }
  },
  mounted: function() {
    this.drawTarget = Snap("#drawTarget");
    this.greenDot = Snap('#green-dot').clone();
    
    this.board.forEach((row, x) => {
      row.forEach((col, y) => {
        this.drawCircle(x, y);
      });
    });
    
  },
  methods: {
    drawCircle(row, column) {
      const circleRadius = 10;
      return this.drawTarget.circle(2*circleRadius*row + circleRadius, 2*circleRadius*column +circleRadius, circleRadius);
    },
    drawChip(row, column, color) {
      const circleRadius = 10;
      const chipRadius = 9;
      return this.drawTarget.circle(2*circleRadius*row + circleRadius, 2*circleRadius*column + circleRadius, 0)
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

</style>
