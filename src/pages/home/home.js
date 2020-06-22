import { Button } from 'vant'

export default {
    components:{
        [Button.name]:Button  //注册组件
    },
    data () {
        return {
            labels:""
        }
    },
    methods:{
        async getLabelsData(){
            // get请求测试
            let res = await
                this.$Http.getLabels({
                    params:{
                        // 参数拼在url上
                    }
                });
            console.log("get请求测试结果：",res);

            // post请求测试
            let res2 = await
                this.$Http.addLabels({
                    labelName: "参数2"
                });
            console.log("post请求测试结果：",res2);

            // postform请求测试
            let params = {
                shopName: "33",
                customerName: "33",
                tel: "15211111111",
                shopType: 0,
                digType: 1,
                address: "33",
                openTime:"33",
                digTime: "33",
                monthSale: "33",
                digContent:"33",
                memo:"33",
                city: "33",
                location: "33"
            };
            let res3 = await
                this.$Http.getManual(params,true);
            console.log("postform请求测试结果：",res3);
        }
    },
    mounted(){
        this.getLabelsData();
    }
}