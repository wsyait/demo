<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo - 1)">上一页</button>
    <button v-show="startNunAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startNunAndEndNum.start > 2">···</button>
    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNunAndEndNum.end"
      :key="index"
      v-if="page >= startNunAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">
      {{ page }}
    </button>

    <button v-if="startNunAndEndNum.end < totalPage - 1" >···</button>
    <button v-if="startNunAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>
  
  <script>
export default {
  name: "Pagination",
  props: ["pageSize", "pageNo", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //连续处连续的页码的起始数字与结束数字（连续页码的数字：至少是5）
    startNunAndEndNum() {
      //解构赋值：是将对象的属性与方法快速批量赋值给一系列变量的简洁语法
      //赋值结构（意义 不用以后的书写当中继续写this.continues了，而是直接写continues）、
      //右侧对象的属性将被赋值给左侧的变量（属性名与对象名一致）
      const { continues, pageNo, totalPage } = this;
      //连续页码数字5（就是至少5页），如果出现不正常的现象（就是不够五页）
      //不正常的现象（总页数没有连续页码多）
      let start = 0,
        end = 0;
      if (continues > totalPage) {
        //总页数少于连续页码数
        start = 1;
        end = this.totalPage;
      } else {
        //正常现象（连续页码数5，总页数一定是大于五）
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //把出现不正常的现象（start数字出现0|-1）进行纠正
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //把出现不正常的现象（end数字大于总页码）纠正
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      //返回两个数据得用对象的形式
      return { start, end };
    },
  },
};
</script>
  
  <style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background-color: skyblue;
}
</style>