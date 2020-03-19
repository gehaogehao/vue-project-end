export default {
    baseURL:"http://localhost:9000/api",
    timeout:10000,
    api:{
        getContactList:{
            url : "/contactList",
            method : 'get',
            hooks:{
                beforeReq(){},
                afterReq(){}
            }
        },
        createContactByJson:{
            url : "/contact/new/json",
            method : "post"
        },
        createContactByForm:{
            url : "/contact/new/form",
            method : "post",
            isForm : true
        },
        editContact:{
            url : "/contact/edit",
            method : "put"
        },
        delContact:{
            url : "/contact",
            method : 'delete'
        }
    },
    hooks:{
        beforeReq(){},
        afterReq(){}
    }
}