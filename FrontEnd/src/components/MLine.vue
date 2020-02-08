<template>
    <p class="m-line"
        :style="this.height">
        {{ text }}
    </p>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  name: 'MLine',
  props: {
    /* v-bind:line */

    /** EXAMPLE *************************
        {
            id: 0,
            text: "This is an example.",
            actor: "anonymous",
            date: "yyyy-MM-dd",
            timer: 10000, // ms
            lineWay: 0, // 1 ~ 10 (추후 수정 필요. 서버가 결정.)
        }
        ************************************/

    id: Number,
    text: String,
    actor: String, // Object
    date: String,
    timer: Number,
    lineWay: {
      type: Number,
      default: 0,
      validator: value => { return value >= 0 && value <= 10 }
    },

    /* 개별 bind */
    mode: Number
  },
  data: function () {
    return {
      height: null
    }
  },
  computed: {

  },
  created: function () {
    switch (this.mode) {
    case 1:
      this.height = {
        position: 'absolute',
        top: Math.random() * 90 + `%`
      }
      break
    case 2:
      this.height = {
        position: 'relative',
        top: 0
      }
      break
    }
  },
  mounted: function () {
    setTimeout(() => {
      this.$emit('line-timeout')
    }, this.timer)
  },
  methods: {

  }
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
</script>

<style>
.m-line {
    position: absolute;
    white-space: nowrap;
    font-size: 4vh;
}

.m-line:hover {
    text-decoration: underline;
}
</style>
