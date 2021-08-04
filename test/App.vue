<template>
    <div id="app">
        <qiaen-table :data="tableData" ref="refGlp" custom-key-name="dataCreate" @column-change="columnChange" @selection-change="handleSelectionChange">
            <template>
                <el-table-column type="selection" forbid></el-table-column>
                <el-table-column label="自定义">
                    <template slot="header"> <i class="el-icon-more"></i>自定义</template>
                    <template slot-scope="scope">
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="50"> </el-table-column>
                <el-table-column prop="date" label="日期" width="110"> </el-table-column>
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column prop="address" min-width="180" show-overflow-tooltip label="地址"> </el-table-column>
                <el-table-column label="设置" min-width="90" forbid>
                    <template slot-scope="scope">
                        {{ scope.row.age >= 18 ? '成年' : '少年' }}
                    </template>
                </el-table-column>
            </template>
        </qiaen-table>
    </div>
</template>
<script>
import qiaenTable from '../src/main'
export default {
    name: 'App',
    components: {
        qiaenTable
    },
    data() {
        return {
            props: {
                border: true,
                dialog: {
                    class: 'zm-dialog'
                },
                tableClass: 'zm-table',
                trigger: {
                    style: {
                        top: '5px',
                        // 'font-size': '18px',
                        right: '5px',
                    },
                    icon: 'el-icon-goods',
                    size: 'small'
                    // type:'text',
                    // plain: true
                }
            },
            tableData: [
                {
                    date: '2016-05-02',
                    age: 12,
                    name: '张三',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    age: 14,
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    age: 21,
                    name: '李四',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    age: 81,
                    name: '王文渊',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ]
        }
    },
    methods: {
        handleSelectionChange(val) {
            console.log(val)
        },
        /** 第一个参数为要隐藏的，第二个为显示出来的 */
        columnChange(hides, shows) {
            console.log(hides, shows)
        },
        get() {}
    }
}
</script>