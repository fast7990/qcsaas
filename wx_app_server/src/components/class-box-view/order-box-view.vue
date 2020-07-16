<template>
	<view class="class-box-view flex flex--row flex--justify-content--center flex--align-items--center">
		<scroll-view scroll-y :style="{ height: height + 'px' }" @scrolltolower="onScrolltolower" id="scroolViewBox">
			<!-- 空白页 -->
			<view v-if="!hasLogin || empty === true" class="empty flex flex--row flex--align-items--center">
				<image src="../../static/common/message_none.png" mode="aspectFit" style="margin-top: 40rpx;"></image>
				<view class="empty-tips" style="margin-top: 50rpx;color: #BCBCBC;font-size: 28rpx;">目前没有订单</view>
			</view>
			<view class="class-box-list" v-for="(items, indexs) in lists" :key="items">
				<view class="top-title flex flex--align-items--center flex--justify-content--space-between" style="padding:30rpx;">
					<view class="" style="font-size: 22rpx;color: #9B9B9B;">订单编号：{{ items.order_number }}</view>
					<view class="flex flex--align-items--center" style="color: #19D05F;font-size: 24rpx;">
						<view class="flex" style="width: 14rpx;height: 14rpx;background-color: #19D05F;border-radius: 50%;margin-right: 20rpx;"></view>
						<text>{{ showOrderStatus(items, 1) }}</text>
					</view>
				</view>
				<navigator
					class="flex box flex--align-items--center flex--justify-content--center"
					:url="'./detail?order_number=' + items.order_number + '&show_type=' + open_type"
					v-for="(item, index) in items.products"
					:key="index"
					hover-class="none"
				>
					<view class="left"><image :src="item.product_thumb ? item.product_thumb : '/static/img/cell-img.png'" mode="aspectFill"></image></view>
					<view class="right flex flex--row flex--justify-content--space-between">
						<view class="title-box flex">
							<text class="label">{{ item.product_name | ellipsText(29) }}</text>
							<text
								class="label_2"
								style="display:flex;flex-direction: column-reverse;color: #FA942E;font-size: 24rpx;"
								v-if="items.status == 3 && items.pay_status == 2 && items.logistics_status == 1"
							>
								退款中
							</text>
							<text class="label_2" style="display:flex;flex-direction: column-reverse;color: #FA942E;font-size: 24rpx;" v-if="items.pay_status == 3">退款成功</text>
						</view>
						<view class="text flex flex--justify-content--space-between flex--align-items--center">
							<text>x {{ item.product_num }}</text>
						</view>
					</view>
				</navigator>
				<view class="price-count flex flex--align-items--center flex--justify-content--space-between">
					<view class="flex flex--align-items--center flex--justify-content--space-between" style="flex: 1;">
						<view class="flex flex--align-items--center">
							<text style="color: #ACACAC;">共{{ jisuancount(items) }}件商品</text>
							<text style="text-align: right;color: #ACACAC;margin-left: 30rpx;margin-right: 20rpx;">合计</text>
							<view>
								<text>{{ (Number(items.ticket_amount) + Number(items.star_amount)) | formatPrice(0, 100000) }} 福星/福票</text>
							</view>
						</view>
					</view>
				</view>
				<view class="btn-box flex flex--justify-content--end flex--wrap">
					<view @click="onChangeOrderBtn(items.order_number, 1, items)" class="btn t1" hover-class="btn-hover" v-if="items.status == 1 && items.pay_status == 1">
						取消订单
					</view>
					<view @click="onChangeOrderBtn(items.order_number, 2, items)" class="btn t2" hover-class="btn-hover" v-if="items.status == 1 && items.pay_status == 1">
						去支付
					</view>
					<view @click="onChangeOrderBtn(items.order_number, 4, items)" class="btn t1" hover-class="btn-hover" v-if="items.logistics_status == 2">确认收货</view>
					<view class="" v-if="items.pay_status == 2">
						<view
							@click="onChangeOrderBtn(items.order_number, 5, items)"
							class="btn t1"
							hover-class="btn-hover"
							v-if="items.logistics_status == 2 || items.logistics_status == 3"
						>
							查看物流
						</view>
					</view>
				</view>
				<view class="bgcolorE"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'class-box-view',
	props: ['classBoxViewData', 'height', 'open_type'],
	data() {
		return {
			type: 1,
			product_count: 0,
			lists: this.classBoxViewData,
			empty: false //空白页现实  true|false
		};
	},
	watch: {
		classBoxViewData(n) {
			this.lists = n;
			let num = 0;
			this.lists.map(items => {
				items.products.map(item => {
					num += Number(item.product_num);
				});
			});
			console.log(this.lists, '----');
			this.product_count = num;
			let empty = n.length === 0 ? true : false;
			if (this.empty !== empty) {
				this.empty = empty;
			}
		}
	},
	onReady() {
		let winHeight = wx.getSystemInfoSync().windowHeight;
	},
	computed: {
		...mapState({})
	},
	methods: {
		ellips(text) {
			if (text) {
				if (text.length > 10 && text.length < 20) {
					return text.substring(0, 9) + '...';
				}
				if (text.length > 20) {
					return text.substring(0, 20) + '...';
				}
			}
		},
		jisuancount(items) {
			let num = 0;
			items.products.map(item => {
				num += Number(item.product_num);
			});
			return num;
		},
		onScrolltolower() {
			this.$emit('onScrolltolower', true);
		},
		showOrderStatus(item, type) {
			if (item.status == 1) {
				if (type == 1) {
					if (item.pay_status == 1) {
						//1未支付 2已支付
						return '未支付';
					} else if (item.pay_status == 2) {
						if (item.logistics_status == 1) {
							//1未发货 2已发货 3确认收货
							return '待发货';
						} else if (item.logistics_status == 2) {
							return '已发货';
						} else if (item.logistics_status == 3) {
							if (item.evaluate_status == 1) {
								//评价状态 1未评价 2已评价
								return '未评价';
							} else if (item.evaluate_status == 2) {
								return '已评价';
							} else {
								return '已收货';
							}
						} else {
							return '已付款';
						}
					}
				} else {
					if (item.pay_status == 1) {
						//1未支付 2已支付
						return '未支付';
					} else if (item.pay_status == 2) {
						if (item.logistics_status == 1) {
							//1未发货 2已发货 3确认收货
							return '待发货';
						} else if (item.logistics_status == 2) {
							return '已发货';
						} else if (item.logistics_status == 3) {
							if (item.evaluate_status == 1) {
								//评价状态 1未评价 2已评价
								return '未评价';
							} else if (item.evaluate_status == 2) {
								return '已评价';
							} else {
								return '已收货';
							}
						} else {
							return '已付款';
						}
					} else if (item.pay_status == 3) {
						return '已退款';
					}
				}
			} else if (item.status == 2) {
				if (type == 1) {
					if (item.logistics_status == 1) {
						//1未发货 2已发货 3确认收货
						return '待发货';
					} else if (item.logistics_status == 2) {
						return '已发货';
					} else if (item.logistics_status == 3) {
						return '已收货';
					} else {
						return '订单已完成';
					}
				} else {
					if (item.logistics_status == 1) {
						//1未发货 2已发货 3确认收货
						if (item.pay_status == 3) {
							return '已退款';
						} else {
							return '待发货';
						}
					} else if (item.logistics_status == 2) {
						if (item.pay_status == 3) {
							return '已退款';
						} else {
							return '已发货';
						}
					} else if (item.logistics_status == 3) {
						if (item.pay_status == 3) {
							return '已退款';
						} else {
							if (item.evaluate_status == 1) {
								//评价状态 1未评价 2已评价
								return '未评价';
							} else if (item.evaluate_status == 2) {
								return '已评价';
							} else {
								return '已收货';
							}
						}
					} else {
						return '订单已完成';
					}
				}
			} else if (item.status == 3) {
				if (type == 1) {
					return '订单取消';
				} else {
					if (item.pay_status == 2) {
						//1未支付 2已支付
						return '退款中';
					} else if (item.pay_status == 3) {
						return '已退款';
					} else {
						return '订单取消';
					}
				}
			}
		},
		onChangeOrderBtn(order_number, type, item) {
			console.log(order_number, type);
			let data = {
				order_number: order_number,
				type: type,
				item: item
			};
			this.$emit('onChangeOrderBtn', data);
		}
	}
};
</script>

<style lang="scss">
.class-box-list {
	/* 空白页 */
	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 80%;
		padding-bottom: 50rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;

		image {
			width: 222rpx;
			height: 306rpx;
			margin-bottom: 30rpx;
		}

		.empty-tips {
			display: flex;
			font-size: 30rpx;
			color: #333333;
			.navigator {
				color: #333333;
				margin-left: 16rpx;
			}
		}
	}

	.box {
		flex: 1;
		margin: 0;
		padding-left: 30rpx;
		padding-right: 30rpx;

		.left {
			width: 110rpx;
			height: 110rpx;
			border-radius: 12rpx;
			position: relative;
			margin-right: 26rpx;
			overflow: hidden;

			image {
				width: 110rpx;
				height: 110rpx;
			}

			.label {
				width: 100%;
				background: #f6f6f6;
				position: absolute;
				bottom: 0;
				font-size: 24rpx;
				height: 44rpx;
				line-height: 44rpx;
				text-align: center;
				color: #a6a6a6;
			}
		}

		.right {
			flex: 1;
			min-height: 110rpx;

			.title-box {
				font-size: 34rpx;

				image {
					width: 70rpx;
					height: 36rpx;
					vertical-align: middle;
					margin-right: 6rpx;
				}

				.label {
					font-family: PingFangSC-Medium;
					font-weight: 500;
					line-height: 48rpx;
					font-size: 28rpx;
					color: #081425;
					flex: 1;
				}

				.label_2 {
				}
			}

			.text {
				font-size: 24rpx;
				color: #000000;
				margin: 0;
			}
		}
	}

	.price-count {
		font-size: 26rpx;
		margin: 20rpx 30rpx;
	}

	.name {
		margin: 70rpx 30rpx 14rpx;
		color: #999999;
	}

	.address-box {
		margin: 0 30rpx;
		color: #666666;
		margin-bottom: 34rpx;
	}

	.btn-box {
		margin: 0 30rpx;
		padding-bottom: 36rpx;
		font-size: 30rpx;

		.btn {
			min-width: 156rpx;
			height: 60rpx;
			background-color: #ffffff;
			border: 1rpx solid #dddddd;
			color: #a5a5a5;
			text-align: center;
			line-height: 60rpx;
			margin-left: 20rpx;
			border-radius: 30rpx;
			margin-bottom: 10rpx;
		}

		.t2 {
			border: 1rpx solid #3048ff;
			background-color: #3048ff;
			color: #ffffff;
		}
	}
}
</style>
