<template>
  <xmcard-panel
    label="水污染治理十三五目标及完成情况"
    :item="{
      id: '98301565',
      componentName: 'water-pollution-98301565'
    }"
  >
    <p class="f12 c-999 mt10">更新于{{ date }}</p>
    <p class="f15 b mt20">建成区黑臭水体比例</p>
    <xmbase-progress-special
      class="mt10"
      :data="blackOdorousWater"
      :percent="parseInt(blackOdorousWater[2].value)"
    />
    <p class="f15 b mt20">跨界河流水质达标率</p>
    <xmbase-progress-special
      bg="rgba(59, 143, 246, 0.08)"
      percentBg="rgba(59, 143, 246, 0.39)"
      color="#3B8FF6"
      percentBgActive="#3B8FF6 linear-gradient(142deg,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0) 100%)"
      class="mt10"
      :percent="parseInt(transboundaryRiversQuality[2].value)"
      :data="transboundaryRiversQuality"
    />
  </xmcard-panel>
</template>

<script>

export default {
  name: 'water-pollution-98301565',
  props: {
    data: Object
  },
  data () {
    return {
      date: '',
      blackOdorousWater: [
        { label: '当前值', value: '', key: 'YT03_00002001' },
        { label: '目标值', value: '', key: 'YT03_00002002' },
        { label: '完成率', value: '', key: 'blackOdorousWaterFinishRate' }
      ],
      transboundaryRiversQuality: [
        { label: '当前值', value: '', key: 'YT03_00002003' },
        { label: '目标值', value: '', key: 'YT03_00002004' },
        { label: '完成率', value: '', key: 'transboundaryRiversQualityFinishRate' }
      ]
    }
  },
  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="less"></style>
