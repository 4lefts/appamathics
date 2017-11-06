import testApp1 from './components/testApp1.vue'
import testApp2 from './components/testApp2.vue'
import testApp3 from './components/testApp3.vue'
import tables from './components/tables.vue'
import randomNumbers from './components/randomNumbers.vue'
import timer from './components/timer.vue'

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
    }
]

  export default appList