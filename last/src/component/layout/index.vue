<template lang="pug">
    .app-wrapper
        sidebar
        .main-container(style='padding-top: 70px;')
            sidebarItem
            router-view
</template>
<script>
    import sidebar from './sidebar.vue'
    import sidebarItem from './sidebarItem.vue'
    export default {
        name: 'layout',
        components:{
            'sidebar':sidebar,
            "sidebarItem":sidebarItem
        }
    }
</script>