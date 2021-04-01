<template>
	<div class="login-page">
		<div id="login-container">
			<div class="segment-control">
				<div class="segment-title" v-for="segment in segments" :key="segment.name" @click="onClickSegment(segment)">
					{{ segment.title }}
					<div class="segment-title_bottom" :class="activeName === segment.name ? ['active'] : []"></div>
				</div>
			</div>
			<separator color="#f4f4f4"></separator>
			<div class="segment-content">
				<div class="input-container">
					<el-input type="tel" v-model="loginForm.username" maxlength="15" placeholder="请输入手机号码"></el-input>
				</div>
				<div class="input-container">
					<el-input show-password v-model="loginForm.password" maxlength="20" placeholder="请输入登录密码"></el-input>
				</div>
				<div class="input-container" v-if="activeName === 'register'">
					<el-input show-password v-model="passwordRepeat" maxlength="20" placeholder="请再次输入登录密码"></el-input>
				</div>
				<div class="error-message">
					{{errorMsg}}
				</div>
				<div class="btn-confirm" @click="onAction">{{activeSegment.title}}</view>
				</div>
			</div>
		</div>
		<div class="login-page__bg"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				segments: {
					'login': {
						name: 'login',
						title: '登录',
						api: 'user/login'
					},
					'register': {
						name: 'register',
						title: '注册',
						api: 'user/register'
					}
				},
				activeName: 'login',
				loginForm: {
					username: '',
					password: '',
				},
				passwordRepeat: '',
				errorMsg: ''
			}
		},
		computed: {
			activeSegment() {
				return this.segments[this.activeName]
			}
		},
		methods: {
			onAction() {
				if (!this.check()) {
					return
				}
				this.errorMsg = ""
				this.$store.dispatch(this.activeSegment.api, this.loginForm).then(() => {
					this.$message({
						message: this.activeSegment.title + '成功',
						type: 'success',
						duration: 3 * 1000
					})
					this.$router.push({
						path: '/'
					})
					this.$store.dispatch('user/getInfo')
				})
			},
			check() {
				if (this.loginForm.username === "" || this.loginForm.password === "") {
					this.errorMsg = "账号或密码不能为空"
					return false
				}
				if (this.activeName === 'register' && this.loginForm.password !== this.passwordRepeat) {
					this.errorMsg = "两次输入密码不一致"
					return false
				}
				return true
			},
			onClickSegment(segment) {
				this.activeName = segment.name
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-page {
		.login-page__bg {
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
			background-color: #f4f4f4;
		}
	}

	#login-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: white;
		margin: auto;
		margin-top: 140px;
		padding: 30px;
		width: 300px;

		border: 1px solid #EBEEF5;
		border-radius: 4px;
		box-shadow: 0px -1px 5px 1px #ececec;
	}

	.segment-control {
		margin-bottom: 20px;
		display: flex;
		flex-direction: row;
		cursor: pointer;

		.segment-title {
			margin: 0px 50px;
			text-align: center;

			.segment-title_bottom {
				height: 4px;
				width: 60px;
				border-radius: 2px;
			}

			.segment-title_bottom.active {
				background-color: #df893f;
			}
		}
	}

	.segment-content {
		margin-top: 10px;
		width: 100%;

		.input-container {
			margin-top: 15px;

			input {
				height: 30px;
				width: 100%;
			}
		}

		.error-message {
			height: 50px;
			line-height: 50px;
			font-size: 14px;
			color: red;
			text-align: center;
		}

		.btn-confirm {
			cursor: pointer;
			text-align: center;
			border-radius: 7px;
			color: white;
			height: 40px;
			line-height: 40px;
			background: linear-gradient(90deg, #53acf2 0%, #5364f2 100%);
		}
	}
</style>
