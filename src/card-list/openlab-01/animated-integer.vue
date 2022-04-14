<template>
  <div class="">
    <span>{{ tweeningValue }}</span>
  </div>
</template>

<script>
import TWEEN from '../../utils/Tween.js'
window.TWEEN = TWEEN

export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      tweeningValue: 188
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted: function () {
    this.tween(0, this.value)
  },
  methods: {
    tween: function (startValue, endValue) {
      var vm = this
      function animate () {
        if (window.TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new window.TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 1000)
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue.toFixed(0)
        })
        .start()

      animate()
    }
  }
}
</script>
<style scoped></style>
