export default {
    // baseURL:"http://localhost:4000",
    timeout:10000,
    api:{
        getPosition:{
            url:'/position/40.10038,116.36867',
            method:'get',
            crosUrl:"/4000",
            hooks:{
                // beforeReq(crosUrl,url){
                //     console.log(url);
                //     if(url !== '/4000/position/40.10038,116.36867'){
                //         url = crosUrl + url
                //         return url
                //     }else{
                //         return url
                //     }
                // },
                beforeReq(){},
                afterReq(){}
            }
        },
        getIndexCategory:{
            url:'/index_category',
            method:'get',
            crosUrl:"/4000",
            token(){
                return localStorage.getItem('ele-token')
            }
        },
        getShops:{
            url:'/shops',
            method:'get',
            crosUrl:"/4000",
            token(){
                return localStorage.getItem('ele-token')
            }
        }
    },
    hooks:{
        beforeReq(){
        },
        afterReq(){}
    }
}