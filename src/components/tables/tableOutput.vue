<template>
    <div class="sheet-container">
        <div class="sheet-inner">
            <div class="controls-container">
                <button id="re-init-button" v-on:click="$emit('re-init')"><img src="../../assets/icons/refresh.svg" alt="re-initialize button"></button>
                <printButton></printButton>
            </div>
            <div class="sheet-header">
                <h2>Target from last time:</h2>
                <div class="score-boxes">
                    <div>Time:</div>
                    <div>Score:</div>
                </div>
            </div>
            <table>
                <tr>
                    <td><div class="content">&times;</div></td>
                    <td 
                        v-for="colHeader in colHeaders"
                        v-bind:key="colHeader">
                            <div class="content">{{colHeader}}</div>
                        </td>
                </tr>
                <tr 
                    v-for="rowHeader in rowHeaders"
                    v-bind:key="rowHeader">
                        <td>
                            <div class="content">{{rowHeader}}</div>
                        </td>
                    <td 
                        v-for="colHeader in colHeaders"
                        v-bind:key="colHeader">
                        <div class="content"></div>
                    </td>
                </tr>
            </table>
            <div class="sheet-footer">
                <h2>Results:</h2>
                <div class="score-boxes">
                    <div>Time:</div>
                    <div>Score:</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import printButton from "../general/printButton.vue";
export default {
   props: ['colHeaders', 'rowHeaders'],
   components: {
       printButton,
   }
}
</script>

<style lang="scss" scoped>
    @import '../../base.scss';
    @media screen{   
        .sheet-container{
            #re-init-button{
                @include icon-button(50px, $accent);
                margin-right: $gutter;
            }
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
                }
                .score-boxes{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    div{
                        width: 48%;
                        padding-bottom: 10px;
                        border-bottom: 1px solid $text;
                    }
                }
                table {
                    margin: 30px auto;
                    box-sizing: border-box;
                    width: 100%;
                    border-collapse: collapse;
                    table-layout: fixed;
                    td{
                        width: 7.69230769231%;
                        position: relative;
                        font-size: calc(1vmin + 0.4rem);
                        text-align: center;
                        vertical-align: middle;
                        border: 1px solid $text;
                        &:after{
                            content: '';
                            display: block;
                            margin-top: 100%;
                        }
                        .content{
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }
            }
        }
    }
    @media print{
        $printSz: 17cm;
        .controls-container{
            display: none;
        }
        .sheet-container{
            width: $printSz;
            margin: auto;
            .score-boxes{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                div{
                    width: 48%;
                    padding-bottom: 10px;
                    border-bottom: 1px solid $text;
                }
            }
        }
        table {
            margin: 30px 0;
            box-sizing: border-box;
            width: $printSz;
            border-collapse: collapse;
            table-layout: fixed;
            td{
                width: 7.69230769231%;
                position: relative;
                font-size: calc(1vmin + 0.4rem);
                text-align: center;
                vertical-align: middle;
                border: 1px solid $text;
                &:after{
                    content: '';
                    display: block;
                    margin-top: 100%;
                }
                .content{
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
</style>
