<template>
    <div class="line-area">
        <transition name="fade">
            <p class="channel-notice"
                v-show="hasNotice">
                {{ channelNotice.msgType + ": " + channelNotice.msg }}
            </p>
        </transition>
        <!-- Style 01 - "난장판" -->
        <m-line v-for="line in curLines"
            :key="line.id"
            v-bind="line"
            :mode="lineMode"
            :style="lineStyle"
            @line-timeout="dequeue"
            class="floating-line"
        />

        <!-- Style 02 - "10차로 도로" -->
        <!--
        <div v-for="index in 10"
            :key="index"
            class="line-way"
        >
            <m-line
                v-if="curLines.filter((line) => {return line.lineWay == index})[0]"
                v-bind="curLines.filter((line) => {return line.lineWay == index})[0]"
                :mode="lineMode"
                :style="lineStyle"
                @line-timeout="dequeue"
                class="floating-line"
            />
        </div>
        -->

    </div>
</template>

<script>
import MLine from '@/components/MLine.vue'
import { setTimeout, clearTimeout } from 'timers'

export default {
    name: 'ListArea',
    components: {
        'm-line': MLine
    },
    props: {
    },
    data () {
        return {
            notices: [],
            channelNotice: Object,
            hasNotice: false,
            curLines: [ // 현재 표시중인 라인들
                /*
                {
                    id: 0,
                    text: "This is an example.",
                    actor: "anonymous",
                    date: "yyyy-MM-dd",
                    timer: 10000, // ms
                    lineWay: 0, // 0 : No line-way mode, 1 ~ 10 : line-way number
                }
                */
            ],

            // tmp data
            lineId: 0,
            lineDuration: 10000, // ms
            lineTimer: Object,
            lineMode: 1
        }
    },
    computed: {
        lineStyle: function () {
            return {
                animationDuration: this.lineDuration + 'ms'
            }
        }
    },
    watch: {
        notices: {
            deep: true,
            handler () {
                if (this.notices.length > 0) {
                    this.hasNotice = true
                    this.channelNotice = this.notices[0]
                    clearTimeout(this.lineTimer)
                    this.lineTimer = setTimeout(() => {
                        this.notices.shift()
                    }, this.channelNotice.timeout)
                } else {
                    this.hasNotice = false
                }
            }
        }
    },
    created () {
        this.lineTimer = setTimeout(() => { }, 10)
        this.pushNotice({
            msgCode: 0,
            msgType: 'Welcome',
            msg: '안녕하세요.',
            timeout: 1000
        })
    },
    methods: {
        enqueue: function (input) {
            const line = { // 당연히 이게 아니라 객체를 전달해야함...
                id: this.lineId,
                text: input,
                actor: '아무개',
                date: now(),
                timer: this.lineDuration,
                lineWay: (this.lineId) % 10 + 1
            }

            this.curLines.push(line)
            this.lineId++
        },
        dequeue: function () {
            const rtLine = this.curLines.shift()
            return rtLine
        },
        /**
         * 채널의 안내 메세지 큐에 메세지를 입력합니다.
         * 메세지는 LineArea 상단에 표시됩니다.
         * notice: {
         *     msgCode: Number,
         *     msgType: String,
         *     msg: String,
         *     timeout: Number(default: 5000),
         * }
         */
        pushNotice: function (notice) { // push지만 enqueue
            notice.timeout = notice.timeout ?? 5000

            notice.date = now()
            this.notices.push(notice)
        }
    }
}

const getFormatDate = (date) => {
    const coder = (val) => {
        return val >= 10 ? val : '0' + val
    }

    const year = date.getFullYear()
    const month = coder((1 + date.getMonth()))
    const day = coder(date.getDate())
    const hour = coder(date.getHours())
    const minute = coder(date.getMinutes())
    const second = coder(date.getSeconds())
    return year + '-' + month + '-' + day +
        ' ' + hour + ':' + minute + ':' + second
}

const now = () => {
    return getFormatDate(new Date())
}
</script>

<style>
.line-area {
    overflow: hidden;
}

.line-area .channel-notice {
    position: absolute;
    z-index: 10;

    white-space: nowrap;

    background-color: rgba(0, 0, 0, 0.5);
    color: yellow;
    text-align: left;

    transition: 0.3s;

    width: calc(100% - 2em);

    margin: 0px;
    padding: 0.3em 1em;
}

.line-area .channel-notice:hover {
    background-color: transparent;
    opacity: 0.3;
}

.line-area .m-line {
    z-index: 5;
}

.line-area .line-container {
    height: 100%;
}

.line-area .floating-line {
    visibility: hidden;

    animation-name: line-right-left;
    animation-timing-function: linear;

    margin: 0px;
}

.line-area .line-way {
    position: relative;
    overflow: hidden;
    height: 10%;
}
</style>
