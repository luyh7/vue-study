<template>
  <div
    class="separator-line"
    :style="{ 'border-color': color, 'border-style': line }"
  ></div>
</template>

<script>
export default {
  name: 'separator',
  props: {
    color: {
      type: String,
      default: '#bbbbbb',
    },
    line: {
      type: String,
      default: 'solid',
    },
  },
}
</script>

<style scoped>
.separator-line {
  width: 100%;
  border: 0px;
  border-top: 1px;
}
</style>
