Component({
	data: {
		amount: '',
		rate: '',
		years: '',
		// 下拉周期选项
		periodOptions: ['每月', '每两周', '每周'],
		periodIndex: 0,
		freq: '12', // 默认每月
		// 结果分组
		principal: '',
		profit: '',
		final: '',
	},
	methods: {
		onInputChange(e: any) {
			const key = e.currentTarget.dataset.key;
			this.setData({ [key]: e.detail.value });
		},
		onPeriodChange(e: any) {
			const idx = e.detail.value;
			let freq = '12';
			if (idx == 1) freq = '26';
			if (idx == 2) freq = '52';
			this.setData({ periodIndex: idx, freq });
		},
		onCalc() {
			const { amount, rate, years, freq } = this.data;
			const a = parseFloat(amount);
			const r = parseFloat(rate) / 100;
			const n = parseInt(years);
			const m = parseInt(freq);
			if (isNaN(a) || isNaN(r) || isNaN(n) || isNaN(m) || a <= 0 || n <= 0 || m <= 0) {
				this.setData({ principal: '', profit: '', final: '' });
				return;
			}
			// 定投终值公式：FV = A * [(1 + i)^(n*m) - 1] / i
			// i = r / m
			const i = r / m;
			const periods = n * m;
			const fv = a * (Math.pow(1 + i, periods) - 1) / i;
			const principal = a * periods;
			const profit = fv - principal;
			this.setData({
				principal: principal.toFixed(2),
				profit: profit.toFixed(2),
				final: fv.toFixed(2)
			});
		},
		onReset() {
			this.setData({
				amount: '',
				rate: '',
				years: '',
				periodIndex: 0,
				freq: '12',
				principal: '',
				profit: '',
				final: ''
			});
		}
	}
});