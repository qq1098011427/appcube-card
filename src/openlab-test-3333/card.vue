<template>
  <xmcard-panel
    label="城市绿化"
    label-pre-bg="rgba(49,181,144,1) linear-gradient(142deg,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0) 100%)"
    :item="{
      id: '3333',
      componentName: 'openlab-test-3333'
    }"
  >
    { '城市绿化' }
    <xmbase-tab-button
      class="mt15"
      round
      :data="tabs"
      line-num="3"
      @input="handleClick"
    />
  </xmcard-panel>
</template>

<script>

export default {
  name: 'openlab-test-3333',
  props: {},
  data () {
    return {
      tabs: [
        { text: '森林覆盖率', value: 'YT03_00001023' },
        { text: '建成区绿化覆盖率', value: 'YT03_00001024' },
        { text: '人均公园绿地面积', value: 'YT03_00001025' }
      ],
      options: {}
    }
  },
  mounted () {
  },
  methods: {
    handleClick (index) {
      console.log('我是tabs', index)
    }
  }
}
</script>

<style lang="less"></style>
