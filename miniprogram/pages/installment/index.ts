Component({
	data: {
		total: '',
		periods: '',
		payment: '',
		result: null as null | string,
	},
	methods: {
		onInputChange(e: any) {
			const key = e.currentTarget.dataset.key;
			this.setData({ [key]: e.detail.value });
		},
		onCalc() {
			const { total, periods, payment } = this.data;
			const P = parseFloat(total);
			const n = parseInt(periods);
			const A = parseFloat(payment);
			if (isNaN(P) || isNaN(n) || isNaN(A) || P <= 0 || n <= 0 || A <= 0) {
				this.setData({ result: '请输入有效数据' });
				return;
			}
			// 近似求解等额本息年化利率（IRR，牛顿迭代法）
			let r = 0.05; // 初始猜测年利率 5%
			let iter = 0;
			let maxIter = 30;
			let tol = 1e-7;
			let f, df;
			while (iter < maxIter) {
				let monthly = r / 12;
				f = P;
				df = 0;
				for (let i = 1; i <= n; i++) {
					f -= A / Math.pow(1 + monthly, i);
					df += (i * A) / Math.pow(1 + monthly, i + 1) / 12;
				}
				if (Math.abs(f) < tol) break;
				r = r + f / df;
				iter++;
			}
			this.setData({ result: (r * 100).toFixed(2) });
		},
	}
});