<template>
    <section class="glp-table">
        <!-- 主表格 -->
        <el-table :data="data" :class="attrs.tableClass" v-bind="attrs" v-on="$listeners" :key="tablekey">
            <slot></slot>
        </el-table>
        <!-- 点击显示弹窗，选择列 -->
        <el-button v-bind="attrs.trigger" v-if="!hideTrigger" @click="visible = true" class="glp-table-trigger"></el-button>
        <!-- 弹窗，选择列 -->
        <el-dialog v-bind="attrs.dialog" :visible.sync="visible" :append-to-body="true" @closed="closed">
            <section class="glp-table-checkbox-section">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange" style="margin-bottom: 10px">全选</el-checkbox>
                <el-checkbox-group v-model="checkedLabel" @change="checkedChange">
                    <el-checkbox v-for="(item, index) in allColumns" :label="item.label || item.type" :key="index" :disabled="item.disabled">
                        <span :title="item.label || item.type">{{ item.label || item.type }}</span>
                    </el-checkbox>
                </el-checkbox-group>
            </section>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="setColumns" size="small">确 定 ({{ checkedLabel.length }}条)</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
/** 默认配置属性 */
const defauleAttrs = {
    dialog: {
        title: '请勾选要显示的列',
        class: '',
        width: '50%'
    },
    trigger: {
        style: {
            top: '7px',
            right: '0px'
        },
        size: 'small',
        icon: 'el-icon-s-operation'
    },
    tableClass: ''
}
export default {
    name: 'qiaen-table',
    props: {
        /** 隐藏触发按钮 */
        hideTrigger: { type: Boolean, default: false },
        /** 表格数据 */
        data: Array,
        /** 所有属性 */
        props: Object,
        /** 用户为此储存表单添加的储存key，默认取location.pathname */
        customKeyName: String
    },
    data() {
        return {
            /** 弹窗标题 */
            visible: false,
            /**已选择的label */
            checkedLabel: [],
            /** 全选相关 */
            isIndeterminate: true,
            checkAll: false,
            /** 全部的表格列 */
            allColumnSlots: [],
            tablekey: ''
        }
    },
    computed: {
        /** 只要有prop属性的都会显示出来，不需要显示在选择项目的，请去除prop属性 */
        allColumns() {
            let slots = this.allColumnSlots
                .map(column => {
                    let propsData = column.componentOptions.propsData
                    let disabled = (column.data.attrs || {}).forbid !== undefined
                    return { ...propsData, disabled }
                })
                .filter(item => item.label || item.type)
            return slots
        },
        /** 所有的列label */
        allColumnsLabel() {
            return this.allColumns.map(item => item.label || item.type)
        },
        /** 只存储要隐藏的key */
        storageKey() {
            return `GlpTableCc_HideColumn_${this.customKeyName || location.pathname}`
        },
        /** 未选择的列label */
        unCheckedLabel() {
            let allColumnsLabel = this.allColumnsLabel
            let checkedLabel = this.checkedLabel
            return allColumnsLabel.filter(item => !checkedLabel.includes(item))
        },
        attrs() {
            /** 用aim替换掉target的属性，aim内没有的属性则使用target的属性 */
            function coverIt(aim, target) {
                for (let i in aim) {
                    if (target.hasOwnProperty(i) && typeof target[i] === 'object') {
                        coverIt(aim[i], target[i])
                    } else {
                        target[i] = aim[i]
                    }
                }
                return target
            }
            let props = this.$props.props
            if (props) {
                let temp = JSON.parse(JSON.stringify(defauleAttrs))
                return coverIt(props, temp)
            } else {
                return defauleAttrs
            }
        }
    },
    methods: {
        /** 点击全选按钮 */
        checkAllChange(val) {
            this.checkAll = val
            this.checkedLabel = val ? this.allColumns.map(item => item.label || item.type) : this.allColumns.filter(item => item.disabled).map(item => item.label || item.type)
            this.isIndeterminate = false
            return this.checkedLabel
        },
        /** 已选中 变动  */
        checkedChange(value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.allColumns.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.allColumns.length
        },
        /** 弹窗关闭后执行 */
        closed() {
            if (this.lastCheckedLabel) {
                /** 关闭还原 */
                this.checkedLabel = this.lastCheckedLabel
                this.checkedChange(this.checkedLabel)
            }
        },
        /** 保存选中信息，重新渲染table */
        setColumns() {
            /** 已选中的列信息 */
            let checkedLabel = this.checkedLabel
            /** 要显示的slot */
            let showSlots = this.allColumnSlots.filter(item => {
                let propsData = item.componentOptions.propsData
                return checkedLabel.includes(propsData.label || propsData.type)
            })
            this.$slots.default = showSlots
            this.visible = false
            /** 表格key */
            this.tablekey = JSON.stringify(checkedLabel)
            /** 储存上次的选项 */
            this.lastCheckedLabel = checkedLabel
            this.save()
        },
        /** 存储信息，没有则删除 */
        save() {
            let checkedLabel = this.checkedLabel
            let unselected = this.unCheckedLabel
            this.$emit('column-change', unselected, checkedLabel)

            if (unselected.length) {
                localStorage[this.storageKey] = JSON.stringify(unselected)
            } else {
                delete localStorage[this.storageKey]
            }
        },
        /** 初始化设定，选中的列 */
        setCheckList(val) {
            let checkedLabel = this.checkAllChange(true)
            this.lastCheckedLabel = checkedLabel
            this.checkedChange(checkedLabel)
        }
    },
    created() {
        this.allColumnSlots = this.$slots.default
        let storage = localStorage[this.storageKey]
        if (storage) {
            try {
                storage = JSON.parse(storage)
                let checkedLabel = this.allColumnsLabel.filter(item => !storage.includes(item))
                this.checkedLabel = checkedLabel
                this.checkedChange(checkedLabel)
                this.setColumns()
            } catch (err) {
                this.setCheckList(true)
            }
        } else {
            this.setCheckList(true)
        }
    }
}
</script>
<style lang="less">
.glp-table {
    position: relative;
    .glp-table-trigger {
        position: absolute;
        z-index: 1;
    }
}
.glp-table-checkbox-section {
    .el-checkbox-group {
        display: grid;
        grid-template-columns: repeat(5, 20%);
        .el-checkbox {
            margin-bottom: 5px;
        }
    }
}
</style>