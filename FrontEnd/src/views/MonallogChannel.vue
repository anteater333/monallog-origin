<template>
    <div class="monallog-channel">
        <line-area ref="lineArea" />
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
import MTextBar from '@/components/MTextBar.vue'
import LineArea from '@/components/LineArea.vue'

import io from 'socket.io-client'

export default {
  name: 'MonallogChannel',
  components: {
    'line-area': LineArea,
    'm-text-bar': MTextBar
  },
  data () {
    return {
      socket: null,
      line: '',
      hasCursor: false,
      isSocketOn: false
    }
  },
  created () {
    this.socket = io(`http://127.0.0.1:8081`);

    // subscribing event listeners
    this.socket.on('connect', () => {
      this.$refs.lineArea.pushNotice({
        msgCode: 1,
        msgType: 'notice',
        msg: 'socketio 서버 연결됨.',
        timeout: 3000
      })

      this.$route.params.chId = this.$route.params.chId ?? "dev"

      console.log(this.$route.params.chId)

      this.socket.emit('join', { channel: this.$route.params.chId })

      this.isSocketOn = true
    });
    this.socket.on('disconnect', () => {
      this.$refs.lineArea.pushNotice({
        msgCode: 2,
        msgType: 'error',
        msg: 'socketio 서버 연결 끊어짐.',
        timeout: 5000
      })
      this.isSocketOn = false
    });
    this.socket.on('line', (data) => {
      this.$refs.lineArea.enqueue(data.line);
    });
    this.socket.on('news', (data) => {  // DEBUG
      console.log(data);
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('turnOnBg');
    });
  },
  beforeRouteLeave (to, from, next) {
    if(this.isSocketOn)
      this.socket.close();

    this.$store.dispatch('turnOffBg');
    next();
  },
  computed: {
    encourage: function () {
      return 'Speak your line.'
    },
    lineCount: function () {
      return this.line.length
    },
    counterColor: function () {
      let gray = 200 - this.lineCount * 5
      return {
        'color': `rgb(${gray}, ${gray}, ${gray})`
      }
    },
    hasText: function () {
      return this.lineCount !== 0
    }
  },
  methods: {
    postLine: function () {
      if (this.line && this.isSocketOn) { // 정상적으로 이벤트 발생
        this.socket.emit('line', {
          line: this.line,
          channel: this.$route.params.chId, // placeholding
          author: '아무개' // also placeholoding
        })
      } else if (!this.line) { // 텍스트 없음
        alert('내용을 입력해주세요.');
      } else if (!this.isSocketOn) { // socketio 연결 안됨
        alert('채팅 서버가 연결되지 않았습니다.\n ... 로 문의해 주세요.');
      }
      this.line = ''
    }
  }
}
</script>

<style scoped>
.post-line {
    opacity: 0.75;
}

/*
.line-text {

}
*/

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
