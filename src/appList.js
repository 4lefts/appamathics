import tables from './components/tables/tables.vue'
import randomNumbers from './components/randomNumbers/randomNumbers.vue'
import timer from './components/timer/timer.vue'
import fluency1 from './components/fluency1/fluency1.vue'
import fluency2 from './components/fluency2/fluency2.vue'
import stopwatch from './components/stopwatch/stopwatch.vue'
import p5test from './components/p5test/p5test.vue'

const appList = [
    {
        name: 'Times Tables',
        description: 'Make times tables challenge sheets',
        path: '/tables',
        component: tables
    },
    {
        name: 'Random Numbers',
        description: 'Generate random numbers for all kinds of maths activities',
        path: '/random-numbers',
        component: randomNumbers
    },
    {
        name: 'Timer',
        description: 'A countdown timer',
        path: '/timer',
        component: timer
    },
    {
        name: 'Stopwatch',
        description: 'A stopwatch',
        path: '/stopwatch',
        component: stopwatch
    },
    {
        name: 'Fluency Sheets 1',
        description: 'Generate sheets to practise fluency of tricky questions, set one',
        path: '/fluency1',
        component: fluency1
    },
    {
        name: 'Fluency Sheets 2',
        description: 'Generate sheets to practise fluency of tricky questions, set two',
        path: '/fluency2',
        component: fluency2
    }
]

  export default appList