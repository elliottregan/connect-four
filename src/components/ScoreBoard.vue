<script>
export default {
  props: ['players', 'current-turn'],
};
</script>

<template>

  <div class="legend">
    <ul class="player-list">
      <li v-for="p in players" v-bind:class="{'current-turn': (currentTurn === p.playerId)}" class="player-list-item">
        <span class="color-swatch" v-bind:class="{'current-turn': (currentTurn === p.playerId)}" v-bind:style="{backgroundColor: p.color}"></span>
        <span class="player-name">
          <span>Player {{p.playerId}}</span>
        </span>
      </li>
    </ul>
  </div>

</template>

<style lang="scss">

  .legend {
    display: flex;
    align-items: center;
  }

  .player-list {
    list-style: none;
    margin: 1em auto;
    padding: 0;
    width: auto;

    .player-list-item {
      display: inline-block;
      margin: 0 auto;

      display: grid;
      grid-gap: .5em;
      grid-template-areas: 'swatch name';
      align-items: center;
      justify-content: left;
    }
  }

  .color-swatch {
    width: 1em;
    height: 1em;
    background-color: #fff;
    display: inline-block;
    border-radius: 50%;
    transition: transform 200ms ease;
  }

  .player-name {
    font-size: 1.4em;
    text-align: left;
    display: inline-block;
  }

  .current-turn {

    .color-swatch {
      transform: scale(1.2)
    }

    .player-name {
      font-weight: bold;
    }

  }

</style>
