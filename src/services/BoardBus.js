import Vue from 'vue';

// Lightweight component that is decoupled from the DOM and the rest of the app.
// We wil use BoardBus.$emit() and BoardBus.$on to send data 
// between the game and the renderer component(s).
const BoardBus = new Vue();
export default BoardBus;