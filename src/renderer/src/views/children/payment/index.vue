<template>
<div class="payment-main">

  <div class="desktop-main-title">
    <h2>选择你的付款计划</h2>
  </div>

  <el-row style="margin-left: 20px;">

    <el-col :span="8" v-for="(item,index) in paymentList">
      <div class="plan">
        <div class="inner">
			<span class="pricing">
				<span v-html="item.money">
				</span>
			</span>
          <p class="title">{{item.title}}</p>
          <p class="info">{{item.info}}</p>
          <ul class="features">
            <li>
					<span class="icon">
						<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0h24v24H0z" fill="none"></path>
							<path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
						</svg>
					</span>
              <span v-html="item.tips1"></span>
            </li>
            <li>
					<span class="icon">
						<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0h24v24H0z" fill="none"></path>
							<path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
						</svg>
					</span>
              <span  v-html="item.tips2"></span>
            </li>
            <li>
					<span class="icon">
						<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0h24v24H0z" fill="none"></path>
							<path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
						</svg>
					</span>
              <span v-html="item.tips3"></span>
            </li>
          </ul>
          <div class="action">
            <a class="button" href="#" @click="selectedPay">
              选择我
            </a>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>

</div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      paymentList: [
        {
          money: '￥9.9 <small>/ 55积分</small>',
          title: '体验版',
          info: '首次尝试专属体验，低成本了解产品核心功能，为您的选择提供保障。',
          tips1: '积分长期有效',
          tips2: '<strong>超值</strong>价格',
          tips3: '免费升级到正式版'
        },
        {
          money: '￥99 <small>/ 600积分</small>',
          title: '标准版',
          info: '高性价比套餐，涵盖更多功能与服务，是个人和小团队的理想选择。',
          tips1: '提供专业技术支持',
          tips2: '性价比优选',
          tips3: '赠送实用工具包'
        },
        {
          money: '￥199 <small>/ 1500积分</small>',
          title: '高级版',
          info: '全面服务方案，享受顶级功能支持，助力团队快速成长。',
          tips1: '专属客户经理',
          tips2: '<strong>VIP</strong>优先服务',
          tips3: '定制化解决方案'
        }
      ]
    }
  },
  methods:{
    selectedPay(e){
      e.preventDefault()
    }
  }
}
</script>

<style >
@import "./index.css";
.desktop-main-title{
  width: auto;
  height: 100px;
  line-height: 100px;
  margin-left: 30px;
}
</style>
