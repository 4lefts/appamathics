<template>
  <div>
    <top
      v-bind:title="title"
      v-bind:show-settings="showSettings"
      v-bind:show-about="showAbout"
      v-on:toggleSettings="showSettings = !showSettings"
      v-on:toggleAbout="showAbout = !showAbout"
    ></top> 
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
    v-bind:rowHeaders="rowHeaders"
    v-on:re-init="generateHeaders(choicesStates)">
    </tableOutput>
  </div>
</template>

<script>
import top from '../top.vue'
import tablesChooser from './tablesChooser.vue'
import tableOutput from './tableOutput.vue'

export default {
  name: 'app',
  data: function() {
    return {
      title: 'Times Tables',
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
      let colChoices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      for(let i = 12; i > 0; i--){
        let x = Math.floor(Math.random() * colChoices.length)
        this.colHeaders.push(colChoices[x])
        colChoices.splice(x, 1)
      }
      let rowChoices = Object.keys(choices).filter(val => choices[val])
      let n = rowChoices.length
      for (let i = 0; i < n; i++){
        let y = Math.floor(Math.random() * rowChoices.length)
        this.rowHeaders.push(rowChoices[y])
        rowChoices.splice(y, 1)
      }
    }
  },
  created: function(){
    this.generateHeaders(this.choicesStates)
  },
  components: {
    top,
    tablesChooser,
    tableOutput,
  }
}
</script>

<style lang="scss" scoped>
  @import '../../base.scss';
  @media print{
    .about-info, .chooser-container{
      display: none;
    }
  }
</style>