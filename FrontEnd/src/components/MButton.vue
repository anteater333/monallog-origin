<template>
    <button class="monallog-button"
    @click="callback($event)">
        <slot></slot>
    </button>
</template>

<script>
export default {
  name: 'MButton',
  props: {
      
  },
  data: function () {
    return {

    }
  }
  ,
  methods: {
      callback: function(e) {
          this.$emit('click', e);
      }
  }
}
</script>

<style scoped>
.monallog-button {
    border: medium;
    border-style: solid;
    border-color: var(--white);
    border-radius: 7px;

    font-size: 20px;

    padding: 0.1em 0.3em;

    font-family: Relancer;
}

.monallog-button:hover {
    cursor: pointer;
}

.monallog-button > * {

    color: var(--white);
    text-align: center;
    text-decoration: none;
    line-height: 1.5;
}
</style>