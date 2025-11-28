Component({
  data: {
    principal: '',
    rate: '',
    years: '',
    result: null as null | string,
  },
  methods: {
    onInputChange(e: any) {
      const key = e.currentTarget.dataset.key;
      this.setData({ [key]: e.detail.value });
    },
    onCalc() {
      const { principal, rate, years } = this.data;
      const p = parseFloat(principal);
      const r = parseFloat(rate) / 100;
      const n = parseInt(years);
      if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || n <= 0) {
        this.setData({ result: '请输入有效数据' });
        return;
      }
      // 复利终值公式：FV = P * (1 + r)^n
      const fv = p * Math.pow(1 + r, n);
      this.setData({ result: fv.toFixed(2) });
    },
  }
});