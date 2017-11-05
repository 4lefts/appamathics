import testApp1 from './components/testApp1.vue'
import testApp2 from './components/testApp2.vue'
import testApp3 from './components/testApp3.vue'
import tables from './components/tables.vue'
import randomNumbers from './components/randomNumbers.vue'

const appList = [
    // {
    //     name: 'Some Test App',
    //     description: 'a test app, innit',
    //     path: '/testApp1',
    //     component: testApp1
    // },
    // {
    //     name: 'A Different App',
    //     description: 'a test app, as well',
    //     path: '/testApp2',
    //     component: testApp2
    // },
    // {
    //     name: 'Another App',
    //     description: 'still a test app',
    //     path: '/testApp3',
    //     component: testApp3
    // },
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
    }
]

  export default appList