var extend = window.extend || StudioWidgetWrapper.extend
StudioWidgetWrapper.extend = function noop (fn) {
  const res = fn()
  StudioWidgetWrapper.extend = extend
  return res
}
var SmallScreenBase0011 = StudioWidgetWrapper.extend(function () {
  var ctx = {
    // 组件根目录
    widgetBasePath: '',
    widgetProperties: {},
    // 获取桥接器实例的方法
    getConnectorInstanceByName: null
  }

  /**
   * 统一Connector调用
   * @param connector 桥接器实例
   * @param params 所有参数（桥接器处理）
   * @returns {Promise<unknown>}
   */
  const callFlowConn = function (connector, ...params) {
    return new Promise((resolve, reject) => {
      connector.connectorParams.async = true;

      var getParams = function (params){
        return {
          boid: params[0],
          filter: params[1],
          pageView: params[2],
        }
    }
      connector.connectorParams.input = getParams(params)
      connector.getInputParams().isShare = true; //多次请求合并
      connector.process(function (response) {
        if (response) {
          resolve(response || [])
        } else reject()
      });
    })
  }

  var process = { env: {"NODE_ENV":"production"} };

  

  return extend.call(StudioWidgetWrapper,
  {
      /*
       * Triggered when initializing a widget and will have the code that invokes rendering of the widget
       * setParentContainer(JQueryParentContainerDOM) - binds event to this container
       * setItemContainer(JQueryItemContainerDOM) - binds studio item events for respective item containers
       * bindEvents() - binds the studio event to this widget
       */
      init: function()
      {
          var thisObj = this;
          thisObj._super.apply(thisObj, arguments);
          thisObj.render();
          if ((typeof(Studio) != "undefined") && Studio)
          {

          }
      },

      /*
       * Triggered from init method and is used to render the widget
       */
      render: function()
      {
          var thisObj = this;
          var widgetProperties = ctx.widgetProperties = thisObj.getProperties();
          var elem = thisObj.getContainer();
          var items = thisObj.getItems();
          var connectorProperties = thisObj.getConnectorProperties();

          /*
           * API to get base path of your uploaded widget API file
           */
          var widgetBasePath = ctx.widgetBasePath = thisObj.getWidgetBasePath();
          ctx.getConnectorInstanceByName = function (boid) {
            return thisObj.getConnectorInstanceByName(boid)
          }
          if (elem)
          {
              var containerDiv = $(".scfClientRenderedContainer", elem);
              if (containerDiv.length)
              {
                  $(containerDiv).empty();
              }
              else
              {
                  containerDiv = document.createElement('div');
                  containerDiv.className = "scfClientRenderedContainer";
                  $(elem).append(containerDiv);
              }

        //       var vm = new Vue({
        // 	el: $("#widgetVueTemplate",elem)[0],
        // 	data:{
        // 		name: "Bingo Studio"
        // 	}
        // });
            thisObj.vm = new Vue({
  el: $(".small-screen-base-0011", elem)[0],
  name: 'small-screen-base-0011',
  props: {
    data: Object
  },

  data() {
    return {
      widgetBasePath,
      widgetProperties,
      date: ''
    };
  },

  methods: {
    handleOpts() {
      // eslint-disable-next-line no-undef
      console.log('thisObj:', thisObj); // eslint-disable-next-line no-undef

      window.xmcard.subUnSubFromAppcube(thisObj);
    }

  }
});
          }

          /*
           * API to bind global events to the item DOM :
           *  thisObj.sksBindItemEvent();
           *
           * API to bind item events to the item DOM :
           *  thisObj.sksBindItemEvent(JQueryItemContainerSelector, ItemIdx);
           * JQueryItemContainerSelector - A JQuery selector that returns an array of DOMs that represents the individual item inside the item container, to which the hotspot needs to be bound.
           * ItemIdx (Optional) - To bind the item events to a specific item.
           */
          thisObj.sksBindItemEvent();

          /*
           * API to refresh the previously bound events when a resize or orientation change occurs.
           *  thisObj.sksRefreshEvents(ItemIdx);
           * ItemIdx (Optional) - To refresh events for a specific item. Default value is 0.
           */
          $(window).resize(function()
          {
              thisObj.sksRefreshEvents();
          });
      }
  });
});
