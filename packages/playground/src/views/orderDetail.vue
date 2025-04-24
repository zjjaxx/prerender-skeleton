<template>
  <div class="order-detail">
    <!-- 地址信息 -->
    <div class="address-card">
      <h3>收货地址</h3>
      <div v-if="order.address">
        <p>{{ order.address.receiver }}</p>
        <p>{{ order.address.contact }}</p>
        <p>{{ order.address.fullLocation }} {{ order.address.addressDetail }}</p>
      </div>
      <div v-else class="empty-address">请先添加收货地址</div>
    </div>

    <!-- 商品列表 -->
    <div class="goods-list">
      <div v-for="item in order.items" :key="item.id" class="goods-item">
        <img :src="item.picture" class="goods-image" />
        <div class="goods-info">
          <div class="goods-name">{{ item.name }}</div>
          <div class="goods-spec">{{ item.attrsText }}</div>
          <div class="price-line">
            <span>¥{{ item.price }}</span>
            <span class="qty">x{{ item.quantity }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 金额明细 -->
    <div class="amount-card">
      <h3>订单金额</h3>
      <div class="amount-line">
        <span>商品总额</span>
        <span>¥{{ order.summary.goodsAmount }}</span>
      </div>
      <div class="amount-line">
        <span>运费</span>
        <span>¥{{ order.summary.postFee }}</span>
      </div>
      <div class="amount-line total">
        <span>实付金额</span>
        <span>¥{{ order.summary.totalPay }}</span>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button v-if="order.status === 1">立即支付</button>
      <button>返回列表</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { dispatchRenderEvent } from '@prerender_skeleton/plugin/renderComplate'
interface OrderDetail {
  id: string
  status: number
  address?: Address
  items: Item[]
  summary: Summary
  createTime: string
}

interface Summary {
  goodsAmount: number
  postFee: number
  totalPay: number
}

interface Item {
  id: number
  picture: string
  name: string
  attrsText: string
  price: number
  quantity: number
}

interface Address {
  receiver: string
  contact: string
  fullLocation: string
  addressDetail: string
}
const order = ref<OrderDetail>({
  id: '',
  status: 1,
  address: {
    receiver: '',
    contact: '',
    fullLocation: '',
    addressDetail: '',
  },
  items: [],
  summary: {
    goodsAmount: 0,
    postFee: 0,
    totalPay: 0,
  },
  createTime: '',
})

onMounted(async () => {
  try {
    const response = await axios.get('/mock/order.json')
    order.value = response.data
    setTimeout(()=>{
      dispatchRenderEvent('__renderOver')
    },5000)
    // dispatchRenderEvent('__renderOver')
  } catch (error) {
    console.error('数据加载失败:', error)
  }
})
</script>
<style scoped>
.order-detail {
  padding: 20px;
  background: #f5f5f5;
}

.address-card,
.goods-list,
.amount-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.goods-item {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.goods-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
}

.amount-line {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  &.total {
    font-weight: bold;
    color: #f60;
  }
}

.action-buttons {
  display: flex;
  gap: 15px;
  button {
    flex: 1;
    padding: 12px;
    border-radius: 20px;
    background: #007bff;
    color: white;
    border: none;
  }
}
</style>
