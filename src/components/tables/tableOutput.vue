<template>
    <div class="sheet-container">
        <div class="sheet-inner">
            <div class="controls-container">
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
                    <th></th>
                    <th v-for="colHeader in colHeaders">{{colHeader}}</th>
                </tr>
                <tr v-for="rowHeader in rowHeaders">
                    <th>{{rowHeader}}</th>
                    <td v-for="_ in colHeaders"></td>
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
                    width: 320px - ($gutter * 4);
                    height: 320px - ($gutter * 4);
                    border-collapse: collapse;
                    table-layout: fixed;
                    td, th {
                        font-size: 0.8rem;
                        text-align: center;
                        vertical-align: middle;
                        border: 1px solid $text;
                    }
                }
            }
        }
    }
    @media screen and (min-width: 540px){
        .sheet-container{
            .sheet-inner{
                table{
                    width: 540px - ($gutter * 4);
                    height: 540px - ($gutter * 4);
                    td, th{
                        font-size: 1rem;
                    }
                }
            }
        }
    }
     @media screen and (min-width: 720px){
        .sheet-container{
            .sheet-inner{
                table{
                    width: 640px - ($gutter * 2);
                    height: 640px - ($gutter * 2);
                    td, th{
                        font-size: 1.3rem;
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
            height: $printSz;
            border-collapse: collapse;
            table-layout: fixed;
            td, th {
                text-align: center;
                font-size: 1.4rem;
                vertical-align: middle;
                font-weight: 300;
                border: 1px solid $text;
            }
        }
    }
</style>
