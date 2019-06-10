<template>
	<el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogFormVisible">
		<el-form ref="planForm" :model="plan" label-position="left" label-width="70px">
			<el-tabs v-model="activeName">
		    	<el-tab-pane label="用户管理" name="userManage">
		    		<el-form-item label="计划名称" prop="name">
			        	<el-input v-model="plan.name" clearable/>
			    	</el-form-item>
		    	</el-tab-pane>
		    	<el-tab-pane label="配置管理" name="second">
		    		<div style="height: 300px;">
					  <el-steps direction="vertical" :active="1">
					    <el-step title="步骤 1"></el-step>
					    <el-step title="步骤 2"></el-step>
					    <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
					  </el-steps>
					</div>
		    	</el-tab-pane>
		    	<el-tab-pane label="角色管理" name="third">
		    		<el-upload
					  class="upload-demo"
					  ref="upload"
					  multiple
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :file-list="fileList"
					  :auto-upload="false">
					  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
		    	</el-tab-pane>
		    	<el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
		  	</el-tabs>
		</el-form>
		<div slot="footer" class="dialog-footer">
	      <el-button @click="dialogFormVisible = false">取消</el-button>
	      <el-button :loading="btnLoading" type="primary" @click="savePlan()">保存</el-button>
	    </div>
	</el-dialog>
</template>
<script type="text/javascript">
	export default {
		name: 'planForm',
		data() {
			return {
				activeName: 'userManage',
				btnLoading: false,
				name: 'A计划',
				dialogFormVisible: false,
				dialogStatus: '',
				dialogTitleMap: {
					create: '创建',
					edit: '编辑'
				},
				plan: {
					name: ''
				}
			}
		},
		created() {
			
		},
		watch: {
			dialogFormVisible: function() {
				this.resetPlanData()
			}
		},
		methods: {
			create() {
				this.dialogFormVisible = true
				this.dialogStatus = 'create'
				this.$nextTick(() => {
			    	this.$refs['planForm'].clearValidate()
			    })
			},
			edit(id) {
				this.dialogFormVisible = true
				this.dialogStatus = 'edit'
				const _this = this
				// ajax请求获取对象
				_this.plan.name = 'BBB'
			},
			savePlan() {
				this.btnLoading = true
				const _this = this
				_this.dialogFormVisible = false
				_this.$emit('updateRow', _this.plan)
				this.btnLoading = false
			},
			resetPlanData() {
				this.plan = {
					name: ''
				}
			}
		}
	}
</script>