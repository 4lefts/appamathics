<template>
  <div>
    <header>
      <div>
        <h1>Appamathics</h1>
      </div>
      <div class="button-group">
        <button v-on:click="toggleAbout">
          <img v-if="showAbout" src="../assets/icons/close.svg" alt="close about button">
          <span v-else>?</span>
        </button>
      </div>
    </header>
    <transition name="slide">
      <div v-if="showAbout" class="about-info">
        <h3>Simple Apps for Classrooms</h3>
        <p>Appamathics is a growing collection of web apps that are hopefully useful in primary school classrooms. They are not designed to fit a specific purpose; they're just things that I've found useful. Each one has a help page that tries to suggest some possible uses for the app. If you have ideas for apps you'd like to see here, or ways the apps or the site could be improved, please get in touch.</p>
        <p>Thanks,<br>Stephen Ball,<br>{{getDate}}</p>
      </div>
    </transition>
    <div id="search-container">
      <img id="search-icon" src="../assets/icons/search_dark_36.svg" alt="search icon">
      <input id="search" type="text" v-model="search" placeholder="search">
    </div>
    <div class="card-grid">
        <router-link v-for="app in filteredAppList" :key="app.path" v-bind:to="app.path">
          <h3>{{app.name}}</h3>
          <p>{{app.description}}</p>
        </router-link>
    </div>
  </div>
</template>

<script>
import appList from '../appList'
export default {
  name: 'home',
  data () {
    return {
      showAbout: false,
      appList: appList,
      search: '',
    }
  },
  computed: {
    getDate: function(){
      const d = new Date()
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      return `${months[d.getMonth()]}, ${d.getFullYear()}`
    },
    filteredAppList: function(){
      return this.appList
            .filter(app => {
              return app.name
                        .toLowerCase()
                        .includes(this.search.toLowerCase())
            })
            .sort((a, b) => {
              const nameA = a.name.toUpperCase()
              const nameB = b.name.toUpperCase()
              if(nameA < nameB){
                return -1
              }
              if(nameA > nameB){
                return 1
              }
              //names are the same - this should never happen
              return 0
            })
    }
  },
  methods: {
    toggleAbout: function(){
      this.showAbout = !this.showAbout
    }
  }
}
</script>

<style lang="scss">
@import '../base.scss';

#search-container{
  box-sizing: border-box;
  @include card(1);
  padding: $gutter;
  position: relative;
  width: 400px;
  margin: 50px auto 10px auto;
  display: flex;
  align-items: center;
 #search-icon{
    position: absolute;
  }
  #search{
    padding-left: 48px;
  }
}

.card-grid{
  margin: $gutter;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: space-around;
  a{
    text-decoration: none;
    color: $text;
    width: 100%;
    margin: $gutter 0;
    box-sizing: border-box;
    border-radius: 2px;
    @include card(1);
    transition: all 0.3s ease;
    &:focus{
      outline: none;
      color: $primary;
    }
      h3{
        margin: 0;
        box-sizing: border-box;
        padding: 1.3rem $gutter 0.8rem $gutter;
        width: 100%;
        border-bottom: 1px solid $primary;
      }
      p{
        padding: 0.4rem $gutter;
        font-size: 0.9rem;
      }
      &:hover{
        @include card(3);
        a{
          color: $primary;
        }
      }
    
  }
}
</style>
