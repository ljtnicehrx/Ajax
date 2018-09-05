function obj2str(data) {
    data.t=(new Date().getTime());
    var res=[];
    for(var key in data){
        res.push(encodeURIComponent(key)+"="+encodeURIComponent(data[key]));//中文转码
    }
    return  res.join("&");
}
function ajax(option) {
    //0、将对象转换为字符串
        var str = obj2str(option.data);

    //1、创建一个异步对象
    var xmlHttp, timer;
    if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    }
    else{
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //2、设置发送类型和发送地址
    if(option.type.toLowerCase()==="get")
    {
        xmlHttp.open(option.type,option.url+"?"+str,true)
        //3、发送请求
        xmlHttp.send();

    }
    else{
        //2、设置发送类型和发送地址
        xmlHttp.open(option.type,option.url,true)
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //3、发送请求
        xmlHttp.send(str);
    }
        //4、监听状态变化
    xmlHttp.onreadystatechange=function(ev2){
        if(xmlHttp.readyState===4){
            clearInterval(timer);
            if(xmlHttp.status>=200&&xmlHttp.status<=300||xmlHttp===304){
                //5、返回处理结果
                option.success(xmlHttp);
            }
            else
            {
                option.error(xmlHttp);
            }
        }
    }
   //判断是否传入了超时时间
    if(option.timeout){
        timer=setInterval(function () {
            console.log("nihao");
            xmlHttp.abort();
            clearInterval(timer);
        },option.timeout)
    }
}