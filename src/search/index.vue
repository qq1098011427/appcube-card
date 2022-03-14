<template>
  <div class="search">
    <div class="content" id="contentIframe">
    </div>
  </div>
</template>

<script>

export default {
  name: 'search',
  data () {
    return {
      url: {
        tenantId: '',
        cardId: ''
      },
      tipShow: false
    }
  },
  methods: {
    getUrlquery (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
    }
  },
  mounted () {
    // history.replaceState(null, null, 'http://localhost:8080?tenantId=113ff1&cardId=2aa2223d')
    this.url = {
      tenantId: this.getUrlquery('tenantId') || 't0000000000ibiCSYlccD',
      cardId: this.getUrlquery('cardId') || 't0000000000ibicsylccd_SzCs00000001'
    }
    if (!this.url.tenantId) {
      this.tipShow = true
    } else if (!this.url.cardId) {
      this.tipShow = true
    } else {
      setTimeout(() => {
        const param = {
          domain: 'https://10.253.114.167:32000',
          // domain: 'https://bingotest.besclouds.com',
          cardList: [{
            tenantId: this.url.tenantId,
            cardId: this.url.cardId
          }],
          divId: 'contentIframe'
        }
        console.log('renderCard param', param)
        window.AppCubeRender.renderCard(param)
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .content {
    box-shadow: 0px 0px 12px 0px rgba(59, 74, 116, 0.14);
    border-radius: 9px;
    width: 100%;
    height: 100%;
  }
  .tip {
    position: fixed;
    left: 24%;
    top: 10%;
    width: 50%;
    padding: 20px;
    box-shadow: 0px 0px 12px 0px rgba(59, 74, 116, 0.14);
    border-radius: 9px;
    text-align: center;
    &-close {
      position: absolute;
      top: 5px;
      right: 10px;
      font-weight: 700;
      font-size: 20px;
      cursor: pointer;
    }
  }
  #cardRenderId {
    width: 100%;
    height: 100%;
  }
}
</style>
