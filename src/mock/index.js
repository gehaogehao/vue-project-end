import Mock from 'mockjs'
import data from './data.json'

Mock.mock("/api/sellers",{errorno:0,data:data.sellers});
Mock.mock("/api/goods",{errorno:0,data:data.goods});
Mock.mock("/api/ratings",{errorno:0,data:data.ratings});