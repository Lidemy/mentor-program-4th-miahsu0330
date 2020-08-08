// 新增 todo
function addTodo(element, parentNode) {
  const el = element;
  const parent = parentNode;
  const value = element.value.trim();
  const errorLabel = el.parentNode.querySelector('.error__label');
  if (!value) {
    errorLabel.innerText = '沒有輸入內容哦！';
    el.classList.add('error');
    return;
  }
  errorLabel.innerText = '';
  el.classList.remove('error');
  const newTodo = document.createElement('div');
  newTodo.classList.add('todo__item');
  newTodo.innerHTML = `
  <div class="control">
      <input type="checkbox" name="finish" id="" class="control__checkbox">
      <div class="control__indicator"></div>
  </div>
  <div class="todo__content">
      <div class="todo__text">
          ${value}
      </div>
  </div>
  <button class="btn-delete"></button>`;
  parent.querySelector('.todo__list').appendChild(newTodo);
}

// 刪除 todo
function removeTodo(element) {
  if (element.parentNode.classList.contains('finish')) {
    return;
  }
  element.parentNode.classList.add('remove');
  setTimeout(() => { element.parentNode.remove(); }, 250);
}

// 標記 todo 為完成/未完成
function finishTodo(element) {
  console.log('finish', element);
  const el = element;
  let item = el.parentNode;
  while (!item.classList.contains('todo__item')) {
    item = item.parentNode;
  }
  if (element.checked) {
    item.classList.add('finish');
  } else {
    item.classList.remove('finish');
  }
}


// 監聽 click 事件
function clickEvent(element) {
  const el = document.querySelector(element);
  el.addEventListener('click', (e) => {
    const children = e.target;
    if (children.classList.contains('btn-add')) {
      addTodo(document.querySelector('#addTodo'), el);
    }
    if (children.classList.contains('btn-delete')) {
      removeTodo(children);
    }
    if (children.classList.contains('control__checkbox')) {
      finishTodo(children);
    }
  });
}

// 監聽 keydown 事件
function keydownEvent(element) {
  const el = document.querySelector(element);

  el.addEventListener('keydown', (e) => {
    if (e.target.getAttribute('id') === 'addTodo') {
      if (e.code === 'Enter') {
        addTodo(e.target, el);
      }
    }
  });
}

// 待網頁載入完成後執行
window.onload = function () {
  clickEvent('.todo');
  keydownEvent('.todo');
};
