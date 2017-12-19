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
                    <h3>Something</h3>
                    <p>Stuff stuff stuff.</p>
                </div>
            </transition>
            <transition name="slide">
                <div class="settings" v-if="showSettings">
                    <h3>Some Settings</h3>
                    <p>Settings stuff etc blah</p>
                </div>
            </transition>
        </div>
        <div>
            <div class="sheet-container">
                <div class="sheet-inner">
                    <div class="controls-container">
                        <button class="reroll-button" v-on:click.prevent="reroll"><img src="../../assets/icons/refresh.svg" alt="re-generate sheet button"></button>
                        <printButton></printButton>
                    </div>
                    <div class="sheet-output">
                        <h2>Fluency Practice</h2>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import top from '../top.vue'
import printButton from '../general/printButton.vue'
export default {
    components: {
        top,
        printButton,
    },
    data: function(){
        return {
            title: 'Fluency Sheets',
            showSettings: false,
            showAbout: false,
        }
    },
    methods: {
        reroll: function(){
            console.log('rerolling!')
        }
    }
}
</script>

<style lang="scss">
    @import '../../base.scss';
    .sheet-container{
        margin: 0 $gutter $gutter $gutter;
        .sheet-inner{
            @include container();
            @include card(1);
            box-sizing: border-box;
            padding: $gutter;
            background-color: #ffffff;
            .controls-container{
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                button{
                    margin-right: $gutter;
                    &:last-child{
                        margin: 0;
                    }
                }
            }
        }
    }
    .reroll-button{
        @include icon-button(50px, $accent);
    }
</style>
