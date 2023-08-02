// 因为js是写在外部的，所以需要添加load事件：页面全部加载完之后再执行js
window.addEventListener('load', function () {
    // 获取元素
    var focus = document.querySelector('.focus');
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var focusWidth = focus.offsetWidth;
    // 1.（1）当鼠标经过时，左右按钮出现
    focus.addEventListener('mouseenter', function () {
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(timer);
        timer = null;//清除定时器
    })
    // 1.（2）当鼠标离开时，左右按钮消失
    focus.addEventListener('mouseleave', function () {
        left.style.display = 'none';
        right.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用事件
            right.click();
        }, 1000);
    })
    // 2.动态生成小圆圈
    // 2.1获取元素
    // 注意要限制是focus的，因为文档中可能存在很多ul和ol
    var ul = focus.querySelector('.images');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);//输出4，为图片张数
    // 2.2动态生成小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        // 创建小圆点li元素
        var li = this.document.createElement('li');
        // 记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index', i);
        // 将li插入到ol中
        ol.appendChild(li);
        // 3.小圆圈的排他思想，在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 3.1清除所有li
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 3.2给当前点击的li添加类 this指向函数调用者（li）
            this.className = 'current';
            // 4.点击小圆圈，移动图片
            // animate(obj, target, callback)
            // target:移动距离，索引号×图片宽度，注意是负值，因为此时是往左走
            // 当我们点击了某个小li，就拿到了当前li的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小圆圈，就要把li的索引号给num
            num = index;
            // 当我们点击了某个小圆圈，就要把li的索
            circle = index;
            console.log(index);
            // var focusWidth = focus.offsetWidth;//由于下面要使用，所以应该把它作为全局变量，放在外面
            console.log(focusWidth);
            animate(ul, -index * focusWidth);
        })
    }
    // 2.3把ol里面的第一个li设置类名current
    ol.children[0].className = 'current';
    // 克隆第一张图片（li）放到ul最后面  写在小圆圈的后面，所以小圆圈不会多
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 5.点击右侧按钮，图片滚动一张
    var num = 0;//全局变量
    var circle = 0;
    // flag 节流阀
    var flag = true;
    right.addEventListener('click', function () {
        if (flag) {
            flag = false;//关闭节流阀
            // alert(11);//测试事件是否绑定
            // 如果走到了最后复制的一张，此时我们的ul要快速复原left改为0,实现无缝滚动
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;//打开节流阀
            });
            // 6.点击右侧按钮，小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle==4，说明走到克隆图片了
            if (circle == ol.children.length) {
                circle = 0;
            }
            //调用函数
            circleChange();
        }
    });
    // 7.左侧按钮
    left.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;//注意是--，反向的
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            // 如果circle<0，说明第一张图片，则小圆圈要改为第四个小圆圈
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }改为三元表达式更简洁
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });
    function circleChange() {
        // 清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈current类
        ol.children[circle].className = 'current';
    }
    // 8.自动播放功能
    var timer = setInterval(function () {
        // 手动调用事件
        right.click();
    }, 2000);
})
