<template>
  <header>
        <div class="button-group">
            <router-link to="/"><img src="../assets/icons/arrow_back_dark.svg" alt="back to home page"></router-link>
            <h1>{{title}}</h1>
        </div>
        <div class="button-group">
            <button v-on:click="toggleSettings">
            <img v-if="showSettings" src="../assets/icons/close.svg" alt="close settings button">
            <img v-else src="../assets/icons/settings.svg" alt="show settings button">
            </button>
            <button v-on:click="toggleAbout">
            <img v-if="showAbout" src="../assets/icons/close.svg" alt="close about button">
            <span v-else>?</span>
            </button>
            </div>
    </header>
</template>

<script>
export default {
    props: ['showSettings', 'showAbout', 'title'],
    methods:{
        toggleSettings: function(){
            this.$emit('toggleSettings')
        },
        toggleAbout: function(){
            this.$emit('toggleAbout')
        }
    }
}
</script>

<style lang="scss">
@import '../base.scss';
</style>
