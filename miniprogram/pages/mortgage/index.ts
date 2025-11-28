Component({
	data: {
		// tab: 0-商贷/公积金, 1-组合
		tabIndex: 0,
		// 商业/公积金贷款
		total: '',
		rate: '',
		// 组合贷款
		businessTotal: '',
		fundTotal: '',
		businessRate: '',
		fundRate: '',
		// 年限选择
		yearOptions: [5, 10, 15, 20, 25, 30],
		yearIndex: 4, // 默认25年
		// 还款方式
		repayType: 'debx', // debx: 等额本息, debj: 等额本金
		// 结果
		monthly: '',
		interest: '',
		totalPay: '',
	},
	methods: {
		onTabChange(e: any) {
			// dataset.index 可能为字符串，需转为数字
			const idx = Number(e.currentTarget.dataset.index);
			this.setData({ tabIndex: idx }, () => {
				this.onReset();
			});
		},
		onInputChange(e: any) {
			const key = e.currentTarget.dataset.key;
			this.setData({ [key]: e.detail.value });
		},
		onYearChange(e: any) {
			this.setData({ yearIndex: e.detail.value });
		},
		onRepayTypeChange(e: any) {
			this.setData({ repayType: e.detail.value });
		},
		onCalc() {
			const { tabIndex, yearOptions, yearIndex, repayType } = this.data;
			const years = yearOptions[yearIndex];
			const n = years * 12;
			let monthly = 0, interest = 0, totalPay = 0;
			if (tabIndex === 0) {
				// 商业/公积金贷款
				const P = parseFloat(this.data.total) * 10000;
				const r = parseFloat(this.data.rate) / 100 / 12;
				if (isNaN(P) || isNaN(n) || isNaN(r) || P <= 0 || n <= 0 || r < 0) {
					this.setData({ monthly: '', interest: '', totalPay: '' });
					wx.showToast({ title: '请输入有效数据', icon: 'none' });
					return;
				}
				if (repayType === 'debx') {
					// 等额本息
					const pow = Math.pow(1 + r, n);
					monthly = P * r * pow / (pow - 1);
					totalPay = monthly * n;
					interest = totalPay - P;
				} else {
					// 等额本金
					const m1 = P / n;
					let total = 0;
					for (let i = 0; i < n; i++) {
						total += m1 + (P - m1 * i) * r;
					}
					monthly = m1 + P * r;
					totalPay = total;
					interest = total - P;
				}
			} else {
				// 组合贷款
				const Pb = parseFloat(this.data.businessTotal) * 10000;
				const Pf = parseFloat(this.data.fundTotal) * 10000;
				const rb = parseFloat(this.data.businessRate) / 100 / 12;
				const rf = parseFloat(this.data.fundRate) / 100 / 12;
				if (isNaN(Pb) || isNaN(Pf) || isNaN(n) || isNaN(rb) || isNaN(rf) || (Pb + Pf) <= 0 || n <= 0 || rb < 0 || rf < 0) {
					this.setData({ monthly: '', interest: '', totalPay: '' });
					wx.showToast({ title: '请输入有效数据', icon: 'none' });
					return;
				}
				let mb = 0, mf = 0, tb = 0, tf = 0, ib = 0, ifu = 0;
				if (repayType === 'debx') {
					// 等额本息
					const powb = Math.pow(1 + rb, n);
					mb = Pb * rb * powb / (powb - 1);
					tb = mb * n;
					ib = tb - Pb;
					const powf = Math.pow(1 + rf, n);
					mf = Pf * rf * powf / (powf - 1);
					tf = mf * n;
					ifu = tf - Pf;
					monthly = mb + mf;
					totalPay = tb + tf;
					interest = ib + ifu;
				} else {
					// 等额本金
					const m1b = Pb / n, m1f = Pf / n;
					let totalb = 0, totalf = 0;
					for (let i = 0; i < n; i++) {
						totalb += m1b + (Pb - m1b * i) * rb;
						totalf += m1f + (Pf - m1f * i) * rf;
					}
					mb = m1b + Pb * rb;
					mf = m1f + Pf * rf;
					monthly = mb + mf;
					totalPay = totalb + totalf;
					interest = totalPay - (Pb + Pf);
				}
			}
			this.setData({
				monthly: monthly ? monthly.toFixed(2) : '',
				interest: interest ? interest.toFixed(2) : '',
				totalPay: totalPay ? totalPay.toFixed(2) : '',
			});
		},
		onReset() {
			if (this.data.tabIndex === 0) {
				this.setData({
					total: '',
					rate: '',
					monthly: '',
					interest: '',
					totalPay: '',
					// 清空组合贷款相关字段，防止切换回来有脏数据
					businessTotal: '',
					fundTotal: '',
					businessRate: '',
					fundRate: '',
				});
			} else {
				this.setData({
					businessTotal: '',
					fundTotal: '',
					businessRate: '',
					fundRate: '',
					monthly: '',
					interest: '',
					totalPay: '',
					// 清空单一贷款相关字段
					total: '',
					rate: '',
				});
			}
		},
	}
});