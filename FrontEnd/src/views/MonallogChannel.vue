<template>
    <div class="monallog-channel">
        <line-area />
        <div class="post-line">
            <m-text-bar
                class="line-text"
                :catch-phrase="encourage"
                @enter="postLine"
                v-model="line"/>
            <button
                class="line-button"
                @click="postLine"
                @mouseenter="hasCursor = true"
                @mouseleave="hasCursor = false">
                <transition name="fade-spacing"
                    mode="out-in">
                    <img src="../assets/line-btn-icon.png"
                        class="line-button-content line-button-icon"
                        v-if="!hasText && !hasCursor"
                        key="btn-img">
                    <span class="line-button-content line-button-text"
                        :style="counterColor"
                        v-else-if="!hasCursor"
                        key="btn-counter">
                        {{ lineCount }}
                    </span>
                    <span class="line-button-content line-button-text text-post"
                        v-else
                        key="btn-text">
                        SPEAK
                    </span>
                </transition>
            </button>
        </div>
    </div>
</template>

<script>
import MTextBar from "@/components/MTextBar.vue"
import LineArea from "@/components/LineArea.vue"

export default {
    name: 'MonallogChannel',
    components: {
        'line-area': LineArea,
        'm-text-bar': MTextBar
    },
    data() {
        return {
            line: "",
            hasCursor: false
        }
    }, 
    computed: {
        encourage: function() {
            return "Speak your line."
        }, 
        lineCount: function() {
            return this.line.length;
        },
        counterColor: function() {
            let gray = 200 - this.lineCount*5;
            return {
                'color': `rgb(${gray}, ${gray}, ${gray})`
            }
        },
        hasText: function() {
            return this.lineCount != 0;
        }
    },
    methods: {
        postLine: function() {
            if (this.line)
                this.$children[0].enqueue(this.line);
            else
                alert("내용을 입력해주세요.");
            this.line = "";
        },
    }
}
</script>

<style scoped>
.post-line {
    opacity: 0.75;
}

.line-text {
    
}

.line-button {
    display: flex;
    justify-content: center;

    border: 4px solid var(--white);
    border-radius: 10px;

    width: 42px;
    height: 42px;

    background-color: var(--white);
    background-position: center center;
    background-repeat: no-repeat;

    overflow: hidden;

    cursor: pointer;

    transition: 0.5s;
}

.line-button:hover {
    width: 84px;
}

.line-button:focus {
    outline: none;
}

.line-button-icon {
    flex: 0 0 0;
}

.line-button-text {
    font-size: 18px;
    text-align: center;
    line-height: 42px;
}

.text-post {
    color: var(--black);
    font-weight: bold;
}

</style>