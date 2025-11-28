// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    // 九宫格功能项数据
    gridList: [
      { icon: 'yuan', text: '复利计算', page: '/pages/compound/index' },
      { icon: 'clock', text: '定投计算', page: '/pages/fixed/index' },
      { icon: 'bag', text: '收益率计算', page: '/pages/roi/index' },
      { icon: 'branch', text: '分期利率计算', page: '/pages/installment/index' },
      { icon: 'house', text: '房贷计算', page: '/pages/mortgage/index' },
      { icon: 'data', text: '便捷数据查询', page: '/pages/dataquery/index' },
      { icon: 'monitor', text: '好价格计算', page: '/pages/goodprice/index' },
      { icon: 'monitor-auto', text: '好价格自动计算', page: '/pages/goodpriceauto/index' },
      { icon: 'chart', text: '估值计算', page: '/pages/valuation/index' },
    ],
  },
  methods: {
    // 九宫格点击跳转
    onGridTap(e: any) {
      const { page } = e.currentTarget.dataset
      if (page) {
        wx.navigateTo({ url: page })
      }
    },
    // ...existing code...
    // ...仅保留九宫格跳转方法...
  },
})
