$(function(){
    //判断购物车(本地存储)是否有数据
    if(localStorage.getItem("goods")){
        var goodsArr = JSON.parse(localStorage.getItem("goods"));
   
        //ajax请求数据
        $.ajax({
            url : "./data/goods.json",
            type : "get",
            dateType : "json",
            success : function(jsonArr){
                $.each(goodsArr,function(index,item){
                    $.each(jsonArr,function(i,obj){
                        if(item.code === obj.code){
                            var li = `<li>
                                        <input type="checkbox" name="" id="" class="check">
                                        <img src="${obj.imgurl}" alt="">
                                        <h3>${obj.title}</h3>
                                        <p>${obj.price}</p>
                                        <div class="btn">
                                            <button class="del">-</button>
                                            <button class="int">${item.num}</button>
                                            <button class="add">+</button>
                                        </div>
                                        <em code=${item.code}>删除</em>
                                    </li>`
                            $(".list").append(li);
                        }
                    });
                });
            }
        })
        //删除
        $(".list").on("click","li em",function(){
            //获取当前商品的编号
            var code = $(this).attr("code");
            $.each(goodsArr,function(index,item){
                //如果当前商品的编号和数组的某项相同就删除数组的某项
                if(item.code === code){
                    goodsArr.splice(index,1);
                    return false;
                }
            });

            // 如果goodsArr有数据则更新
            if(goodsArr.length > 0){
                localStorage.setItem("goods",JSON.stringify(goodsArr));
            }else {
                localStorage.clear();
                var no = `<li style="line-height:80px; text-align:center; color: #999;">购物车暂无商品，快去加入购物车哦<li>`;
                $(".list").html(no);
            }

            //删除页面节点
            $(this).parent().remove();
            alert("成功移除");
        })
    }else {
        var no = `<li style="line-height:80px; text-align:center; color: #999;">购物车暂无商品，快去加入购物车哦<li>`;
        $(".list").html(no);
    }


    //数量
    var goodsArray = JSON.parse(localStorage.getItem("goods"));
    $(".list").on("click",".del",function(){
        var prev = $(this).siblings(".int");
        var n = parseInt(prev.text());
        if( n <= 1){
            n=1;
           $(this).attr("disabled","disabled");
           return false;
        }
            
        n--;
        prev.text(n);
         //找到当前的code
        var code = $(this).parent().siblings("em").attr("code");
        $.each(goodsArray,function(index,item){
            if(item.code === code){
                item.num--;
            }
        })
        // 重新设置localStorage
        localStorage.setItem("goods",JSON.stringify(goodsArray));


    })

    $(".list").on("click",".add",function(){
        var prev = $(this).siblings(".int");
        var n = parseInt(prev.text());
        if(n>1){
            $(this).siblings(".del").removeAttr("disabled");
        }
        n++;
        prev.text(n);

        //找到当前的code
        var code = $(this).parent().siblings("em").attr("code");
        $.each(goodsArray,function(index,item){
            if(item.code === code){
                item.num++;
            }
        })
        // 重新设置localStorage
        localStorage.setItem("goods",JSON.stringify(goodsArray));
    })


    //全选状态
    $(".all").click(function(){
        if($(this).prop("checked")){
            $(".list .check").prop("checked",true);
            $(".all").prop("checked",true);
        }else {
            $(".list .check").prop("checked",false);
            $(".all").prop("checked",false);
        }
    });

    // 判断是否需要全选
    $(".list").on("click",".check",function(){
        $(".list .check").each(function(index,dom){
            if(!$(dom).prop("checked")){
                $(".all").prop("checked",false);
                return false
            }
            $(".all").prop("checked",true);
        })
      
    })

    //删除选中商品
    var arr = JSON.parse(localStorage.getItem("goods"));
    $(".removes").click(function(){
        $(".list .check:checked").each(function(index,item){
            $(this).parent().remove();
            $(".all").prop("checked",false);
            //找到当前的code
            var code = $(this).siblings("em").attr("code");
            $.each(arr,function(i,obj){
                if(obj.code === code){
                    arr.splice(i,1);
                    return false
                }
            });

            // 如果arr有数据则更新
            if(arr.length > 0){
                localStorage.setItem("goods",JSON.stringify(arr));
            }else {
                localStorage.clear();
                var no = `<li style="line-height:80px; text-align:center; color: #999;">购物车暂无商品，快去加入购物车哦<li>`;
                $(".list").html(no);
                $(".pay").remove();
            }

        })
        
    });
    

    //计算价格
    var arr1 = JSON.parse(localStorage.getItem("goods"));
    $(".goodsList").on("click","input[type=checkbox]",function(){
        var price_all;
        $(".check:checked").each(function(index,item){
            var pri = parseInt($(this).siblings("p").text().slice(1));
            var code = $(this).siblings("em").attr("code");
            var n;
            $.each(arr1,function(index,item){
                if(item.code === code){
                    n=arr1[index].num;
                }
            })
            console.log(n);
            // price_all += $(this).siblings("p")
        })
    })


})

