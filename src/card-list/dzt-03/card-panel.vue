<template>
  <div class="card dzt-03">
    <div class="card-item">
      <div class="card-item-title">
        <div class="text" @click="openApp()">{{ title }}</div>
        <div style="position:absolute;left:0;display:flex;top:8px;left:5px;">
          <div v-for="(tag, index) in tagList" :key="index" style="margin-right:4px;">
            <img :src="tag.iconUrl" alt="" />
          </div>
        </div>
        <div
          style="font-size:20px;height:20px;position:absolute;top:0px;right:10px;color: #FFFFFF;"
          @click="(e) => handleOpts(e)"
        >
          . . .
        </div>
      </div>
      <div class="card-item-content" @click="openDialog()">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "card-panel",
  props: {
    title: {
      type: [String, Number],
      default: "标题"
    }
  },
  components: {},
  async mounted() {
    const sublist = await xm.getStorage({ key: "shenzhen-ioc-sublist" });
    console.log("sublist: ", sublist);
    if (sublist) {
      console.log("%c [appcube 环境执行取缓存操作]", "color: green;", sublist);
      // const sublistArr = JSON.parse(sublist["shenzhen-ioc-sublist"]);
      const sublistArr = JSON.parse(sublist)
      const currentWidgetId = this.$parent.getCurrentWidgetId();
      console.log('currentWidgetId: ', currentWidgetId);
      const currentListItem = sublistArr
        .filter(s => s.cardId)
        .find(x => x.cardId === currentWidgetId);
      const cardFrontTagList = currentListItem.config && currentListItem.config.cardFrontTagList || [];
      console.log('cardFrontTagList: ', cardFrontTagList);

      if (cardFrontTagList) {
        this.tagList =
          cardFrontTagList.filter(
            x =>
              x.name && this.belowTime(x.showLabelStartTime, x.showLabelEndTime)
          ) || [];
      }
      console.log(this.tagList, 'this.tagList');
    } else {
      console.log("%c [不在 appcube 环境]", "color: red;");
    }
  },
  data() {
    return {
      newShow: false,
      tagList: []
    };
  },
  methods: {
    belowTime(s, e) {
      let is = false;
      const now = new Date().getTime();
      const start = new Date(s).getTime();
      const end = new Date(e).getTime();
      if (now >= start && now <= end) {
        is = true;
      }
      return is;
    },
    openDialog() {
      window.xm.native("openModal", {
        url: "http://www.baidu.com",
        width: 1000,
        height: 800,
        showMask: true
      });
    },
    openApp() {
      window.xm.openApp({
        appid: 28261855,
        showheaderbar: true
      });
    },
    handleOpts (e) { // 订阅
      window.xmcard.tvSubUnsub({
        label: this.title,
        widgetType: this.$parent.getCurrentWidgetId(),
        appName: '党政通测试03',
        tenantId: '0000000000gujuJSLgo5',  // https://172.26.98.170:32744/studio/index.html#/admin/上拿的
        domain: 'https://172.26.98.170:32744'
      }, e.target.getBoundingClientRect()) // 本质就是传入这个对象 { width, height, left, top }，用来定位操作面板的位置
      document.querySelectorAll('.tv-panel__item')[0].style.display = 'none';
      // document.querySelectorAll('.tv-panel__item')[1].addEventListener('click', () => {
      //   document.querySelector('.tv-panel').style.display = 'none'
      // })
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  background: #ffffff;
  margin: 10px;
  &-item {
    &-title {
      // display: flex;
      // align-items: center;
      // justify-content: space-between;
      position: relative;
      text-align: center;
      color: #262a30;
      height: 40px;
      padding: 0 20px 0 10px;
      // background: linear-gradient(90deg, #85BBFF 0%, rgba(255, 255, 255, 0) 100%);
      background: #5278e7;
      border-top-left-radius: 9px;
      border-top-right-radius: 9px;
    }
    box-shadow: 0px 0px 12px 0px rgba(59, 74, 116, 0.14);
    border-radius: 9px;
  }
  .new {
    background: rgb(236, 61, 61);
    border-radius: 4px;
    margin-right: 5px;
    padding: 2px 4px;
    color: white;
  }
  .text {
    font-size: 24px;
    line-height: 40px;
    color: white;
  }
  .tag {
    // position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
