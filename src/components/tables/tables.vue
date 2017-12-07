<template>
  <div>
    <header>
      <div class="button-group">
        <router-link to="/"><img src="../../assets/icons/arrow_back_dark.svg" alt="back to home page"></router-link>
        <h1>Tables Challenge</h1>
      </div>
      <div class="button-group">
        <button v-on:click="toggleSettings">
          <img v-if="showSettings" src="../../assets/icons/close.svg" alt="close settings button">
          <img v-else src="../../assets/icons/settings.svg" alt="show settings button">
        </button>
        <button v-on:click="toggleAbout">
          <img v-if="showAbout" src="../../assets/icons/close.svg" alt="close about button">
          <span v-else>?</span>
        </button>
      </div>
    </header>
    <div class="info-boxes-container">
      <transition name="slide">
        <div v-if="showAbout" class="about-info">
          <h3>Generate Times Tables Practise Sheets</h3>
          <p>Use the settings section to select the times tables you want students to practise and click print to generate a printable worksheet. We normally set a 5 minute timer and see how many each person can do, then they can record this score (or the their time, or both) to try to improve on it next time.</p>
        </div>
      </transition>
      <transition name="slide">
        <tablesChooser
        v-on:toggleNumber="toggleNumber" 
        v-bind:numbers="choicesStates"
        v-if="showSettings">
        </tablesChooser>
      </transition>
    </div>
    <tableOutput
    v-bind:colHeaders="colHeaders"
    v-bind:rowHeaders="rowHeaders">
    </tableOutput>
  </div>
</template>

<script>
import tablesChooser from './tablesChooser.vue'
import tableOutput from './tableOutput.vue'

export default {
  name: 'app',
  data: function() {
    return {
      choicesStates: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: false,
        12: false,
      },
        colHeaders: [],
        rowHeaders: [],
        showAbout: false,
        showSettings: false,
    }
  },
  methods: {
    toggleNumber: function(number, state){
        this.choicesStates[number] = !state
        this.generateHeaders(this.choicesStates)
    },
    generateHeaders: function(choices){
      this.colHeaders = []
      this.rowHeaders = []
      let colChoices = Object.keys(choices).filter(val => choices[val])
      let rowChoices = colChoices.slice()
      const n = colChoices.length
      for (let i = 0; i < n; i++){
        let x = Math.floor(Math.random() * colChoices.length)
        let y = Math.floor(Math.random() * colChoices.length)
        this.colHeaders.push(colChoices[x])
        this.rowHeaders.push(rowChoices[y])
        colChoices.splice(x, 1)
        rowChoices.splice(y, 1)
      }
    },
    toggleAbout: function(){
        this.showAbout = !this.showAbout
    },
    toggleSettings: function(){
      this.showSettings = !this.showSettings
    }
  },
  created: function(){
    this.generateHeaders(this.choicesStates)
  },
  components: {
    tablesChooser,
    tableOutput,
  }
}
</script>

<style lang="scss">
  @import '../../base.scss';
  @media print{
    .about-info, .chooser-container{
      display: none;
    }
  }
</style>