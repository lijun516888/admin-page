<template>
	<el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogFormVisible">
		<el-form ref="dataForm" :model="plan" label-position="left" label-width="70px" style="width: 100%; height: 50vh;overflow-y: scroll;">
			<el-form-item label="计划名称" prop="name">
		        <el-input v-model="plan.name" clearable/>
		    </el-form-item>
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
		methods: {
			create() {
				this.dialogFormVisible = true
				this.dialogStatus = 'create'
				this.$nextTick(() => {
			    	this.$refs['dataForm'].clearValidate()
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
			}
		}
	}
</script>