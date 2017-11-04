<template>
    <div class="sheet-container">
        <printButton></printButton>
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
</template>

<script>
import printButton from "./printButton.vue";
export default {
   props: ['colHeaders', 'rowHeaders'],
   components: {
       printButton,
   }
}
</script>

<style lang="scss">
    @import '../../base.scss';
    @media screen{   
        .sheet-container{
            @include card(1);
            @include container();
            margin-top: $gutter;
            box-sizing: border-box;
            padding: $gutter;
            background-color: #ffffff;
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
                margin: 30px 0;
                box-sizing: border-box;
                width: 640px - ($gutter * 2);
                height: 640px - ($gutter * 2);
                border-collapse: collapse;
                table-layout: fixed;
                td, th {
                    text-align: center;
                    vertical-align: middle;
                    border: 1px solid $text;
                }
            }
        }
    }
    @media print{
        $printSz: 17cm;
        button{
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
                font-size: 1.4em;
                vertical-align: middle;
                font-weight: 300;
                border: 1px solid $text;
            }
        }
    }
</style>
