<template>
  <div class="sz-rq-00000004" ref="container">
    <div class="content">
      <div class="content-title">
        <div class="content-title-l">
          城市运行监控
        </div>
        <div class="content-title-r">
          <div class="flex" style="align-items:center;">
            <img
              src="./img/shezhi.png"
              @click="openCardSort"
              style="width: 32px;height: 32px;margin-right:10px;cursor: pointer;"
            />
            <div>{{ sindex === 1 ? "展开" : "收起" }}</div>
            <div style="margin-left:10px;">
              <img
                :src="bai"
                alt=""
                style="width: 40px;height: 40px;"
                v-show="1 === sindex"
                @click="changesindex(0)"
              />
              <img
                :src="lan"
                alt=""
                style="width: 40px;height: 40px;"
                v-show="0 === sindex"
                @click="changesindex(1)"
              />
            </div>
          </div>
        </div>
      </div>
      <div style="display:none;">
        ---{{ renders.currentPage }}--- ---{{ render.currentPage }}---
      </div>
      <div id="content-container">
        <div
          :class="{
            'button-prev': true,
            'button-disabled': render.currentPage === 1,
          }"
          v-show="1 === sindex"
          @click="render.prevPage(), (renders.currentPage = render.currentPage)"
        ></div>
        <div
          :class="{
            'button-next': true,
            'button-disabled':
              render.currentPage ===
              Math.ceil(render.cardList.length / render.pageSize),
          }"
          v-show="1 === sindex"
          @click="toNext"
        ></div>
        <!-- <iframe id="subscriptionCardRenderFrame" :src="this.render.renderUrl" width="100%" height="100%" style="border: 0px;"></iframe>    -->
        <div
          style="width:100%;text-align:center;"
          v-if="subList.length === 0 && !render.renderUrl"
        >
          <img :src="kong" alt="" style="width:220px;height:170px;" />
          <div class="noFont">暂无权限，如需开通请联系指挥中心负责人</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Swiper from 'swiper'
// import 'swiper/dist/css/swiper.min.css'
const { Client } = window.frameMessage;
const client = new Client(window.parent);
const bai =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAFg0lEQVR4Xu2dSVBbRxCG/5F5kpDEVgQKs4RFCCNkh7hMnFROqVx9yinJPc45p/iWQ27OKdcs9+SWk6+pnFKOgQJiCwFCLGExBabYtEvWpPphYUkg9Ba9KpB6rkw3r7/pmenXM68loLEFg0FPMtPwIIfcp5ByHMCQEKJZSunQqOJKdhNCpKSUxwBWIMScDbY/nUr2SSAQiGp5YFGp09/TwWG7TTySwJcA3JX618jfYwL4LZ2Tjz++F1i+zKayAMPhsOMwmvleAN9IwE5KmjwutDR74HE1wuGwo6HhBoSoOAZXmqmUEtnsa6RSaUTjCRwdR3ESjavPLIC0BH5s9Sjf+Xy+1EWGXGj9s2CwCxnxh5D4iITaWpvQc7MTTofKseZbMpXG1stdHByeqLZKgadQ5Gf3A4GdUuPPAZz6N3RH5uQTSPQ57AoG+3vgcTfWPLSLDIzGElhd30IqnSF33BA28WDiPf/zwr5FAMnzREY8I3g0Xb0Dveo0redG0zuytnk6rQU2pCLvF3riGUBa8w5imb9o2hK8Ee+71359q9bA0zq5FPlPhUjTuc2tfJJfE88ATs7MPwbwLU1b/8hg3XteKXzyxNDS6ul0Bn744O7YozcbDfAmVAnSbjvqG6jbNa+Sx9KauBBeU3fndE4GKMRRPXBqZv4XCXxFuy2te9zKE6D1kHZnAfw6cXfsoaA3jHha0Pbsvu331k2oYtRJKMR5EYqQeMxll11ienbx85x8/TttHLeG+43qrSu5xeV1dUOxiRtfiMnZ0E+Q8uve7k50dbbXFQijxu7s7mNzexcQ4mcxOTP/FMCHo75+eNwuozrrSi4ai2MhvE42/0MAdwF0jAd8UJSGugJh1NhMJou5YJjE98TUbChJKal746McOGskSoH19NwC8UqRB0qSm3jfr1Gcu6mh32xIBcEADfoDAzQILi/GAK86wEw2i8OjKDIZ9eVbQxNwOBS0tTTBZrNd2D+Xy+Hg6ASpFOlUl+6KTVEUtLZ4oDRUN8Kw1AMpLR5Z2wIZrLfZFQU+bx8ancVnVYlkCuHIBtKaB+Ttf6YB8Q70qMcR1WqWASTPez4fMQQvb5zTaUfg1tBZWEVhQ3BxBclk2rD9BPHOmLdqnmgZwL39Q6xvvDRsaF7QPzIAt+v0KCEWTyC0tGZaZ3/fTXS0t5rWY2kYs72zh+2dV6YfcniwF60tTaqew6MTLK9umtbZ3fUOurs6TOthgFVAaNkUZg80OToMkAFqIsBTWBOm8p0YIAPUT4DDGP3MiiQYYH0AfAUKZcw2a95EOkBeWI1m2Sayf3CE1fVt088YGB06y8hQJia4sGJa52B/N9rbWkzrsfRVjlJYL0IrhtJOecuam9zq7bDCRrejjk9iho2nNNlt/1DZXKNexZZ5ID0IeQzdITGSfiJ45CmlCVBKk5FnG4FI6TG681OaY9QLrbC/pQDpH1EOL55Igs5QtTa6d13JSBocus+stdFZt6vRWfUjW8sBajXwuvZjgCZHznKAPIVNjBBvIibgcRhjAh6JciBtEiAdKPGrnAmInNI3AY9EGSAD1ETAsjiQPVAT//KdGCAD1ESAp7AmTOU7MUAGqJ8An8rpZ1YkcS0A8gVLk6PMV3xNAiRxvmReBYj8mUMVINayCsviwFqGVmgbAzQ50gywWgD5g2v9JEs/uOZP/nUyLPrkn4tO6KQHIBqNY2E5X3SCy57oJlhU9oQL7+jmh6LCO1z6SR/Ac6WfSJyLj2mHeK74GIly+TttAMuWvyNxLsB4OcRLCzCSKJcALQ9QUwlQEucitOchai5CmxflMshvIeoug5wX5ULcJgpx5yFeWgre3QiHvcZKwafTII+rSin4wpWAf4zA4I8RlC6n/HMYF+/S/wPn+zosjulyiQAAAABJRU5ErkJggg==";
const lan =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAFD0lEQVR4Xu2dTWxUVRTH/+fNtJ1OB9AqSIJE2hCNIcYNBYZogy6KSTXowo8KLhRwUyHGBTUxEoIxsSyMoXYhH7pQrNGFIdpEu1AChlJwYwgxGkIxhASLVqHzWTrvmjvDjPPZ9969d5K279xkVu+cM+/+7rlf5913HsFl2TQoIikku8nOPA7Qw4BoB2gxIJpcmpijYpQGxE2ALgHiF2EFfgihefhEL8Xc3DA5CUUHb6wmYfXZgnoIosVJfiFcF6C4RWJIkN0/2rvk4mx1qglw9UHRtIzi+wXwOiAaFwIY73WgaQI+mBAtey/ulp5aWaoC7BiMLW+wxdcC2OD9TxeeBgFnbln0zLneyLXy2lUAjA7EHhLAMEGsXHgo1GskQFcI6B7dFTlfbKUEoPS8gI2zDK86aAkxY2FdsScWAObGvNgJ7raze6nszhMisik/JhYAbhyI9QuIPepO7h9NAh04vSvSJ2ucBSiXKrADF/w723ptfJqGlVkjlzhZgBs/nDosBHZ4NeNneSIcOf3aop2U3WHY8Wt+WSSbanS52A5ZLctpw2DiebIzX5gy7Cc7wgq8QNGBqY8AvOqnihus6yGKDsTOAGK9QaM+MkVj0gMnACz1Ua1NVvW69MDU/A9JmWTixRalpQcKLyosW0qAAWp6BANkgJoENNXr5oF3NhM62wO4K0wgcnxyAFsIXL0hcPLSDFIz1WsVCgKd7UGsWEKwXNgUQuDvhLSZwT/J+gz1dQEYvS+AdzaHEG50BleO6s8pG298k8L4pF1yqa3VwvtPhXDPIsuzzySmBd7+PoXRPzKedZ0UjAOUnvfVS2ElePmbvTxpY9tQAvZtp7EI+KwnjFWt3uHlbUqIz36aMO6JxgFuWRNE32Mhp4ZzvL79ywR+nch54YPLLBx9Luyo4yTQ/2MKxy/UGB+clGtcNw7wlY4G7Fiv/6i4bziJU+O5LvdoWwD93c2KVfxf7chYGh+fu6Vtp9iAcYDb1zVC/nTLm8NJnLwNsLMtgPcMADx6dhryZ7IwQE2aDJABuifAXdg9q6qSDJABuifAs7B7VlUlGSADVCPwckcDdhrYiez5NomfLud2Io+sCuDAk/o7kcNjaXwy13ciXfcHsa9Lfy+89fM4xidz0YS2VsKxF/UPx+4bSWHk9zm+F5Yxu6GtYaWwU97nf74yg93HUyVd4ODTIay9N6jWLQDIMFnPsUTNWKOqYeM7kZzHWHj3iZBS+EnC2zuSxr9lAdA7mgn7u5qwdqV3iDI89tZ3lTFGVWh1DSbkjcsY3gNLLdzdQrkjYA5Fxv6u3rQL3baWuOzOKxZbkPadihwA/ooL/HbdLsQWnXS8Xq+LB3q9ifkszwA1W69uALkLa7RM3SaRzU1KM/G8mkTqtozZElKagfN+MG+WMbyQ1ui6UpW3cpoA+aESA/REwPgyhj3QE/9KYQbIAD0R4C7sCVelMANkgO4J8HNh96yqSs4LgHy8TbOV+YClJkA+4qsJUKrzIXMDEPk1BwMQ/WDC+ELaD9CK68gANVucAeoD5Beu1RnmXrjmV/7VCWZf+eekE8oAc0knOO2JMkAc4sQ76vCQTbzDqZ/UCBZSP0l1Tj7mHWIh+Vh288/p7zwSLEt/l/VCTsDoGmJFAkapySlA3fGrmQJUqnMS2tkhzpqENq/KaZCrQ3SVBjmvyom4SyF6SsSdV+VU8JKEYir4Yv78MQLFjxGUjwT8OYzqY+N/naColMgpo7AAAAAASUVORK5CYII=";
const p1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABz0lEQVRIS+2VsYsTURDGf9/LhbNRkcPrtAtaKVhIRPwvrtHLIkHXhCx4lhYWV1hYesKGxFWCbE6b+y8OMVgIWinptIuI6DVKLm9kN4lammLP5l73ZnjzvZlvvhlR8FHB8ckBtjq9ylJp6b7BanaXZDIbMnZ3W631r+0krRtcNSjnfhgLXrTCoNdub5+g7B+YVDGzPJ5gtD/Zv7fRrA9zQ5ykr8zsoqTvs4wy+3GwDlbqIv8G4wfi58y/DBzB3AU0aYCawDfAMr+ZHZP0OgqDS3OAEeJDdDO4Mi9ZnPT3MD/wqOPEjlDQCmv9zN9O+jXDUm+sOayJXDUKa0d/v32S7mKcicJgdQ7wGeN9dOtvgHQPNHDOOt6zg6MW3Qi284yfput4+s6x5n32e6tGYfAH4HG6izgbhcHJQ4B/LtFbjEpG9LQLsk7lHJBidBEvQZ/AvkyJ1ArYKYzLiAYQmPFOmnZRRjBiGIXB+ZyDR0mv6ihtyaY6QDKM4dh8eKdx/WOcpJsY18ByHYDGiOdRGGw+7D47XZZLEBVmOjAx8kw2bof1wcEouchxcTAlipN0MZKlFWwBkuMkPVTy/59FhY/rxRaOsYwWWDiFr8zClVwkwC/wrQY3GRO6iAAAAABJRU5ErkJggg==";
const p2 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA7ElEQVRIS+3WMS5GQRTF8d8phAZRsAOhVgiFXWjEp1CxBIVSYQlUCkRjFwqiUJNvBxSChihGnsxLiITqNfKmnJs5/zs3d86d6HilY32fgFLKLPYwU4EFQ+wkeSylbGINIzX+jrMkR6WUKeyj0WgTvsdukmELuMQinqtAsz+JAxziBq94q/FRjGEBW9jGU5NrjU/gOslyC2iId0lW2pKVUl5wVSHn2EhyUm88wDFWq/hSkvEvZy8wl2SmBTzg9g/AIMlpBayjgf0GmE8y3QP6En1r076L+of2w4v+mVV0btedD5xuR2aXg7/zX8UHSICQKDgxtdMAAAAASUVORK5CYII=";
const b1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAUVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////8IN+deAAAAGnRSTlMAvfTE61xU8N/QNOPXzbe0pZ2UkXxdKyIbD40E15IAAAB4SURBVCjPxZFJDsNACASBsQ2M993u/z80JPc5OIekD0ilkkCi6YucEzMvN+0D87DTvQROZ4gEVcV6QFQFx/rBFKJ6D+EGNVGNhiUwVT8Svbg75ozWvUWeESh9iJzMbLxo68y6ja4xMGV6nOKq4vG/vqRYVLna53kBBRoL9bL2jOsAAAAASUVORK5CYII=";
const b2 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMA7fS7w1xUv5NdUysiD6WkcOJgKQAAAFlJREFUKM/t0jkOgDAMBEAfJOuc+P+vxYKCKk1EiQtLq+m8po3pE4ANKgpooWERzx4AZ2a35sIs3uyOCOAjlmj1RJS8qkQ8+IX8QP7hO1iefVnUotrZN37kApHwB07MWJt3AAAAAElFTkSuQmCC";
const h1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAATlBMVEUAAACWm6SVm6SWm6SWnKSVnKOVnKOWm6SVm6SVm6SWnKSVm6OVnKOVnKSVm6SVm6OVm6SWnKOVm6OUmqKXnaOUmqaWnaWXl6GZmaqVm6P+FSIRAAAAGXRSTlMAvfRc4MPw689UxLmhkzTr19C0fFMrIhsPJ/kpqAAAAIVJREFUKM+9kckOwzAIRMHGDvGWfeH/f7SkPXNIFWUOSMOTQDDwh/aCiPUEnxGzh7OqLbuCIDFGqZu4GJ1s9WuDgiFpcXkVD+BlzU5tGrR04QLY/0CPFwjds4Ad8ySlCTGTtCITa0tBS0Q0H7CMROMCx6w2Nbgtc5S5/I3LzbebQdnR3tcHHIoMCQzV+dwAAAAASUVORK5CYII=";
const h2 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAOVBMVEUAAACVm6SWm6SWm6SVnKOVm6SWm6SVnKOWm6OVm6OWm6OUm6SVnaSUmqaWnaWZmaqUm6KVm6OVm6PrkVyfAAAAEnRSTlMA9Ltcw1Tr8L/rxJSRKyIPpaSCP3H0AAAAWklEQVQoz+2SOQ7AMAgEMWCDb4f/PzYobeTGShmKlUbTsQsHN5aq1gmEqkgwq+M1XLCJiLVuQSRYbw+yi1w8AkYjALKIwbFkj8RvwekXH4jt27dFbapd42AjN6aPCDov9tJFAAAAAElFTkSuQmCC";
const kong =
  "data:image/png;base64,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";
export default {
  name: "sz-rq-00000004",
  data() {
    return {
      kong,
      bai,
      lan,
      p1,
      p2,
      b1,
      b2,
      h1,
      h2,
      sindex: 1,
      subList: [],
      render: {
        // currentPage: 1,
        pageSize: 4,
        cardList: [],
        renderUrl: "",
      },
      renders: {
        currentPage: 1,
      },
      list: [], // 缓存
    };
  },
  async mounted() {
    window.onresize = () => {
      const list = this.subList.length ? this.subList : this.list
      console.log('onresize监听', list)
      list.length && this.hwNewRenderCard(list);
    }
    // 监听
    // this.mutationObDomNode()
    // 触发更新
    window.xm.pc.on("doRender", (val) => {
      console.log("我被触发了", "val=", val);
      val && render();
    });
    if (localStorage.getItem("sindex")) {
      this.sindex = +localStorage.getItem("sindex");
    }
    const render = async (needCache = false) => {
      if (needCache) {
        const list = await window.xm.getStorage({
          key: "shenzhen-ioc-sublist",
        });
        console.log("%c [appcube 环境执行取缓存操作]", "color: green;", list);
        if (list["shenzhen-ioc-sublist"]) {
          this.list = JSON.parse(list["shenzhen-ioc-sublist"]);
          console.log("this.list: ", this.list);
          // 数组长度必须达到 cube渲染方法 PageSize设置的值
          if (this.list && this.list.length && this.list.length >= 4) {
            this.hwNewRenderCard(this.list);
          }
        }
      }
      const res = await window.xm.getLoginUserInfo();
      console.log("res: ", res);
      const userId = res.uid;
      const allSubList = await window.xm
        .request({
          url: "/smallapp/v1/cardManager/detailByAppIdList.json",
          isRelative: true,
          method: "POST",
          data: { userId, platformFlag: 56, showSubscribe: true },
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
      console.log("所有列表: ", allSubList);
      let subList = allSubList.filter(
        (s) =>
          s.appId &&
          s.tenantId &&
          s.bizId &&
          s.config &&
          s.subscribed && // 筛选已经订阅的卡片
          s.config.componentSymbol.indexOf("hw_") > -1
      );
      subList = subList.filter(
        (x) => x.bizId.indexOf("t0000000000ibicsylccd_SzCs000000") > -1 // 基线
      );
      // 如果订阅卡片大于4张，显示已订阅的卡片，否则显示所有卡片
      if (subList.length >= 1) {
        let c1 = await this.getCurrentCardList(userId).then((res) => res.data);
        console.log("c1: ", c1);
        c1 = c1.map((x) => {
          if (subList.find((s) => s.appId === x.cardId)) {
            return { ...subList.find((s) => s.appId === x.cardId) };
          }
        });
        this.subList = c1;
        console.log("已经订阅且排好序的卡片: ", this.subList);
      } else {
        this.subList = allSubList;
        console.log("订阅卡片小于4张显示所有卡片: ", this.subList);
      }
      const subListNew = this.subList.filter(x => x).map((x) => ({
        config: x.config,
        tenantId: x.tenantId,
        cardId: x.bizId,
        bizId: x.bizId,
      }));
      console.log("subListNew: ", subListNew);
      window.xm
        .setStorage({
          key: "shenzhen-ioc-sublist",
          value: JSON.stringify(subListNew),
        })
        .then(function() {
          console.log("本地数据设置成功");
        });
      // 切换以后不重新加载
      if (this.sindex === 0) {
        setTimeout(() => {
          if (JSON.stringify(this.list) !== JSON.stringify(subListNew)) {
            this.hwNewRenderCard(this.subList);
          }
          this.noticeServer();
        }, 0);
      }
      if (this.sindex === 1) {
        setTimeout(() => {
          if (JSON.stringify(this.list) !== JSON.stringify(subListNew)) {
            this.hwNewRenderCard(this.subList);
          }
          this.noticeServer();
        }, 0);
      }
    };
    render(true);
  },
  methods: {
    mutationObDomNode() {
      let container = document.querySelector('#content-container')
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      let observer = new MutationObserver((mutations) => {
        console.log(mutations, '宽高变化')
        this.subList.length && this.hwNewRenderCard(this.subList);
      })
      observer.observe(container, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true
      })
    },
    // 已订阅卡片列表
    async getCurrentCardList(userId) {
      return window.xm.request({
        url: "/smallapp/v1/subscribeManager/list.json",
        isRelative: true,
        method: "GET",
        data: { userId },
        withCredentials: true,
      });
    },
    openCardSort() {
      window.xm.native("openAppModal", {
        appid: 63046297, // 基线
        width: 1200,
        height: 1000,
        showheaderbar: true,
      });
    },
    // 通知PC自适应
    noticeServer() {
      this.$nextTick(() => {
        client
          .request("MINI_APP_RESIZE", {
            height: this.$refs.container.offsetHeight + 20,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((res) => {
            console.log(res.error);
          });
      });
    },
    hwNewRenderCard(subList) {
      // 清楚dom
      if (document.getElementById("subscriptionCardRenderFrame")) {
        document
          .getElementById("subscriptionCardRenderFrame")
          .parentNode.removeChild(
            document.getElementById("subscriptionCardRenderFrame")
          );
      }
      //
      const render = window.AppCubeRender.initSubscriptionCardRender({
        domain: "https://bingotest.besclouds.com", // 基线
        elementId: "content-container",
        tenant: "0000000000ibiCSYlccD", // 基线
        pageSize: 4,
        gutter: 0,
        containerWidth: document.querySelector("#content-container")
          .offsetWidth,
        // cardWidth: Math.ceil(
        //   document.querySelector("#content-container").offsetWidth / 4
        // ),
        cardHeight: 265,
        bgColor: "#FFFFFF",
        view: this.sindex ? "inline" : "grid",
        cardList: subList.filter(x => x.bizId).map((x) => x.bizId),
        ak: "5687b696edbf4f0e82d4d2d5ccf561b7", // bingtest
        sk: "0eaf42a0ddee4cf9d8e3c18d298fdb1ad40ac568a0c85288", // bingtest
      });
      this.render = render;
      this.render.render();
    },
    changesindex(index) {
      if (this.sindex === index) return;
      this.sindex = index;
      localStorage.setItem("sindex", this.sindex);
      console.log("this.render: ", this.render);
      if (this.sindex === 0) {
        this.render.changeView(this.render.GRID_VIEW);
        this.noticeServer();
      }
      if (this.sindex === 1) {
        this.render.changeView(this.render.INLINE_VIEW);
        setTimeout(() => {
          this.noticeServer();
        }, 0);
      }
    },
    toNext() {
      this.render.nextPage();
      this.renders.currentPage = this.render.currentPage;
    },
  },
};
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
}
#content-container {
  margin-top: 10px;
  width: 100% !important;
  position: relative;
  .button-next,
  .button-prev {
    position: absolute;
    top: 50%;
    width: 27px;
    height: 44px;
    margin-top: -22px;
    z-index: 10;
    cursor: pointer;
    background-size: 27px 44px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .button-prev {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
    right: auto;
    left: 10px;
  }
  .button-next {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
    right: 10px;
    left: auto;
  }
  .button-disabled {
    opacity: 0.35;
    cursor: auto;
    pointer-events: none;
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
    width: 40px;
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
.noFont {
  height: 24px;
  font-size: 16px;
  font-weight: 400;
  color: #959ba3;
  line-height: 24px;
  padding-bottom: 60px;
}
// .sub_layout_grid {
//   .sub_layout_row {
//     div:last-child {
//       padding-right: 16px;
//     }
//   }
// }
</style>
