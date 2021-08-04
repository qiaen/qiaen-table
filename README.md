<h1>Qiae Table 动态表格</h1>

> `qiaen-table` 是一个基于 vue2.6 + element-ui 2.14.x 的动态表头组件，使用`qiaen-table`你可以轻松创建一个表格，表格属性与`el-table`一致

### 效果预览
<img src="https://github.com/qiaen/static/blob/master/18209.gif?raw=true" alt="">

### 安装
私有NPM测试[http://npm.diumx.com/-/web/detail/qiaen-table](http://npm.diumx.com/-/web/detail/qiaen-table "http://npm.diumx.com/-/web/detail/qiaen-table")
### 开始使用
```javascript
// main.js
import Vue from 'vue'

import ElementUI from 'element-ui'
import QiaenTable from 'qiaen-table'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(QiaenTable)
```
#### 在.vue文件中使用`qiaen-table`标签
```html
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
```
```javascript
export default {
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
                        right: '5px',
                    },
                    icon: 'el-icon-goods',
                    size: 'small'
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
        /** 多选信息变动 */
        handleSelectionChange(val) {
            console.log(val)
        },
        /** 第一个参数为要隐藏的，第二个为显示出来的 */
        columnChange(hides, shows) {
            console.log(hides, shows)
        }
    }
}
```

#### props配置说明
| 属性        | 说明   | 描述  |
| --------   | -----:  | :----:  |
| hide-trigger     | 是否隐藏触发按钮 | 非必填：默认false     |
| tableC-class     | el-table的class | 非必填     |
| custom-key-name     | 组件缓存到本地时，使用的key | 非必填     |

> hide-trigger配置成true时，可以使用自定义按钮来触发qiaen-tabl实例的visible = true，即可弹出弹框

```html
<qiaen-table :data="tableData" ref="refGlp" :hide-trigger="true">
    <template>
        <el-table-column type="selection" forbid></el-table-column>
    </template>
</qiaen-table>

<!-- 触发按钮，通过触发qiaen-tabl实例的visible，来弹出弹框，已达到主动控制的功能 -->
<el-button @click="$refs.refGlp.visible = true">调整表头</el-button>

```
#### props默认配置

```javascript
{
    /** 弹出层属性，与el-dialog一致 */
    dialog: {
        title: '请勾选要显示的列',
        class: '',
        width: '50%'
    },
    /** 触发按钮属性，与el-e-button一致 */
    trigger: {
        style: {
            top: '7px',
            right: '0px'
        },
        size: 'small',
        icon: 'el-icon-s-operation'
    }
}
```

> 表格详情配置请点击<a href="https://element.eleme.cn/#/zh-CN/component/table">Table 表格</a>

#### props配置说明 - dialog
| 属性        | 说明   |  描述  |
| --------   | -----:  | :----:  |
| title     | dialog标题 | 非必填：默认请勾选要显示的列     |
| width     | dialog宽度 | 非必填：默认50%     |

> 弹窗详情配置请点击<a href="https://element.eleme.cn/#/zh-CN/component/dialog">Dialog 弹窗</a>
#### props配置说明 - trigger
| 属性        | 说明   |  描述  |
| --------   | -----:  | :----:  |
| style     | Object，按钮样式 | 非必填：默认{ top: '7px', right: '0px' }     |
| size     | 按钮尺寸 | 非必填：默认small ，属性配置和el-button一致      |
| icon     | 按钮图标 | 非必填：默认el-icon-s-operation ，属性配置和el-button一致     |

> 按钮详情配置请点击<a href="https://element.eleme.cn/#/zh-CN/component/button">Button 按钮</a>

#### props配置说明 - events
| 属性        | 说明   |  描述  |
| --------   | -----:  | :----:  |
| @column-change     | 保存列回调 | 非必要，function(显示的列，隐藏的列){}     |
| @selection-change     | el-table的多选 | 非必要     |

> 表格的方法详情配置请点击<a href="https://element.eleme.cn/#/zh-CN/component/table">Table 表格</a>

##### 花木兰 基于 `Vue3` `TS` `Vite`的前端框架
在线预览[http://mulan.diumx.com](http://mulan.diumx.com "http://mulan.diumx.com")
##### 兰陵王 基于 `Vue2.x` `Webpack`的前端框架
在线预览[https://lanling.diumx.com](https://lanling.diumx.com "https://lanling.diumx.com")

