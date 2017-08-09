/**
 * Created by think on 2017/2/18.
 */

var getEle=(function(){

    /*1.函数名getEleChildren()
     * 功能描述：获取指定元素下的所有指定元素节点，当第二个参数不选的则返回该对象的素所有有子元素节点。
     * 思路：获取素有节点，判断是否是元素节点，标签名是否为指定标签名
     * */

    function getEleChildren(obj,tagName){
        var ary=[];
        var oChild=obj.childNodes;
        //若有第二个参数，并且第二个从参数的tagName==1,说明获取指定元素
        if(typeof tagName == "string"){
            for(var i=0;i<oChild.length;i++){
                if(oChild[i].nodeType==1&&oChild[i].tagName==tagName.toUpperCase()){
                    ary.push(oChild[i]);
                }
            }
            return ary;
        }else{//否则就是获取所有的子节点
            for(var j=0;j<oChild.length;j++){
                if(oChild[j].nodeType==1){
                    ary.push(oChild[j]);
                }
            }
            return ary;
        }
    }
/*----------------------------------*/
    /*2.函数名getNextEle()
     * 功能描述：获取指定元素的下一个兄弟节点
     * 思路：利用递归思想循环调用方法本身，知道找到下一个兄弟节点
     * */
    function getNextEle(node){
        var node = node.nextSibling;
        //若节点类型是1 ，正好返回
        if(node.nodeType==1){
            return node;
        }
        //否则执行这条语句，如果它还要子节点的话
        if(node.nextSibling){
            //递归一下，就是在调用自己与运算，不要忘记return；
            return arguments.callee(node);
        }
        //若没有子节点了，则返回一个null
        //如果一个方法应该有返回值，但有无法计算出结果，则应该返回null
        return null;
    }

/*----------------------------------------*/
    /*3.函数名getPreEle
     * 获取指定元素的上一个兄弟元素节点
     * 思路：利用递归思想，循环调用方法本身，直到找到上一个兄弟节点
     * */

    function getPreEle(node){
        var node = node.previousSibling;
        if(node.nodeType==1){
            return node;
        }
        if(node.previousSibling){
            return arguments.callee(node);
        }
        return null;
    }

/*-------------------------------------------*/
    /*
     * 4.函数名getNextAll()
     * 功能描述：获取指定元素的，指定标签名的弟弟元素节点
     * 若不写第二个参数，则获取所有的弟弟节点
     * */

    function getNextAll(ele,tagName){
        var ary =[];
        function getNextOne(curEle){
            var next=curEle.nextSibling;
            while(next){
                if(next.nodeType==1){
                    return next;
                }
                next=next.nextSibling;
            }
            return null;
        }

        var next = getNextOne(ele);

        if(typeof tagName=="string"){
            while(next){
                if(next.tagName.toLowerCase()==tagName.toLowerCase()){
                    ary.push(next);
                }
                next = getNextOne(next);
            }
        }else{
            while(next){
                ary.push(next);
                next=getNextOne(next);
            }
        }
        return ary;
    }

/*-----------------------------------------------*/

    /*
     * 5.函数名getPreAll()
     * 功能描述：获取指定元素的，指定标签名的哥哥元素
     * 若第二个参数为undefined，则获取所有的哥哥元素
     *
     * */

    function getPreAll(ele,tagName){
        var ary =[];
        function getPreOne(curEle){
            var pre = curEle.previousSibling;
            while(pre){
                if(pre.nodeType==1){
                    return pre;
                }
                pre = pre.previousSibling;
            }
            return null;
        }

        var pre = getPreOne(ele);
        if(typeof tagName=="string"){
            while(pre){
                if(pre.tagName.toLowerCase()==tagName.toLowerCase()){
                    ary.push(pre);
                }
                pre = getPreOne(pre);
            }

        }else{
            while(pre){
                ary.push(pre);
                pre=getPreOne(pre);
            }
        }

        return ary;
    }
/*------------------------------------*/
    /*
     * 6.函数名getSiblings();
     * 功能描述：获取指定元素的所有兄弟元素
     * 思路：先获取指定元素的父节点，在往下取该父元素下除本元素外的所有子节点
     *
     *
     *
     * */

    function getSiblings(ele){
        var ary=[];
        var curEles=ele.parentNode.children;
        for(var i=0;i<curEles.length;i++){
            if(curEles[i]!=ele&&curEles[i].nodeType==1){
                ary.push(curEles[i]);
            }
        }

        return ary;
    }

    /*--------------------------------------------*/
    /*
     * 7.函数名：getLastEle();
     * 功能描述：获取元素结合中第一个子元素，注意获得数组的第一个值
     * 思路：调用判断哥哥元素的方法，循环判断后将第一个元素放进数组返回
     * */

    function getFirstEle(eles){
        function getPerOne(ele){
            var ele=ele.previousSibling;
            while(ele){
                if(ele.nodeType===1){
                    return ele;
                }
                ele=ele.previousSibling;
            }
            return null;
        }


        var ary=[];

        for(var i=0;i<eles.length;i++){
            if(eles[i]&&eles[i].nodeType&&eles[i].nodeType===1){
                var  ele = getPerOne(eles[i]);
                if(ele==null){
                    ary.push(eles[i]);
                }
            }else{
                throw new Error("参数中的第"+i+"个对象，条件不符合!");
            }
        }
        return ary;
    }

/*-----------------------------------------------------*/

    /*
     * 8.函数名：getLastEle();
     * 功能描述：获取元素结合中最后一个子元素，注意获得数组的最后一个值
     * 思路：调用判断弟弟元素的方法，循环判断后将最后一个元素放进数组返回
     * */

    function getLastEle(eles){

        function getNextOne(ele){
            var ele = ele.nextSibling;
            if(ele.nodeType==1){
                return ele;
            }
            if(ele.nextSibling){
                return arguments.callee(ele);
            }
            return null;
        }

        if(eles&&eles.length&&eles.length>0){
            var ary=[];
            for(var i=0;i<eles.length;i++){
                if(eles[i]&&eles[i].nodeType&&eles[i].nodeType===1){
                    var ele = getNextOne(eles[i]);
                    if(ele==null){
                        ary.push(eles[i]);
                    }
                }else{
                    throw new Error("参数中的第"+i+"个对象，条件不符合!");
                }
            }
            return ary;
        }
    }

/*-------------------------------------------------*/
    /*
     * 9.函数名：inertAfter(oldEle,newEle);
     * 功能描述：在目标元素的后面插入元素，oldEle会被移除掉
     * 获取的oldEle最好是一个子元素
     * */

    function insertAfter(oldEle,newEle){
        if(oldEle.nextSibling){//如果有兄弟节点
            //插入到目标元素第弟节点前面，也就是目标元素的后面
            oldEle.parentNode.insertBefore(newEle,oldEle.nextSibling);
        }else{//如果没有弟弟节点
            oldEle.parentNode.appendChild(newEle);
        }
    }

/*--------------------------------------------------------*/

    /*
     * 10.函数名：insertBefore();
     * 功能描述：在指定元素的前面添加新元素
     *
     * */

    function insertBefore(newNode,oldEle){
        oldEle.parentNode.insertBefore(newNode,oldEle);
    }

/*-----------------------------------------------------*/
    /*
     * 11.函数名：获取元素的索引值的方法
     * 思路：先得到这个父元素的所有元素节点，逐一对比并让计数器加1，
     * 如果有和自己相同的元素，则返回当前的计数
     * */

    function getIndex(ele){

        function getEleChildren(obj,tagName){
            var ary=[];
            var oChild=obj.childNodes;
            //若有第二个参数，并且第二个从参数的tagName==1,说明获取指定元素
            if(typeof tagName == "string"){
                for(var i=0;i<oChild.length;i++){
                    if(oChild[i].nodeType==1&&oChild[i].tagName==tagName.toUpperCase()){
                        ary.push(oChild[i]);
                    }
                }
                return ary;
            }else{//否则就是获取所有的子节点
                for(var j=0;j<oChild.length;j++){
                    if(oChild[j].nodeType==1){
                        ary.push(oChild[j]);
                    }
                }
                return ary;
            }
        }

        if(ele){
            var parent = ele.parentNode;//获取此元素的父亲节点
            var eles = getEleChildren(parent);
            for(var i=0;i<eles.length;i++){
                //一一对比，如果发现自己和某个节点对比是一样的，那么当前的i就是自己的索引值
                if(ele == eles[i]){
                    return i;
                }
            }
        }
    }

    /*-----------------------------------------------------*/
    /*
     * 12.函数名：getPos();
     * 功能描述：获取元素相对于屏幕的距离
     * */

    function getPos(ele){
        var x = ele.offsetLeft;
        var y = ele.offsetTop;
        var p = ele.offsetParent;//一定要理解好offsetParent是什么;

        while(p&&p!=document.body){//解决IE8中BUG
            if(window.navigator.userAgent.indexOf('ESIE 8')>-1){//判断是不是IE8
                x+= p.offsetLeft;
                y+= p.offsetTop;
            }else{
                //clientLeft是左边框的宽。偏移量不包括边框宽，所以要加进去(IE8除外)；
                x+= p.offsetLeft + p.clientLeft;
                y+= p.offsetTop + p.clientTop;
            }

            p= p.offsetParent;
        }
        var obj={};
        obj.x=x;
        obj.y=y;
        return obj;//最简洁的写法是return{x:x,y:y}
    }

    /*--------------------------------------------------*/
    /*
     * 13.函数名：getWin()
     * 功能描述：获取可是窗口的宽度或高度
     * */

    function getWin(attr,value){
        if(typeof value == "undefined"){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }

    /*------------------------------------------------*/

    /*
     * 14.函数名：toJSON()
     * 将JSON格式的字符串转换为JSON类型的JS对象
     *
     * */
    function toJSON(str){
        return "JSON" in window?JSON.parse(str):eval("("+str+")");
    }

  /*-----------------------------------------------------*/
    /*
     * 15.函数名：listToArray();
     * 功能描述：将nodeList类型转化为数组
     * 思路:利用call和数组里面的slice方法
     * */

    function listToArray(eles){
        try{
            return Array.prorotype.slice.call(eles,0);
            //或者使用[].slice.call(eles,0);这样的方式
        }catch(e){
            //在IE6/7里，DOM集合不是JS对象，不能用[].slice.call(eles,0)这样操作，会出现异常。
            var ary=[];
            for(var i=0;i<eles.lengt;i++){
                ary.push(eles[i]);
            }
            return ary;
        }
    }
 /*---------------------------------------------------------*/

    /*
     * 16.函数名：getCss()
     * 功能描述：获取网页元素的CSS属性值的兼容性写法，可以获取行内样式、内联样式和外链样式。
     * 思路：currentStyle属性属于IE的，getComputedStyle属性是标准浏览器的，通过判断解决兼容性。
     * */

    function getCss(ele,attr){
        var val = null;
        var reg = null;
        if(ele&&ele.nodeType==1&&attr&&typeof attr == "string"){
            if("getComputedStyle" in window){//高级浏览器
                val =getComputedStyle(ele,null)[attr];
                return val;
            }else{//低级浏览器
                // alpha(opacity=10)
                if(attr == "filter"){//用个正则匹配这个属性
                    val = ele.currentStyle["filter"];
                    reg = /^alpha\(opacity[=:](\d+(?:\.\d+))?\)$/i;
                    return reg.test(val)?reg.exec(val)[1]/100:1;
                }else{
                    val = ele.currentStyle[attr];
                }
            }
        }
        //匹配内容
        //-200px +200px 22.33px px pt em rem 单位
        reg  = /^([+-]?\d+(\.\d+)?)(px|pt|em|rem)?$/i;
        return reg.test(val)?parseFloat(val):val;
    }

/*------------------------------------------------------------*/

    /*
     * 17.函数名：setCss()
     * 功能描述：给元素设置CSS属性的方法
     * 处理属性兼容性问题
     * */
    //setCss:设置行间样式
    function setCss(curEle, attr, value) {
        //float
        if (attr == 'float') {
            curEle.style.cssFloat = value;//火狐
            curEle.style.styleFloat = value;//ie
            return;
        }
        //透明度的处理
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        //加单位的处理；
        var reg = /(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/;
        if (reg.test(attr)) {
            value += 'px';
        }
        curEle.style[attr] = value;
    }

    /*---------------------------------------------*/
    //18.函数名：setGroupCss:设置一组样式
    function setGroupCss(curEle, options) {
        function setCss(curEle, attr, value) {
            //float
            if (attr == 'float') {
                curEle.style.cssFloat = value;//火狐
                curEle.style.styleFloat = value;//ie
                return;
            }
            //透明度的处理
            if (attr === 'opacity') {
                curEle.style.opacity = value;
                curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
                return;
            }
            //加单位的处理；
            var reg = /(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/;
            if (reg.test(attr)) {
                value += 'px';
            }
            curEle.style[attr] = value;
        }
        if (options.toString() !== '[object Object]') {
            return;
        }
        for (var attr in options) {
            setCss(curEle, attr, options[attr]);
        }
    }
 /*-------------------------------------------------------*/
    //19.css:获取和设置样式
    function css(curEle) {

        //getCss:获取非行间样式
        function getCss(curEle, attr) {
            var val = null;
            var reg = null;
            if ("getComputedStyle") {//高级浏览器
                val = getComputedStyle(curEle, null)[attr];
            }else {//低级浏览器
                if (attr == 'opacity') {// alpha(opacity=10)
                    val = curEle.currentStyle['filter'];
                    reg = /^alpha\(opacity[=:](\d+(?:\.\d+))?\)$/i;
                    return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
                } else {
                    val = curEle.currentStyle[attr];
                }
            }
            reg = /^([+-]?\d+(\.\d+)?)(px|pt|em|rem)?$/i;//-200px +200px 22.33px px pt em rem
            // reg=/^((\+|-)?\d+(\.\d+)?)(px|pt|em|rem)?$/i;
            return reg.test(val) ? parseFloat(val) : val;
        }

        //setCss:设置行间样式
        function setCss(curEle, attr, value) {
            //float
            if (attr == 'float') {
                curEle.style.cssFloat = value;//火狐
                curEle.style.styleFloat = value;//ie
                return;
            }
            //透明度的处理
            if (attr === 'opacity') {
                curEle.style.opacity = value;
                curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
                return;
            }
            //加单位的处理；
            var reg = /(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/
            if (reg.test(attr)) {
                value += 'px';
            }
            curEle.style[attr] = value;
        }

        //setGroupCss:设置一组样式
        function setGroupCss(curEle, options) {
            if (options.toString() !== '[object Object]') {
                return;
            }
            for (var attr in options) {
                setCss(curEle, attr, options[attr])
            }
        }

        var argTwo = arguments[1];
        if (typeof argTwo === 'string') {
            if (typeof arguments[2] !== 'undefined') {// 单个设置
                setCss(curEle, argTwo, arguments[2]);
                return;
            } else {//获取
                return getCss(curEle, argTwo)
            }
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === '[object Object]') {//设置一组样式
            setGroupCss(curEle, argTwo)
        }
    }

/*--------------------------------------------------------------*/

    /*
     * 20.通过类名获取元素，由于IE8一下不兼容所以要写一个方法来做兼容
     * */
    function getElesByClass(strClass,context){
        context=context||document;
        if(context.getElementsByClassName){
            return context.getElementsByClassName(strClass);
        }
        strClass=strClass.replace(/^ +| +$/g,"");
        var aClass=strClass.split(/ +/);
        var eles=context.getElementsByTagName("*");
        for(var i=0;i<aClass.length;i++){
            var str=aClass[i];
            var reg=new RegExp("(?:^| )"+str+"(?: |$)");
            var ary=[];
            for(var j=0;j<eles.length;j++){
                var ele=eles[j];
                if(reg.test(ele.className)){
                    ary.push(ele);
                }
            }
            eles=ary;
        }
        return eles;
    }

/*---------------------------------------------------------------------*/
    /**
     * 21.增加类样式
     */
    function addClass(ele,strClass){
        var reg=new RegExp("(?:^| )"+strClass+"(?: |$)");
        if(!reg.test(ele.className))
            ele.className+=" "+strClass;
    }
/*---------------------------------------------------------*/
    /**
     * 22.删除类样式
     */

    function removeClass(ele,strClass){
        var reg=new RegExp("(?:^| )"+strClass+"(?: |$)","g");
        ele.className=ele.className.replace(reg," ");
    }

 /*-----------------------------------------------------------*/
    //23.hasClass:判断当前元素上是否有这个strClass（class名）
    function hasClass(curEle, strClass) {
        var reg = new RegExp('(\\b)' + strClass + '(\\b)');
        return reg.test(curEle.className)
    }


})();