$(function(){
    //渲染页面
    $.ajax({
        url : "./data/goods.json",
        type : "get",
        dataType : "json",
        success : function(jsonArr){
            $.each(jsonArr,function(index,item){
                var html = `<div class="goods">
                                <img src="${item.imgurl}" alt="">
                                <p>${item.price}</p>
                                <h3>${item.title}</h3>
                                <div code=${item.code}>加入购物车</div>
                            </div>`
                $(".content").append(html);
            })
        }
    })
    //动态元素用事件委托
    $(".content").on("click",".goods div",function(){
        //localStorage goods ==> [{"code": abc1,num: 1},{"code": abc2,num: 1}]
        var goodsArr = [];
        if (localStorage.getItem('goods')) {
            goodsArr = JSON.parse(localStorage.getItem('goods'));
        }
        // 当前商品的编码
        var code = $(this).attr("code");
        //标识是否 goodsArr里面存在code
        var flage = false;
        $.each(goodsArr,function(index,item){
            if(item.code === code){
                item.num++;
                flage = true;
                return false;
            }
        })
        // 如果本地存储没有此商品，则将{"code": code,num: 1}push到goodsArr
        if(!flage){
            goodsArr.push({"code": code,"num": 1});
        }
        // 重新设置localStorage
        localStorage.setItem("goods",JSON.stringify(goodsArr));
    })
})