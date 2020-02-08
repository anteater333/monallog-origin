<template>
    <span class="text-bar">
        <input type="text" class="input-text"
            :placeholder="catchPhrase"
            :value="value"
            @keydown.enter="emitEnter"
            @input="updateValue($event.target.value)">
    </span>
</template>

<script>
export default {
  name: 'MTextBar',
  props: {
    catchPhrase: {
      type: String,
      default: 'Monallog, 집단적 독백.'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
    emitEnter: function () {
      this.$emit('enter')
    }
  }
}
</script>

<style>
.text-bar {
    display: inline-block;

    overflow: hidden;

    border: 4px solid var(--white);
    border-radius: 42px;

    width: 100%;
    height: 42px;
}

.text-bar .input-text {
    outline: 0;
    border: 0;
    background-color: transparent;

    margin: 8px 1em;
    width: calc(100% - 2em);

    font-family: NanumBarunGothic;
    font-size: 24px;
    color: var(--white);
}

input.input-text::placeholder {
    opacity: 0.5;
    font-family: NanumBarunGothic;
}
</style>
