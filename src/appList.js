import tables from './components/tables/tables.vue'
import randomNumbers from './components/randomNumbers/randomNumbers.vue'
import timer from './components/timer/timer.vue'
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
        name: 'p5 Test',
        description: 'A test of p5js',
        path: '/p5test',
        component: p5test
    }
]

  export default appList