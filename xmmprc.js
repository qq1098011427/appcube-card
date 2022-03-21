module.exports = {
  "domain": "http://172.30.59.156:21006",
  "loginUrl": "/baas-login/open/pwdLogin",
  "cardUrl": "/open/smallapp/cardManager/quickCreate",
  "mpUrl": "/open/smallapp/appManager/quickCreate",
  "username": "zhuwei",
  "password": "a123456",
  "mpList": [{
    "appId": "77097769", "name": "openlab测试卡片中屏", "file": "zip/content.zip", "icon": "icon.png", "platformFlag": 3
  }, {
    "appId": "38971503", "name": "openlab测试弹窗", "file": "zip/popup.zip", "icon": "icon.png", "platformFlag": 3
  }],
  "appcube": {
    "requires": [{
      "name": "global_Vue", "version": "100.8.6"
    }, {
      "name": "t0000000000pisk5ni0cd_xmbase", "version": "1.0.0"
    }, {
      "name": "t0000000000pisk5ni0cd_xmcard1047", "version": "1.0.0"
    }, {
      "name": "t0000000000pisk5ni0cd_xmsdk", "version": "1.0.0"
    }],
    // 自定义param处理的方法，最终返回的对象时传给桥接器的input参数
    // eslint-disable-next-line no-template-curly-in-string
    connectorParamsFuncString: 'function (params){\n' +
      '        return {\n' +
      '          boid: params[0],\n' +
      '          filter: params[1],\n' +
      '          pageView: params[2],\n' +
      '        }\n' +
      '    }',
    // 使用的桥接器
    connectorName: 'XmZsApiModel',
    apiFuncName: 'foshanApi'
  },
  "ternalId": "t0000000000ibicsylccd"
}
