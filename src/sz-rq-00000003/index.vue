<!--自己的轮播-->
<template>
  <div class="sz-rq-00000001" ref="container">
    <div class="content">
      <div class="content-title">
        <div class="content-title-l">
          城市运行监控
        </div>
        <div class="content-title-r">
          <div class="tab">
            <div
              :class="0 === sindex ? 'tab-select' : ''"
              @click="changesindex(0)"
            >
              <img :src="b1" alt="" v-show="0 === sindex" />
              <img :src="h1" alt="" v-show="1 === sindex" />
            </div>
            <div
              :class="1 === sindex ? 'tab-select' : ''"
              @click="changesindex(1)"
            >
              <img :src="h2" alt="" v-show="0 === sindex" />
              <img :src="b2" alt="" v-show="1 === sindex" />
            </div>
          </div>
        </div>
      </div>
      <div class="content-container">
        <div
          ref="barScroll"
          class="content-container-cols"
          v-show="sindex === 0"
        >
          <div
            v-for="(item, i) in subList"
            :id="`contentIframe${i}`"
            :key="item.bizId + i"
            class="box iframeStyle"
          ></div>
        </div>
        <!-- <div class="swiper-father" > -->
          <div class="swiper-container" v-show="sindex === 1 && showSwiper">
            <div class="swiper-wrapper content-container-rows">
              <div
                class="swiper-slide box"
                v-for="(item, i) in subList2"
                :key="item.bizId + 'two' + i"
              >
                <div
                  style="width:100%;height:100%;"
                  :id="`contentIframe2${i}`"
                ></div>
              </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
          <!-- <div
            style="position: absolute;top: 0;left: 0; height: 100%;width: 45px;"
          >
            <div class="swiper-button-prev"></div>
          </div>
          <div
            style="position: absolute;top: 0;right: 0; height: 100%;width: 45px;"
          >
            <div class="swiper-button-next"></div>
          </div> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
const { Client } = window.frameMessage;
const client = new Client(window.parent)

const p1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABz0lEQVRIS+2VsYsTURDGf9/LhbNRkcPrtAtaKVhIRPwvrtHLIkHXhCx4lhYWV1hYesKGxFWCbE6b+y8OMVgIWinptIuI6DVKLm9kN4lammLP5l73ZnjzvZlvvhlR8FHB8ckBtjq9ylJp6b7BanaXZDIbMnZ3W631r+0krRtcNSjnfhgLXrTCoNdub5+g7B+YVDGzPJ5gtD/Zv7fRrA9zQ5ykr8zsoqTvs4wy+3GwDlbqIv8G4wfi58y/DBzB3AU0aYCawDfAMr+ZHZP0OgqDS3OAEeJDdDO4Mi9ZnPT3MD/wqOPEjlDQCmv9zN9O+jXDUm+sOayJXDUKa0d/v32S7mKcicJgdQ7wGeN9dOtvgHQPNHDOOt6zg6MW3Qi284yfput4+s6x5n32e6tGYfAH4HG6izgbhcHJQ4B/LtFbjEpG9LQLsk7lHJBidBEvQZ/AvkyJ1ArYKYzLiAYQmPFOmnZRRjBiGIXB+ZyDR0mv6ihtyaY6QDKM4dh8eKdx/WOcpJsY18ByHYDGiOdRGGw+7D47XZZLEBVmOjAx8kw2bof1wcEouchxcTAlipN0MZKlFWwBkuMkPVTy/59FhY/rxRaOsYwWWDiFr8zClVwkwC/wrQY3GRO6iAAAAABJRU5ErkJggg=='
const p2 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA7ElEQVRIS+3WMS5GQRTF8d8phAZRsAOhVgiFXWjEp1CxBIVSYQlUCkRjFwqiUJNvBxSChihGnsxLiITqNfKmnJs5/zs3d86d6HilY32fgFLKLPYwU4EFQ+wkeSylbGINIzX+jrMkR6WUKeyj0WgTvsdukmELuMQinqtAsz+JAxziBq94q/FRjGEBW9jGU5NrjU/gOslyC2iId0lW2pKVUl5wVSHn2EhyUm88wDFWq/hSkvEvZy8wl2SmBTzg9g/AIMlpBayjgf0GmE8y3QP6En1r076L+of2w4v+mVV0btedD5xuR2aXg7/zX8UHSICQKDgxtdMAAAAASUVORK5CYII='
const b1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAUVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////8IN+deAAAAGnRSTlMAvfTE61xU8N/QNOPXzbe0pZ2UkXxdKyIbD40E15IAAAB4SURBVCjPxZFJDsNACASBsQ2M993u/z80JPc5OIekD0ilkkCi6YucEzMvN+0D87DTvQROZ4gEVcV6QFQFx/rBFKJ6D+EGNVGNhiUwVT8Svbg75ozWvUWeESh9iJzMbLxo68y6ja4xMGV6nOKq4vG/vqRYVLna53kBBRoL9bL2jOsAAAAASUVORK5CYII='
const b2 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMA7fS7w1xUv5NdUysiD6WkcOJgKQAAAFlJREFUKM/t0jkOgDAMBEAfJOuc+P+vxYKCKk1EiQtLq+m8po3pE4ANKgpooWERzx4AZ2a35sIs3uyOCOAjlmj1RJS8qkQ8+IX8QP7hO1iefVnUotrZN37kApHwB07MWJt3AAAAAElFTkSuQmCC'
const h1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAATlBMVEUAAACWm6SVm6SWm6SWnKSVnKOVnKOWm6SVm6SVm6SWnKSVm6OVnKOVnKSVm6SVm6OVm6SWnKOVm6OUmqKXnaOUmqaWnaWXl6GZmaqVm6P+FSIRAAAAGXRSTlMAvfRc4MPw689UxLmhkzTr19C0fFMrIhsPJ/kpqAAAAIVJREFUKM+9kckOwzAIRMHGDvGWfeH/f7SkPXNIFWUOSMOTQDDwh/aCiPUEnxGzh7OqLbuCIDFGqZu4GJ1s9WuDgiFpcXkVD+BlzU5tGrR04QLY/0CPFwjds4Ad8ySlCTGTtCITa0tBS0Q0H7CMROMCx6w2Nbgtc5S5/I3LzbebQdnR3tcHHIoMCQzV+dwAAAAASUVORK5CYII='
const h2 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAOVBMVEUAAACVm6SWm6SWm6SVnKOVm6SWm6SVnKOWm6OVm6OWm6OUm6SVnaSUmqaWnaWZmaqUm6KVm6OVm6PrkVyfAAAAEnRSTlMA9Ltcw1Tr8L/rxJSRKyIPpaSCP3H0AAAAWklEQVQoz+2SOQ7AMAgEMWCDb4f/PzYobeTGShmKlUbTsQsHN5aq1gmEqkgwq+M1XLCJiLVuQSRYbw+yi1w8AkYjALKIwbFkj8RvwekXH4jt27dFbapd42AjN6aPCDov9tJFAAAAAElFTkSuQmCC'

export default {
  name: 'sz-rq-00000003',
  data () {
    return {
      p1,
      p2,
      b1,
      b2,
      h1,
      h2,
      sindex: 1,
      subList: [],
      subList2: [],
      isCardShow: false
    }
  },
  computed: {
    showSwiper () {
      return this.subList2.length
    }
  },
  mounted () {
    this.initSwiper()
    if (localStorage.getItem('sindex')) {
      this.sindex = +localStorage.getItem('sindex')
    }
    //
    window.xm.getLoginUserInfo().then(res => {
      // const getSubList = window.xmcard.api.myFetch(`/smallapp/v1/subscribeManager/listByHw?userId=${res.uid}`)
      const getSubList = window.xm
        .request({
          url: '/smallapp/v1/cardManager/detailByAppIdList.json',
          isRelative: true,
          method: 'POST',
          data: { userId: res.uid, platformFlag: 56 },
          withCredentials: true
        })
        .then(res => {
          console.log(' res.data: ',  res.data);
          return res.data
        })
      const getAuthIdsList = window.xm.native('getAuthedCardIds')
      Promise.all([getSubList, getAuthIdsList]).then(([res, ids]) => {
        let subList = res
          .filter(x => x.appId)
          .filter(x => ids.some(id => x.appId === id))
        subList = res.filter(
          s =>
            s.appId &&
            s.tenantId &&
            s.bizId &&
            s.config &&
            s.config.componentSymbol.indexOf('hw_') > -1
        )
        subList = subList.filter(
          // x => x.bizId.indexOf('t0000000000kdybiabkpp_SzCs000000') > -1
          x => x.bizId.indexOf('t0000000000ibicsylccd_SzJt000000') > -1
        )
        // const arr = []
        // // 复制 15份
        // for (let i = 0; i < 16; i += 1) {
        //   arr.push(subList[0])
        // }
        // this.subList = arr
        this.subList = subList
        console.log('新列表16: ', this.subList)
        // new 标签
        // const subListNew = this.subList.map(x => {
        //   return this.getNewShow(x.config.showLabelType, x.config.showLabelStartTime, x.config.showLabelEndTime) ? ({ ...x, newShow: true }) : ({ ...x, newShow: false })
        // })
        const subListNew = this.subList.map(x => ({
          config: x.config,
          tenantId: x.tenantId,
          cardId: x.bizId
        }))
        window.xm.setStorage({
          key: 'shenzhen-ioc-sublist',
          value: JSON.stringify(subListNew)
        }).then(function () {
          console.log('本地数据设置成功')
        })
          // 切换以后不重新加载
        if (this.sindex === 0) {
          setTimeout(() => {
            this.hwRenderCard('contentIframe')
            this.noticeServer()
          }, 0)
        }
        if (this.sindex === 1) {
          this.subList2 = this.subList.map(x => x)
          setTimeout(() => {
            this.hwRenderCard('contentIframe2')
            this.noticeServer()
          }, 0)
        }
      })
    })
  },
  methods: {
    // new标签判断
    getNewShow(showLabelType, showLabelStartTime, showLabelEndTime) {
      if (showLabelType === 1) {
        const now = new Date().getTime()
        const start = new Date(showLabelStartTime).getTime()
        const end = new Date(showLabelEndTime).getTime()
        if (now >= start && now <= end) {
          return true
        }
      }
      return false
    },
    // 通知PC自适应
    noticeServer() {
      this.$nextTick(() => {
        console.log(this.$refs.container.offsetHeight, 'this.$refs.container.offsetHeight');
        client
          .request("MINI_APP_RESIZE", { height: this.$refs.container.offsetHeight + 20 })
          .then((res) => {
            console.log(res);
          })
          .catch((res) => {
            console.log(res.error);
          })
        })
    },
    hwRenderCard (name) {
      if (this.isCardShow) return
      this.subList.forEach((item, index) => {
        const param = {
          // domain: 'https://bingotest.besclouds.com',
          domain: 'https://10.253.114.167:32000',
          cardList: [
            {
              tenantId: item.tenantId,
              cardId: item.bizId
              // cardId: item.config.componentSymbol + '-' + item.appId
            }
          ],
          divId: name + index
        }
        console.log('renderCard param', param)
        window.AppCubeRender.renderCard(param)
      })
    },
    changesindex (index) {
      if (this.sindex === index) return
      this.sindex = index
      localStorage.setItem('sindex', this.sindex)
      if (this.sindex === 0) {
        this.hwRenderCard('contentIframe')
        this.noticeServer()
        this.isCardShow = true
      }
      if (this.sindex === 1) {
        this.subList2 = this.subList.map(x => x)
        setTimeout(() => {
          this.hwRenderCard('contentIframe2')
          this.noticeServer()
          this.isCardShow = true
        }, 0)
      }
    },
    initSwiper () {
      const swiper = new Swiper('.swiper-container', {
        initialSlide: 0,
        direction: 'horizontal', // 垂直切换选项
        loop: false, // 循环模式选项
        slidesPerView: 4,
        slidesPerGroup: 4,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observer: true,
        observeParents: true
      })
      console.log('swiper: ', swiper)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  background: #ffffff;
  margin: 10px;
  box-shadow: 0px 0px 12px 0px rgba(59, 74, 116, 0.14);
  border-radius: 9px;
  padding: 10px 20px;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-l {
      padding-left: 10px;
      position: relative;
      font-size: 20px;
      color: #262a30;
      line-height: 20px;
      &::before {
        position: absolute;
        content: "";
        left: 0;
        top: 2px;
        display: block;
        width: 6px;
        height: 20px;
        background: linear-gradient(139deg, #77aeef 0%, #3888e8 100%);
      }
    }
    span {
      font-size: 16px;
      line-height: 24px;
      color: #3993f3;
    }
  }
  &-container {
    margin-top: 10px;
    &-cols {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
      .box:not(:nth-child(4n)) {
        margin-right: 4%/3;
      }
      .box {
        width: 24%;
        height: 275px;
        overflow: hidden;
        margin-bottom: 10px;
      }
    }
    &-rows {
      width: 100%;
      .box:not(:last-child) {
        // margin-right: 4%/3;
      }
      .box {
        height: 275px;
        overflow: hidden;
        width: 25%;
      }
    }
  }
}

.tab {
  height: 40px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #cbcfd6;
  display: flex;
  overflow: hidden;
  div {
    width: 56px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
  &-select {
    background: #3993f3;
    color: #ffffff;
  }
}
//
.swiper-container {
  width: 100%;
}
.swiper-father {
  position: relative;
  padding: 20px;
}
// .swiper-button-prev {
//   left: 0 !important;
// }

// .swiper-button-next {
//   right: 0 !important;
// }
</style>
