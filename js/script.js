(function($) {
  var setArea = $('#img-load');
  var imgPath = 'images/photo';
  var linkPath = 'images/large/photo';
  var imgType = '.jpg';
  var loadNum = 4;
  var maxNum = 20;
  var btnTxt = 'load more';

  // 建立實體 load-area & more-btn
  setArea.append(
    '<div id="load-area"></div><a href="javascript:;" id="more-btn"><i class="fas fa-plus-circle"></i>' +
      btnTxt +
      '</a>'
  );

  // 將建立的 load-area & more-btn 儲存至變數中
  var loadArea = setArea.find('#load-area');
  var loadBtn = setArea.find('#more-btn');

  loadBtn.on('click', function() {
    // 取得 load-area 中所有的 img 元素，並儲存至變數中
    var loadImg = loadArea.find('img');
    // 將變數中的元素個數儲存於變數 imgLength 表示目前顯示的圖片數
    var imgLength = loadImg.length;
    //
    var loopCount = imgLength + loadNum;

    if (loopCount < maxNum) {
      // $(選取器).each() → 選取器內的元素做重複執行的次數
      // $.each() → 則會以陣列作為泛用性的重複處理

      // 運用建構子來建立新的 Array 物件，並帶入 loadNum 數量，一次印出4個
      $.each(new Array(loadNum), function(index) {
        // 索引從0開始 但photo1.jpg 從1開始
        var index = index + 1;
        loadArea.append(
          '<a href="' +
            linkPath +
            (imgLength + index) +
            imgType +
            '"target="_blank" class="modal-btn"><img src="' +
            imgPath +
            (imgLength + index) +
            imgType +
            '"></a>'
        );
      });

      // 指定對象 $('#load-area').each() 只能做出一個物件
      // loadArea.each(function(index) {
      //   var index = index + 1;
      //   loadArea.append('<img src="' + imgPath + (imgLength + index) + imgType + '">');
      // });
    } else if (loopCount >= maxNum) {
      // 圖片最大值 扣除 目前顯示的圖片數 結果為尚未載入剩餘圖片數
      var overCount = maxNum - imgLength;

      $.each(new Array(overCount), function(index) {
        loadArea.append(
          '<a href="' +
            linkPath +
            (imgLength + index) +
            imgType +
            '"target="_blank" class="modal-btn"><img src="' +
            imgPath +
            (imgLength + index) +
            imgType +
            '"></a>'
        );
      });
      // 所有圖片已載入 故移除按鈕
      // loadBtn.remove();

      loadBtn.addClass('no-more');
    }

    // 載入前淡入動畫
    // 無法使用 先前已存變數 loadImg 會讀取不到
    loadArea.find('img').on('load', function() {
      $(this).animate(
        {
          opacity: '1'
        },
        1000
      );
    });

    $('.modal-btn').on('click', function(e) {
      // 取消預設動作
      e.preventDefault();

      // 取得 href 屬性並存在 setModal 變數內
      var setHref = $(this).attr('href');

      // 取得 window 視窗高度
      var wdHeight = $(window).height();

      $('body').append(
        '<div id="overlay"></div><div id="modal-box"><div class="close-btn"></div><img src="' + setHref + '"></div>'
      );
      $('#overlay, #modal-box').css({ display: 'block', opacity: '0' });
      // 將遮罩高度設定為視窗高度並淡入動畫，彈出視窗也是淡入動畫顯示
      $('#overlay')
        .css({ height: wdHeight })
        .animate({ opacity: '0.8' }, 700);
      $('#modal-box').animate({ opacity: '1' }, 700);

      // 視窗改變大小取得當前高度 並重設遮罩元素高度
      // 不可用外面上面的 window height
      $(window).on('resize', function() {
        var resizeHeight = $(window).height();
        $('#overlay').css({ height: resizeHeight });
        console.log(resizeHeight);
      });

      // 此關閉函式需放在 事件內
      $('#overlay, .close-btn').on('click', function() {
        $('#overlay, #modal-box').animate({ opacity: '0' }, 500, function() {
          // 後面帶上關閉函式
          $('#overlay, #modal-box').remove();
        });
      });
    });
  });

  // 初始化 讀取時先觸發一次按鈕事件 click() 頁面顯示時會先看到4張圖面
  $(window).load(function() {
    loadBtn.click();
  });
})($);
