<template lang="pug">
    section
        p qwewq
        input(v-model="parentMsg")
        input(v-model="todo.name")
        Message(:my-message="parentMsg", v-bind="todo", @increment="incrementTotal")
</template>
<script>
  import Message from './children/message.vue'

  export default {
    name: 'dashboard',
    data () {
      return {
        parentMsg: 'haha',
        todo: {
          name: 'beyebe',
          value: 'haha1'
        }
      }
    },
    components: {
      Message
    },
    mounted(){

    }
  }
</script>
