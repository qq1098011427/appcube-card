<template>
  <div class="small-screen">
    <div class="small-screen-title">
      <div class="small-screen-title-l">测试小屏base 10</div>
    </div>
    <div
      class="dot"
      @click.stop="handleOpts()"
    >
      . . .
    </div>
    <div style="margin: 10px 0;">
      -----------
      内容small-screen-base-0010
      {{date}}
      -----------
    </div>
  </div>
</template>

<script>
export default {
  name: 'small-screen-base-0010',
  props: {
    data: Object
  },
  data () {
    return {
      date: ''
    }
  },
  methods: {
    handleOpts () {
      // eslint-disable-next-line no-undef
      console.log('thisObj:', thisObj)
      // eslint-disable-next-line no-undef
      window.xmcard.subUnSubFromAppcube(thisObj)
    }
  }
}
</script>

<style lang="less" scoped>
.small-screen {
  box-sizing: border-box;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #9b9494;
  position: relative;
  &-title {
    padding: 10px;
    &-l {
      position: relative;
      font-weight: 600;
      font-size: 16px;
      &:before {
        content: '';
        position: absolute;
        left: -10px;
        top: 5px;
        width: 6px;
        height: 15px;
        background: rgb(52, 120, 246);
      }
    }
  }
}
.dot {
  font-size: 20px;
  height: 70px;
  width: 70px;
  position: absolute;
  top: 5px;
  right: -10px;
  z-index: 999;
  text-align: center;
}
</style>
