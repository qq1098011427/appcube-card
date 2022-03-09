<template>
  <div class="sort-popup">
    <div class="content">
      <div class="t flex flex-between" style="align-items:center;">
        <div>
          当前订阅
        </div>
        <div style="color: #488FF9;font-size:12px;cursor:pointer;" @click="issort = !issort">
          <img style="width:14px;height:14px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABpElEQVRIS+3WP0vDUBAA8LvXJBZBRcV+Ajd1EvwAojX9AuoiuFUcbPIVXAv2D0p1FRfdnNJCLS5O1sm1fgTR2iXG9p1ETWlaTV+TWBDMmnvvl7t3vBzCkB8csgcuMJF/HOc0oSLxSdEPIeIPJT1aFo1vgzZGrbE7AJoVXfwVx5ujylQ5ifXOdfECxdhrs4CAl4YmnTrv2uBarrmOvHUOAPcIWBFFOfJaSYseurA0xZhk2XvMAeJZUVO2ekA1ayWB6BgBc4auaKJgd1w83YgxSXGwW5Pk+LWOz78C9sNstF3SoBmKYKGBolgooI1F5JErIpoHgKoJymrnmXWfcaCSujGsmiB/gxECIAVuGhFMzVjbQFRAZCuGLt/4LmkiTzPA3yqfZfwpM4BExsoSUAoQd4qacuILFMXszQODg2ChgGrWOgKiXa8ydnZl4AzXDqwlZLBpkrzv1foOGhgc9H79B0P5PYXaNH/7DP2OGF5ZE9AyACwQi2yUUtKF62oLMET1qTTWMNJYNPamX1zgx1XkY0z0zBDZE8N60cF6wEGbwk/80Cfvdxa/lixNSuYYAAAAAElFTkSuQmCC" alt="">
          {{ issort ? '取消编辑' : '编辑' }}
        </div>
      </div>
      <Container @drop="onDrop" style="width:100%;height:100%;">
        <Draggable v-for="item in subList" :key="item.cardId"  class="box" >
          <div class="draggable-item ">
            <img style="width:36px;height:36px;margin-right:10px;" src="data:image/png;base64,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" alt="">
            <p>{{item.appName}}</p>
            <div class="box-icon" v-if="issort" @click.stop.prevent="subCard(item.cardId, false)" :distance="1">
              <img style="width:20px;height:20px;cursor:pointer;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACg0lEQVRYR9WYPW/TUBSG33NNhUBVYWADhAQKIalUbFqbBSYY+BwoMysd6B+AgYEBfgAwwMpMGPgcYIKFuCGmUhJCBBIibAxQVSBU7IOcYCtJHdvJNdUla+5575Nzcu75ICj+IcX5IA24vPx+75rnFsG8xwVN+T9YA6+A6NOE0OozM/s/yjhhLMAlp3mE4V0AcArMu2IBiNoAnhDEvTk9/2pU2JEAy2/fnSDPvQaQOepF3fNss9CuWgcPPEtrnwpwqdncwT+9O2CeTyuc4NUSbRELc/n81yS9REDbqVnMVCJgZ5LYKN8z8IWI5019uhxnFwtov6kfJ4EHzJgc5fK0Z4mwyh7OmYeKz4fZDAX0PUegF/8KLgDqQIKPDfNkJKD/n/N+uE7WYR3mJT/cYqumR/0nIwFtp3E/s4RIH++SqRfODx5fB9h9SrynaXWzPMdCnBx8gtYB2tVaefx3ThaXbdOYtnpV+gA7FYLdl7LXyNgTaUd7K04foO00/Mf4oswF0rZEd029sBBmea9guVpvb1TmxmW0ZRTD+h560O9Kfrm/P0h7IAOBzdqmfUEXFAJWnMYZj/lhBvrSEoLo7KxeeOQLhYB2pbYIQTcT1F8ToSpDwAwDwOE4DQEszhrF232A5WrjMoGvxxlun5zYlsvlVmQAW63W1LfVte9xGgy6YhmFG/8XYKVav+QBt5QNsfJJovwz44fWdhqfE4cgmQxJY0vUNvXC7shKonypU75Z6IRZ5XbLB1S+Yf2bLOq2/D6g8kNT14sKj53BG6T04B5Cqrz6CCCVXh71zSyqrt8GS2iwwGTm00lDVneLRY83ZIEZVeuVXAGnaUqyOpO4wMzqonF1/gCSa1Q4AhZIpwAAAABJRU5ErkJggg==" alt="">
            </div>
          </div>
        </Draggable>
      </Container>
    </div>
    <div class="t">未订阅</div>
    <div style="width:100%;display: flex;justify-content: flex-start;flex-wrap: wrap;">
      <div v-for="i in nolist" :key="i.appId" class="box" style="display: flex;">
        <img style="width:36px;height:36px;margin-right:10px;" src="data:image/png;base64,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" alt="">
        <p>{{i.appName}}</p>
        <div class="box-icon" v-if="issort" @click="subCard(i.appId, true)">
          <img style="width:20px;height:20px;cursor:pointer;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAE90lEQVRYR82YPWwURxTH34xJ7kOW09BBhARdqlBgGkiTCEECApzKCBpbujsryPjKpEhBQfp8iBgiJITOnJPcUZAEEgGC4yjsFFClSyQUu0sTi9h75933opnZuZ3dnb3bOx8GS5Y/dmfvt++9+c//PQav+Rd7zflgy4BnKrS37bbe4S7scYnGxAsTsTWX4PmbOzJ/1KbYX1sJwkCAk9fXDzHGzyHCh4i0mwAASYCJbxKAgKB+EsAKAfvFA7xxt5hv9gvbF+DZG85RIrpICAfCUCBAOpASVgMSqf/LyMLvxPnnv5ayd9OCpgIsLNBOB1vzhDRhfJj5wTJ6nShKWBFBAcZkVPU1tZ7XN3dkig+L7J9eoD0BpyvtcRe9OgHsikLEoaIpVmlPeKlVHIGJBzP55W6QXQGnKs4HAOyWRzhKaKRRpSsSMV2D+j6/BkX0/PtjsMBecGSn781m7yVBJgJOV9bHAfh9JBpVEVCpskbEr7FwGnU0dQSN9SYwsBeM6P0Hs/ZIWgFFzSFrPUMUaRXlDoCWCJqw+rqqO11zPlS39QIWYRWyuXdtNWkHrLZqHuKEko3EGjKkJbyLgx3tRzwpxVqaxHXg9Uez2Y+jqY4BFhecowh0x6ybqKQkFP1SJpM9Ij7gv3XnNwQ6KHVQZoAFuzrhhcUzOfBjDy+EJSgGWLi5sYzEDujUpqk5lVb49sfp3IwAPHnVuUyEJQ0Ye6FIzfrrpU425vLjZhRDgIXvNw+B5z1WEfN1LHEDhFNPFACevupc9iRgkg4mlI6ILsDhJ3PBiRMCLFbb80ReQUYtTd2EpcYSwe41HNpkfj0yYlca5VxRRzEMuOiskNy5fgS13qmdFhxnFh00IxhLcYqXDc5yWG2W87tjgDM12oubrT87Whd7aE8djESQSmHdTNBBYydrSAC+r1nOShfUiWDpB+c4eXBbOxKV4hQ6FhiBDmBQgynWR7MhNgDjJ5pz2Z/CgFXnPAF9paBEDQabxNiFSwDsqYRHVQbidynSjBq1qfxN8dBT11qT6OJ74ndxTd4v/wDwgPYTwcFu5zoAP98sZ78JAc4stj5Foku2FGsd9Fj2rcpZttbLgXS7fuxLGnP5xr++/eoYCaMGhW5+9qSc+yIREI3Umjtt2IBhKNN8WAHbnyDh11o07TrIlxDoqbT1MsUqVq6q10ZtKiNTfPK7jTOE7LCfVZ1aWfKeh/sJjBTbatCW4lLVPU7g3k7exXGLFamjoeigeKZ1kwQyo0GUi+mI9vbpIADk9jXLqtkKCXVp0flbNkHWk2R7dBCArTyey71tP0nkUYcF2UO8Ih1kjF1pXEg46jpmIVkH4/1FcBJEhNo4SVIcdbqeu5oFEdZCdWNZtJUD+MFEu5XWD0IvuyUAhWH1AO4M4AcTDWtaP8jSGFYVxbDljzflcRvVX19sWQ9QfzSb7235JaBomsB5hmT0wnaLZWk9zdFHSj9IfTZNAlK2nWzkPiKOanPQieSw+mLluPtvO7UGicadAG4h0ujL6YsF3ICNu4YUow+PvLrskfWAyCIbA/TFWx99aMjJBdr5BrbnCTE+PLI44p59MeP1zZEhDY9MbyfGb0B0Ef3xm63pic0Hw33xyxm/RQ2oHGASP+cBfaSbrC7zwVVi/OdtGWDanLIeAZMLe4jYmGwWiK0BwXP+qkbAW7H8/a7tOcDs94HDvv9/8091kgeHFbwAAAAASUVORK5CYII=" alt="">
        </div>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button size="small" @click="closeSortBtn">取 消</el-button>
      <el-button size="small" type="primary" @click="saveSortBtn">确 定</el-button>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import { Message, Button, Loading } from 'element-ui';
import { Container, Draggable } from "vue-smooth-dnd"
import { applyDrag } from "./helper";

export default {
  name: 'sort-popup',
  components: {
    ElButton: Button,
    Container,
    Draggable
  },
  data () {
    return {
      dialogVisible: false,
      nolist: [12, 13],
      issort: false,
      subList: []
    }
  },
  methods: {
    onDrop(dropResult) {
      this.subList = applyDrag(this.subList, dropResult);
    },
    // 已订阅卡片列表
    async getCurrentCardList() {
      return window.xm
        .request({
          url: "/smallapp/v1/subscribeManager/list.json",
          isRelative: true,
          method: "GET",
          data: { userId: this.uid },
          withCredentials: true,
        })
    },
   // 所有卡片列表
    async getAllCardList() {
      return window.xm
        .request({
          url: "/smallapp/v1/cardManager/detailByAppIdList.json",
          isRelative: true,
          method: "POST",
          data: { userId: this.uid, platformFlag: 56, showSubscribe: true },
          withCredentials: true,
        })
    },
    // 订阅卡片顺序变更
    async saveSort(cardIds) {
      return window.xm
        .request({
          url: "/smallapp/v1/subscribeManager/modifyOrder.json",
          isRelative: true,
          method: "POST",
          data: { userId: this.uid, cardIds },
          withCredentials: true,
        })
    },
    // 卡片订阅
    async subscribe(cardId, subscribe = false) {
      return window.xm
        .request({
          url: "/smallapp/v1/subscribeManager/save.json",
          isRelative: true,
          method: "POST",
          data: { userId: this.uid, cardId, subscribe },
          withCredentials: true,
        })
    },
    // + -
    async subCard(id, subscribe) {
      await this.subscribe(id, subscribe)
      Message({
        message: subscribe ? '订阅成功!' : '取消订阅成功!',
        type: 'success'
      });
      // 刷新列表
      let loadingInstance = Loading.service({ fullscreen: true });
      const c2 = await this.getAllCardList().then((res) => {
        return res.data;
      });
      console.log('所有卡片列表: ', c2);
      const c1 = await this.getCurrentCardList().then((res) => {
        return res.data;
      });
      this.subList = c1.map(x => ({ // 已订阅列表
        ...x,
        appName: (c2.find(c2 => c2.appId === x.cardId) && c2.find(c2 => c2.appId === x.cardId).appName) || x.cardId || '未找到'
      }))
      console.log('已订阅卡片: ', this.subList);
      const getAuthIdsList = window.xm.native("getAuthedCardIds");
      Promise.all([c2, getAuthIdsList]).then(([res, ids]) => {
        let subList = res
          .filter((x) => x.appId)
          .filter((x) => ids.some((id) => x.appId === id));
        subList = res.filter(
          (s) =>
            s.appId &&
            s.tenantId &&
            s.bizId &&
            s.config &&
            s.config.componentSymbol.indexOf("hw_") > -1
        );
        subList = subList.filter(
          // (x) => x.bizId.indexOf("t0000000000kdybiabkpp_SzCs000000") > -1 && !x.subscribed // 深圳
          (x) => x.bizId.indexOf("t0000000000ibicsylccd_SzCs000000") > -1 && !x.subscribed // 基线
        );
        this.nolist = subList // 未订阅列表
        console.log('未订阅列表: ', this.nolist);
        loadingInstance.close();
      })
    },
    // 保存
    async saveSortBtn() {
      this.dialogVisible = false
      const cardIds = this.subList.map(x => x.cardId).reverse() // 倒序
      console.log('this.subList: ', cardIds);
      await this.saveSort(cardIds)
      window.xm.pc.emit('doRender', 'go') // 触发更新
      window.xm.native('closeApp', {
        appid: 63046297, // 基线
        // appid: 92064939 // 深圳
      })
    },
    closeSortBtn() {
      this.dialogVisible = false
      window.xm.native('closeApp', {
        appid: 63046297, // 基线
        // appid: 92064939 // 深圳
      })
    }
  },
  mounted () {
    window.xm.getLoginUserInfo().then(async res => {
      this.uid = res.uid
      const c2 = await this.getAllCardList().then((res) => {
        return res.data;
      });
      console.log('所有卡片列表: ', c2);
      const c1 = await this.getCurrentCardList().then((res) => {
        return res.data;
      });
      this.subList = c1.map(x => ({ // 已订阅列表
        ...x,
        appName: c2.find(c2 => c2.appId === x.cardId).appName || '未找到'
      }))
      console.log('已订阅卡片: ', this.subList);
      const getAuthIdsList = window.xm.native("getAuthedCardIds");
      Promise.all([c2, getAuthIdsList]).then(([res, ids]) => {
        let subList = res
          .filter((x) => x.appId)
          .filter((x) => ids.some((id) => x.appId === id));
        subList = res.filter(
          (s) =>
            s.appId &&
            s.tenantId &&
            s.bizId &&
            s.config &&
            s.config.componentSymbol.indexOf("hw_") > -1
        );
        subList = subList.filter(
          // (x) => x.bizId.indexOf("t0000000000kdybiabkpp_SzCs000000") > -1 && !x.subscribed // 深圳
          (x) => x.bizId.indexOf("t0000000000ibicsylccd_SzCs000000") > -1 && !x.subscribed // 基线
        );
        this.nolist = subList
        console.log('所有列表2: ', subList);
      })
    })
  }
}
</script>

<style lang="less" scoped>
.sort-popup {
  height: 100%;
  width: 100%;
  // height: 600px;
  // width: 600px;
  padding: 30px;
  .content {
    // box-shadow: 0px 0px 12px 0px rgba(59, 74, 116, 0.14);
    border-radius: 9px;
    width: 100%;
    height: 100%;
  }
  .box {
    margin-bottom: 1%;
    margin-right: 5%;
    width: 30%;
    height: 60px;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #E9ECF0;
    display: inline-block;
    align-items: center;
    padding: 0 15px;
    position: relative;
    box-shadow: 0px 0px 12px 0px rgba(59, 74, 116, 0.14);
    &-icon {
      position: absolute;
      top: -10px;
      right: -10px;
    }
  }
  /deep/.draggable-item {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .box:nth-child(3n) {
    margin-right: 0%;
  }
  .t {
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    color: #262A30;
    line-height: 40px;
  }
  .dialog-footer {
    position:fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    justify-content: flex-end;
  }
}
.chosenClass {
  color: #409eff;
  // transform: scale(0.8);
  .box {
    background: #409eff;
    border: 2px solid #409eff!important;
  }
}
.dragClass {
  color: #2d5985;
  transform: scale(1.2);
}
.box-icon:hover {
  transform: scale(1.5);
}
</style>
