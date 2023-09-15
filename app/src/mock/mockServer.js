//先引入mockjs模块
import Mock from 'mockjs';
//把json数据格式引入进来
import banner from './banner.json';
import floor from './floor.json'
//两个json并没有直接对外暴漏，但却直接引了 原因是 webpack默认对外暴露的：图片、JSON格式

//mock数据：第一个参数请求地址 第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟大的轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor})

