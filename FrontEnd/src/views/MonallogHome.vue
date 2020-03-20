<template>
    <div class="monallog-home">
        <div class="home-content">
            <div class="main-logo">
                <img src="@/assets/main-logo.png"
                srcset="@/assets/main-logo@2x.png 2x,
                        @/assets/main-logo@3x.png 3x"
                class="main-logo-img">
            </div>
            <div class="search">
                <m-text-bar
                    class="search-text"
                    :catch-phrase="greeting"
                    v-model="searchKey"
                    @enter="searchChan" />
            </div>
        </div>
    </div>
</template>

<script>
import MTextBar from '@/components/MTextBar.vue'

export default {
    name: 'MonallogHome',
    components: {
        'm-text-bar': MTextBar
    },
    data () {
        return {
            searchKey: ''
        }
    },
    computed: {
        greeting: function () {
            return 'Find Your Channel.'
        }
    },
    methods: {
        searchChan: function () { // 백엔드 완성 시 검색기능으로 변경해야함.
            this.$router.push({ name: 'channel', params: { chId: this.searchKey } })
        }
    }
}
</script>

<style scoped>
.monallog-home {
    position: absoulte;

    display: flexbox;
}

.home-content {
    position: absolute;
    top: 35vh;

    width: 100%;

    opacity: 0.75;
}

.main-logo {
    margin-bottom: 5vh;
}

.search {
    margin: auto;

    max-width: 457px;
    height: 42px;

    padding: 0px 20px;

    opacity: 0.75;
}
</style>
