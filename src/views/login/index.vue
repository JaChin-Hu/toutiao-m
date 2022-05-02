<template>
  <div class="login-container">
    <van-nav-bar title="登录"/>

    <van-form ref="loginForm" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="user.mobile"
          name="mobile"
          required
          label="手机号码"
          placeholder="请输入手机号码"
          :rules="userFormRules.mobile"
          type="number"
          maxlength="11"
        />
        <van-field
          v-model="user.code"
          type="number"
          name="code"
          required
          label="验证码"
          placeholder="请输入验证码"
          :rules="userFormRules.code"
          maxlength="6"
        >
          <template #button>
            <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s" @finish="isCountDownShow = false"/>
            <van-button v-else @click="onSendSms" class="send-sms" round size="small" type="default">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13888888123',
        code: '246810'
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8|9]\d{9}/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /\d{6}/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log(err)
      }
      this.isCountDownShow = true
      try {
        await sendSms(this.user.mobile)
      } catch (e) {
        this.isCountDownShow = false
        this.$toast('发送失败')
      }
    },
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功')
      } catch (e) {
        if (e.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登陆失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .send-sms {
    background-color: #ededed;
  }
}
</style>
