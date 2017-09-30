<template lang="pug">
    section
        Form
            FormItem
                Input(placeholder="测试")
        span {{token}}
        span {{count}}
        button(@click="test") 测试
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'layout',
    methods: {
        test() {
            console.log(this.$store)
            this.$Message.info('haha')
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

