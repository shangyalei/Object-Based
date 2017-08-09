/**
 * Created by think on 2017/2/18.
 */

var getEle=(function(){

    /*1.������getEleChildren()
     * ������������ȡָ��Ԫ���µ�����ָ��Ԫ�ؽڵ㣬���ڶ���������ѡ���򷵻ظö��������������Ԫ�ؽڵ㡣
     * ˼·����ȡ���нڵ㣬�ж��Ƿ���Ԫ�ؽڵ㣬��ǩ���Ƿ�Ϊָ����ǩ��
     * */

    function getEleChildren(obj,tagName){
        var ary=[];
        var oChild=obj.childNodes;
        //���еڶ������������ҵڶ����Ӳ�����tagName==1,˵����ȡָ��Ԫ��
        if(typeof tagName == "string"){
            for(var i=0;i<oChild.length;i++){
                if(oChild[i].nodeType==1&&oChild[i].tagName==tagName.toUpperCase()){
                    ary.push(oChild[i]);
                }
            }
            return ary;
        }else{//������ǻ�ȡ���е��ӽڵ�
            for(var j=0;j<oChild.length;j++){
                if(oChild[j].nodeType==1){
                    ary.push(oChild[j]);
                }
            }
            return ary;
        }
    }
/*----------------------------------*/
    /*2.������getNextEle()
     * ������������ȡָ��Ԫ�ص���һ���ֵܽڵ�
     * ˼·�����õݹ�˼��ѭ�����÷�������֪���ҵ���һ���ֵܽڵ�
     * */
    function getNextEle(node){
        var node = node.nextSibling;
        //���ڵ�������1 �����÷���
        if(node.nodeType==1){
            return node;
        }
        //����ִ��������䣬�������Ҫ�ӽڵ�Ļ�
        if(node.nextSibling){
            //�ݹ�һ�£������ڵ����Լ������㣬��Ҫ����return��
            return arguments.callee(node);
        }
        //��û���ӽڵ��ˣ��򷵻�һ��null
        //���һ������Ӧ���з���ֵ�������޷�������������Ӧ�÷���null
        return null;
    }

/*----------------------------------------*/
    /*3.������getPreEle
     * ��ȡָ��Ԫ�ص���һ���ֵ�Ԫ�ؽڵ�
     * ˼·�����õݹ�˼�룬ѭ�����÷�������ֱ���ҵ���һ���ֵܽڵ�
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
     * 4.������getNextAll()
     * ������������ȡָ��Ԫ�صģ�ָ����ǩ���ĵܵ�Ԫ�ؽڵ�
     * ����д�ڶ������������ȡ���еĵܵܽڵ�
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
     * 5.������getPreAll()
     * ������������ȡָ��Ԫ�صģ�ָ����ǩ���ĸ��Ԫ��
     * ���ڶ�������Ϊundefined�����ȡ���еĸ��Ԫ��
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
     * 6.������getSiblings();
     * ������������ȡָ��Ԫ�ص������ֵ�Ԫ��
     * ˼·���Ȼ�ȡָ��Ԫ�صĸ��ڵ㣬������ȡ�ø�Ԫ���³���Ԫ����������ӽڵ�
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
     * 7.��������getLastEle();
     * ������������ȡԪ�ؽ���е�һ����Ԫ�أ�ע��������ĵ�һ��ֵ
     * ˼·�������жϸ��Ԫ�صķ�����ѭ���жϺ󽫵�һ��Ԫ�طŽ����鷵��
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
                throw new Error("�����еĵ�"+i+"����������������!");
            }
        }
        return ary;
    }

/*-----------------------------------------------------*/

    /*
     * 8.��������getLastEle();
     * ������������ȡԪ�ؽ�������һ����Ԫ�أ�ע������������һ��ֵ
     * ˼·�������жϵܵ�Ԫ�صķ�����ѭ���жϺ����һ��Ԫ�طŽ����鷵��
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
                    throw new Error("�����еĵ�"+i+"����������������!");
                }
            }
            return ary;
        }
    }

/*-------------------------------------------------*/
    /*
     * 9.��������inertAfter(oldEle,newEle);
     * ������������Ŀ��Ԫ�صĺ������Ԫ�أ�oldEle�ᱻ�Ƴ���
     * ��ȡ��oldEle�����һ����Ԫ��
     * */

    function insertAfter(oldEle,newEle){
        if(oldEle.nextSibling){//������ֵܽڵ�
            //���뵽Ŀ��Ԫ�صڵܽڵ�ǰ�棬Ҳ����Ŀ��Ԫ�صĺ���
            oldEle.parentNode.insertBefore(newEle,oldEle.nextSibling);
        }else{//���û�еܵܽڵ�
            oldEle.parentNode.appendChild(newEle);
        }
    }

/*--------------------------------------------------------*/

    /*
     * 10.��������insertBefore();
     * ������������ָ��Ԫ�ص�ǰ�������Ԫ��
     *
     * */

    function insertBefore(newNode,oldEle){
        oldEle.parentNode.insertBefore(newNode,oldEle);
    }

/*-----------------------------------------------------*/
    /*
     * 11.����������ȡԪ�ص�����ֵ�ķ���
     * ˼·���ȵõ������Ԫ�ص�����Ԫ�ؽڵ㣬��һ�ԱȲ��ü�������1��
     * ����к��Լ���ͬ��Ԫ�أ��򷵻ص�ǰ�ļ���
     * */

    function getIndex(ele){

        function getEleChildren(obj,tagName){
            var ary=[];
            var oChild=obj.childNodes;
            //���еڶ������������ҵڶ����Ӳ�����tagName==1,˵����ȡָ��Ԫ��
            if(typeof tagName == "string"){
                for(var i=0;i<oChild.length;i++){
                    if(oChild[i].nodeType==1&&oChild[i].tagName==tagName.toUpperCase()){
                        ary.push(oChild[i]);
                    }
                }
                return ary;
            }else{//������ǻ�ȡ���е��ӽڵ�
                for(var j=0;j<oChild.length;j++){
                    if(oChild[j].nodeType==1){
                        ary.push(oChild[j]);
                    }
                }
                return ary;
            }
        }

        if(ele){
            var parent = ele.parentNode;//��ȡ��Ԫ�صĸ��׽ڵ�
            var eles = getEleChildren(parent);
            for(var i=0;i<eles.length;i++){
                //һһ�Աȣ���������Լ���ĳ���ڵ�Ա���һ���ģ���ô��ǰ��i�����Լ�������ֵ
                if(ele == eles[i]){
                    return i;
                }
            }
        }
    }

    /*-----------------------------------------------------*/
    /*
     * 12.��������getPos();
     * ������������ȡԪ���������Ļ�ľ���
     * */

    function getPos(ele){
        var x = ele.offsetLeft;
        var y = ele.offsetTop;
        var p = ele.offsetParent;//һ��Ҫ����offsetParent��ʲô;

        while(p&&p!=document.body){//���IE8��BUG
            if(window.navigator.userAgent.indexOf('ESIE 8')>-1){//�ж��ǲ���IE8
                x+= p.offsetLeft;
                y+= p.offsetTop;
            }else{
                //clientLeft����߿�Ŀ�ƫ�����������߿������Ҫ�ӽ�ȥ(IE8����)��
                x+= p.offsetLeft + p.clientLeft;
                y+= p.offsetTop + p.clientTop;
            }

            p= p.offsetParent;
        }
        var obj={};
        obj.x=x;
        obj.y=y;
        return obj;//�����д����return{x:x,y:y}
    }

    /*--------------------------------------------------*/
    /*
     * 13.��������getWin()
     * ������������ȡ���Ǵ��ڵĿ�Ȼ�߶�
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
     * 14.��������toJSON()
     * ��JSON��ʽ���ַ���ת��ΪJSON���͵�JS����
     *
     * */
    function toJSON(str){
        return "JSON" in window?JSON.parse(str):eval("("+str+")");
    }

  /*-----------------------------------------------------*/
    /*
     * 15.��������listToArray();
     * ������������nodeList����ת��Ϊ����
     * ˼·:����call�����������slice����
     * */

    function listToArray(eles){
        try{
            return Array.prorotype.slice.call(eles,0);
            //����ʹ��[].slice.call(eles,0);�����ķ�ʽ
        }catch(e){
            //��IE6/7�DOM���ϲ���JS���󣬲�����[].slice.call(eles,0)����������������쳣��
            var ary=[];
            for(var i=0;i<eles.lengt;i++){
                ary.push(eles[i]);
            }
            return ary;
        }
    }
 /*---------------------------------------------------------*/

    /*
     * 16.��������getCss()
     * ������������ȡ��ҳԪ�ص�CSS����ֵ�ļ�����д�������Ի�ȡ������ʽ��������ʽ��������ʽ��
     * ˼·��currentStyle��������IE�ģ�getComputedStyle�����Ǳ�׼������ģ�ͨ���жϽ�������ԡ�
     * */

    function getCss(ele,attr){
        var val = null;
        var reg = null;
        if(ele&&ele.nodeType==1&&attr&&typeof attr == "string"){
            if("getComputedStyle" in window){//�߼������
                val =getComputedStyle(ele,null)[attr];
                return val;
            }else{//�ͼ������
                // alpha(opacity=10)
                if(attr == "filter"){//�ø�����ƥ���������
                    val = ele.currentStyle["filter"];
                    reg = /^alpha\(opacity[=:](\d+(?:\.\d+))?\)$/i;
                    return reg.test(val)?reg.exec(val)[1]/100:1;
                }else{
                    val = ele.currentStyle[attr];
                }
            }
        }
        //ƥ������
        //-200px +200px 22.33px px pt em rem ��λ
        reg  = /^([+-]?\d+(\.\d+)?)(px|pt|em|rem)?$/i;
        return reg.test(val)?parseFloat(val):val;
    }

/*------------------------------------------------------------*/

    /*
     * 17.��������setCss()
     * ������������Ԫ������CSS���Եķ���
     * �������Լ���������
     * */
    //setCss:�����м���ʽ
    function setCss(curEle, attr, value) {
        //float
        if (attr == 'float') {
            curEle.style.cssFloat = value;//���
            curEle.style.styleFloat = value;//ie
            return;
        }
        //͸���ȵĴ���
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        //�ӵ�λ�Ĵ���
        var reg = /(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/;
        if (reg.test(attr)) {
            value += 'px';
        }
        curEle.style[attr] = value;
    }

    /*---------------------------------------------*/
    //18.��������setGroupCss:����һ����ʽ
    function setGroupCss(curEle, options) {
        function setCss(curEle, attr, value) {
            //float
            if (attr == 'float') {
                curEle.style.cssFloat = value;//���
                curEle.style.styleFloat = value;//ie
                return;
            }
            //͸���ȵĴ���
            if (attr === 'opacity') {
                curEle.style.opacity = value;
                curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
                return;
            }
            //�ӵ�λ�Ĵ���
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
    //19.css:��ȡ��������ʽ
    function css(curEle) {

        //getCss:��ȡ���м���ʽ
        function getCss(curEle, attr) {
            var val = null;
            var reg = null;
            if ("getComputedStyle") {//�߼������
                val = getComputedStyle(curEle, null)[attr];
            }else {//�ͼ������
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

        //setCss:�����м���ʽ
        function setCss(curEle, attr, value) {
            //float
            if (attr == 'float') {
                curEle.style.cssFloat = value;//���
                curEle.style.styleFloat = value;//ie
                return;
            }
            //͸���ȵĴ���
            if (attr === 'opacity') {
                curEle.style.opacity = value;
                curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
                return;
            }
            //�ӵ�λ�Ĵ���
            var reg = /(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/
            if (reg.test(attr)) {
                value += 'px';
            }
            curEle.style[attr] = value;
        }

        //setGroupCss:����һ����ʽ
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
            if (typeof arguments[2] !== 'undefined') {// ��������
                setCss(curEle, argTwo, arguments[2]);
                return;
            } else {//��ȡ
                return getCss(curEle, argTwo)
            }
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === '[object Object]') {//����һ����ʽ
            setGroupCss(curEle, argTwo)
        }
    }

/*--------------------------------------------------------------*/

    /*
     * 20.ͨ��������ȡԪ�أ�����IE8һ�²���������Ҫдһ��������������
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
     * 21.��������ʽ
     */
    function addClass(ele,strClass){
        var reg=new RegExp("(?:^| )"+strClass+"(?: |$)");
        if(!reg.test(ele.className))
            ele.className+=" "+strClass;
    }
/*---------------------------------------------------------*/
    /**
     * 22.ɾ������ʽ
     */

    function removeClass(ele,strClass){
        var reg=new RegExp("(?:^| )"+strClass+"(?: |$)","g");
        ele.className=ele.className.replace(reg," ");
    }

 /*-----------------------------------------------------------*/
    //23.hasClass:�жϵ�ǰԪ�����Ƿ������strClass��class����
    function hasClass(curEle, strClass) {
        var reg = new RegExp('(\\b)' + strClass + '(\\b)');
        return reg.test(curEle.className)
    }


})();