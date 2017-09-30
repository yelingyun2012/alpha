<template lang="pug">
    section
        p test
        p {{myMessage}}
        p {{name}}
        button(@click="incrementCounter")
</template>
<script>
  export default {
    name: 'Message',
    data () {
      return {
        count: 1
      }
    },
    props: {
      myMessage: {
        type: String
      },
      name: {
        type: String
      }
    },
    methods: {
      incrementCounter () {

      }
    }
  }
</script>