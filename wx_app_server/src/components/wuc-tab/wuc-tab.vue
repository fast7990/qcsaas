<template>
	<scroll-view class="wuc-tab" :class="tabClass" :style="tabStyle" scroll-with-animation scroll-x :scroll-left="scrollLeft">
		<div v-if="!textFlex">
			<div
				class="wuc-tab-item"
				:class="[index === tabCur ? selectClass + ' cur' : '']"
				v-for="(item, index) in tabList"
				:key="index"
				:id="index"
				@tap="tabSelect(index, $event)"
			>
				<text :class="item.icon"></text>
				<span>{{ item.name }}</span>
				<view class="border-btm"></view>
			</div>
		</div>

		<div class="flex text-center" v-if="textFlex">
			<div
				class="wuc-tab-item flex-sub"
				:class="index === tabCur ? selectClass + ' cur' : ''"
				v-for="(item, index) in tabList"
				:key="index"
				:id="index"
				@tap="tabSelect(index, $event)"
			>
				<text :class="item.icon"></text>
				<span>{{ item.name }}</span>
				<view class="border"></view>
			</div>
		</div>
	</scroll-view>
</template>
<script>
export default {
	name: 'wuc-tab',
	data() {
		return {};
	},
	props: {
		tabList: {
			type: Array,
			default() {
				return [];
			}
		},
		tabCur: {
			type: Number,
			default() {
				return 0;
			}
		},
		tabClass: {
			type: String,
			default() {
				return '';
			}
		},
		tabStyle: {
			type: String,
			default() {
				return '';
			}
		},
		textFlex: {
			type: Boolean,
			default() {
				return false;
			}
		},
		selectClass: {
			type: String,
			default() {
				return 'text-blue';
			}
		}
	},
	methods: {
		tabSelect(index, e) {
			if (this.currentTab === index) return false;
			this.$emit('update:tabCur', index);
			this.$emit('change', index);
		}
	},
	computed: {
		scrollLeft() {
			return (this.tabCur - 1) * 60;
		}
	}
};
</script>
<style>
div,
scroll-view,
swiper {
	box-sizing: border-box;
}
.wuc-tab {
	white-space: nowrap;
}
.wuc-tab-item {
	height: 90rpx;
	display: inline-block;
	line-height: 86rpx;
	margin: 0 10rpx;
	padding: 0 20rpx;
}

.wuc-tab-item.cur .border-btm {
	background: #fdb400;
	height: 4rpx;
	width: 50rpx;
	margin: 0 auto;
}

.wuc-tab.fixed {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 1024;
	box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.1);
}

.flex {
	display: flex;
}
.text-center {
	text-align: center;
}
.flex-sub {
	flex: 1;
}
.text-blue {
	color: #0081ff;
}
.text-white {
	color: #ffffff;
}
.bg-white {
	background-color: #ffffff;
}
.bg-blue {
	background-color: #0081ff;
}
.text-orange {
	color: #f37b1d;
}

.text-xl {
	font-size: 36rpx;
}
.select-class {
	color: #fdb400;
}
</style>
