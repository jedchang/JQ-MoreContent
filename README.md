# JQ-More-Content

![image](https://img.shields.io/badge/Jquery-exercise-brightgreen.svg)
![image](https://img.shields.io/badge/SASS-exercise-ff69b4.svg)

![images](https://github.com/jedchang/JQ-MoreContent/blob/master/preview-1.jpg)
![images](https://github.com/jedchang/JQ-MoreContent/blob/master/preview-2.jpg)
![images](https://github.com/jedchang/JQ-MoreContent/blob/master/preview-3.jpg)

### 定義資料

- 設定圖片數量為 20，每次讀取張數為 4，讀取檔案類型路徑等。

```javascript
var setArea = $('#img-load');
var imgPath = 'images/photo';
var linkPath = 'images/large/photo';
var imgType = '.jpg';
var loadNum = 4;
var maxNum = 20;
var btnTxt = 'load more';
```

### 動態添加內容

- 使用 `append()` 將內容添加
- 使用 `find()` 遍歷方法，搜索所有 setArea 中 `#load-area` 和 `#more-btn` 元素

### LOAD MORE 按鈕事件偵聽

- 將變數中的元素個數儲存於變數 imgLength 表示目前顯示的圖片數。
- 定義 點擊可產生的數量 loopCount 來作為判斷依據

```javascript
var imgLength = loadImg.length;
var loopCount = imgLength + loadNum;
```

- 使用 `$.each()` 會以陣列作為泛用性的重複處理，與 `$(選取器).each()` 不同，此會將選取器內的元素做重複執行的次數。
- 用建構子來建立新的 Array 物件，並帶入 loadNum 數量，一次印出 4 個。
- 定義 index 用來記錄目前圖片張數

```javascript
$.each(new Array(loadNum), function(index) {
  // 索引從 0 開始 但 photo1.jpg 陣列長度從 1 開始
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
```

- 備註：指定對象 `$('#load-area').each()` 只能做出 1 個物件，但此範例需要一次印出 4 個物件

```javascript
loadArea.each(function(index) {
  var index = index + 1;
  loadArea.append('<img src="' + imgPath + (imgLength + index) + imgType + '">');
});
```

### Modal 燈箱效果

- 取消點擊觸發到最上面的預設，`e.preventDefault();`
- 取得 window 視窗高度，`var wdHeight = $(window).height();`
- 點擊後視窗改變大小取得當前高度，並重設遮罩元素高度，需重新定義一個高度變數，不可用上面的 window height。

```javascript
$(window).on('resize', function() {
  var resizeHeight = $(window).height();
  $('#overlay').css({ height: resizeHeight });
  console.log(resizeHeight);
});
```

- 使用 `.animate()` 淡入、淡出動畫效果

### 初始化

- 讀取時先觸發一次按鈕事件 `click()` 頁面顯示時會先看到 4 張圖面
