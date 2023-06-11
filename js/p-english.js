$(document).ready(function() {
  var topButton = $('.top');
  var navLinks = $('.header .nav ul li a');
  let headerTop = $('.header h1');
  // 获取按钮和点赞数的元素
var likeButton = document.getElementById("likeButton");
var likeCount = document.getElementById("likeCount");
var likesDiv = document.querySelector(".likes");

// 初始化点赞数和点赞状态
var count = 0;
var hasLiked = false;

// 检查是否已经点赞
var storedLike = localStorage.getItem("likeState");

// 如果已经点赞过，更新点赞数和按钮状态
if (storedLike) {
  var storedLikeObj = JSON.parse(storedLike);
  count = storedLikeObj.count;
  hasLiked = storedLikeObj.hasLiked;
  likeCount.innerHTML = count;
  if (hasLiked) {
    likesDiv.classList.add("liked");
  }
}

// 点击按钮时执行相应操作
likeButton.addEventListener("click", function() {
  // 如果已经点赞过，则取消点赞
  if (hasLiked) {
    count--;
    likeCount.innerHTML = count;
    likesDiv.classList.remove("liked");
    hasLiked = false;
  } else {
    // 如果未点赞，则增加点赞数
    count++;
    likeCount.innerHTML = count;
    likesDiv.classList.add("liked");
    hasLiked = true;
  }

  // 保存点赞状态和点赞数到本地存储
  var likeState = {
    count: count,
    hasLiked: hasLiked
  };
  localStorage.setItem("likeState", JSON.stringify(likeState));
});


  // 初始时隐藏按钮
  topButton.hide();

  // 监听页面滚动事件
  $(window).scroll(function() {
    // 获取滚动距离
    var scrollPos = $(window).scrollTop();

    // 根据滚动距离控制按钮显示/隐藏
    if (scrollPos > 0) {
      topButton.show();
    } else {
      topButton.hide();
    }

    // 遍历每个导航链接
    navLinks.each(function() {
      var target = $(this).attr('href');
      var targetElement = $(target);

      // 获取目标区块的位置
      var targetPosition = targetElement.offset().top;
      var targetHeight = targetElement.outerHeight();

      // 判断滚动位置是否在目标区块内
      if (scrollPos >= targetPosition - 200 && scrollPos < targetPosition + targetHeight -200) {
        // 添加选中样式
        $(this).addClass('active');
      } else {
        // 移除选中样式
        $(this).removeClass('active');
      }
    });
  });

  // 监听导航链接的点击事件
  navLinks.click(function(event) {
    event.preventDefault();
    var targetId = $(this).attr('href');
    var targetElement = $(targetId);
    var targetOffset = targetElement.offset().top;

    // 平滑滚动到目标位置
    $('html, body').animate({
      scrollTop: targetOffset -150
    }, 'slow');

    // 添加选中样式
    navLinks.removeClass('active');
    $(this).addClass('active');
  });

  // 点击按钮时滚动到顶部
  topButton.click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
  });

  // 点击按钮时滚动到顶部
  headerTop.click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
  });

});





// 抓取header位置讓wrap區塊緊貼其後
window.addEventListener('DOMContentLoaded', function() {
  var headerHeight = document.querySelector('.header').offsetHeight;
  var wrapElement = document.querySelector('.wrap');
  wrapElement.style.marginTop = headerHeight + 'px';
});

window.addEventListener('resize', function() {
  var headerHeight = document.querySelector('.header').offsetHeight;
  var wrapElement = document.querySelector('.wrap');
  wrapElement.style.marginTop = headerHeight + 'px';
});



// 視窗滾動時，header內字體縮放達成header區塊縮小
window.addEventListener('scroll', function() {
  var header = document.querySelector('.header');
  var headerTitle = document.querySelector('.header h1');
  var navLinks = document.querySelectorAll('.header .nav ul li a');

  // 计算滚动距离
  var scrollDistance = window.pageYOffset || document.documentElement.scrollTop;

  // 根据滚动距离修改样式
  if (scrollDistance > 0) {
    header.style.height = 'auto';
    headerTitle.style.fontSize = '24px';

    // 遍历所有匹配的链接元素并应用样式
    navLinks.forEach(function(link) {
      link.style.fontSize = '20px';
    });
  } else {
    header.style.height = 'auto';
    headerTitle.style.fontSize = '40px';

    // 遍历所有匹配的链接元素并应用样式
    navLinks.forEach(function(link) {
      link.style.fontSize = '32px';
    });
  }
});
