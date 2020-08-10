// 執行手風琴
function accordion(components, element) {
  let parent = element.parentNode;
  // 不斷往上找到 accordion__item 父元素
  while (!parent.classList.contains('accordion__item')) {
    parent = parent.parentNode;
  }
  const container = parent.querySelector('.accordion__content');
  const isOpen = parent.classList.contains('active'); // 判斷點擊的元素狀態

  // 檢查點擊的元素是不是打開的狀態，是的話把自己收起就就可以了
  if (isOpen) {
    parent.classList.remove('active');
    container.style['max-height'] = '0px';
    return;
  }

  // 先把全部元素移除 active 並收起
  const allItem = components.querySelectorAll('.accordion__item');
  const allContent = components.querySelectorAll('.accordion__content');
  for (let i = 0; i < allItem.length; i += 1) {
    allItem[i].classList.remove('active');
    allContent[i].style['max-height'] = '0px';
  }

  // 針對被點擊的元素增加 active 並打開
  const height = container.scrollHeight; // 包含因為 overflow 而沒顯示在螢幕上的內容高度
  parent.classList.add('active');
  container.style['max-height'] = `${height}px`;
}


// 監聽事件
function addEvent(element) {
  const el = document.querySelector(element);

  el.addEventListener('click', (e) => {
    // 確認點擊到 title 區塊
    const isTitle = e.target.classList.contains('accordion__title') || e.target.classList.contains('accordion__icons');
    if (!isTitle) {
      return;
    }
    // 執行手風琴
    accordion(el, e.target);
  });
}

window.onload = function () {
  addEvent('#faq');
};
