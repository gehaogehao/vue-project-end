
export default (axios,config={})=>{
    if(!config.api) throw new Error('api配置必须存在')
    if(!config.api instanceof Object) throw new Error('api配置必须为对象')

    const httpUtil = {}
    const api = config.api

    for (let name in api){
      const {url,method,isForm,hooks,crosUrl,token} = api[name]

      if(hooks){
        api[name].beforeReq = hooks.beforeReq
        api[name].afterReq = hooks.afterReq
      }

      httpUtil[name] = async (data={})=>{
          if(!data instanceof Object) throw new Error('请求参数必须是对象')
          let transfromData = null

          if(isForm){
            transfromData = new FormData();
            for(let key in data){
                transfromData.append(key,data[key])
            }
          }else{
            transfromData = data
          }
          if(crosUrl){
            url = crosUrl + url
            crosUrl=""
          }
          let Authorization = token && token()
          if(Authorization === null || Authorization === undefined){
            Authorization = ''
          }

          let result = '';
          switch (method){
              case 'get':
              case 'delete':
                // url = api[name].beforeReq && api[name].beforeReq(crosUrl,url)
                api[name].beforeReq && api[name].beforeReq()
                result = await axios({
                    url,
                    method,
                    params:transfromData,
                    headers:{
                      Authorization:Authorization
                    }
                })
                api[name].afterReq && api[name].afterReq()
                break;
              case 'post':
              case 'put':
                api[name].beforeReq && api[name].beforeReq()  
                result = await axios({
                    url,
                    method,
                    data:transfromData,
                    headers:{
                      Authorization:Authorization
                    }
                })
                api[name].afterReq && api[name].afterReq()
                break; 
          }
          return result
        }
    }
    return httpUtil
}