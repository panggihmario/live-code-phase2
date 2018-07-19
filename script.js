new Vue({
    el: "#app",
    data : {
        name :'',
        email : '',
        image : '',
        allimage : []
    },
    methods:{
        login : function(){
            axios.post('http://35.240.157.177/request-token',{
                name : this.name,
                email:this.email
            })
            .then(function(data){
                console.log(data)
                localStorage.setItem('key',data.data.uuid)
                // console.log(data.data)
            })
        },
        upload :function(param){
            // console.log(param)
            let token = localStorage.getItem('key')
            console.log(token)
            let formData = new FormData()
            formData.append('file',this.image)
            // console.log(formData)
            // console.log(this.image)
            axios.post('http://35.240.157.177/image',formData,{
                headers :{
                    authorization : token
                }
            })
            .then(function(){
                console.log('succes')
            })
            .catch(function(){
                console.log('erorr')
            })

        },
        changeImage : function(data){
            console.log(data)
           this.image = data.target.files[0]
        },
        getImage : function(){
            let token = localStorage.getItem('key')
            axios.get('http://35.240.157.177/image',{
                headers : {
                    authorization : token
                }
            })
            .then(function(response){
                console.log(response.data)
               this.allimage = response.data
            })
        }
    },
    created(){
        this.getImage()
    }
})