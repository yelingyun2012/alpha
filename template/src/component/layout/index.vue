<template lang="pug">
    section
        Form
            FormItem
                Input(placeholder="测试")
        p {{token}}
        p {{count}}
        button(@click="test") 测试
        p {{msg}}
</template>
<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'layout',
    data(){
      return {
        msg:'测试热加载'
      }
    },
    methods: {
      ...mapMutations({
        setToken: 'user/SET_TOKEN'
      }),
      test () {
        console.log(this.$store)
      }
    },
    computed: {
      ...mapState({
        token: state => state.user.token
      }),
      ...mapGetters({
        count: 'user/countToken'
      })
    }
  }
</script>

