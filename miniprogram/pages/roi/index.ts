Component({
	data: {
		principal: '',
		final: '',
		years: '',
		result: null as null | string,
	},
	methods: {
		onInputChange(e: any) {
			const key = e.currentTarget.dataset.key;
			this.setData({ [key]: e.detail.value });
		},
		onCalc() {
			const { principal, final, years } = this.data;
			const p = parseFloat(principal);
			const f = parseFloat(final);
			const n = parseInt(years);
			if (isNaN(p) || isNaN(f) || isNaN(n) || p <= 0 || f <= 0 || n <= 0) {
				this.setData({ result: '请输入有效数据' });
				return;
			}
			// 年化收益率公式：r = (F/P)^(1/n) - 1
			const r = Math.pow(f / p, 1 / n) - 1;
			this.setData({ result: (r * 100).toFixed(2) });
		},
	}
});