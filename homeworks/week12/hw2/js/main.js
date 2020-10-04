/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-undef */

const baseURL = 'http://mentor-program.co/mtr04group1/mia/week12/hw2/';
const siteKey = 'mia';
let todoCount = 0;
let incompleteTodoCount = 0;

// 轉換 html 字元
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function updateCounter() {
  $('.count-incomplete').text(incompleteTodoCount);
  $('.count-complete').text(todoCount - incompleteTodoCount);
  $('.count-all').text(todoCount);
}

// 新增 todo 到畫面上
function appendTodo(container, data) {
  let isFinish = '';
  isFinish = Boolean(data.is_finish);
  const templete = `
  <div class="todo__item {finishClassName}">
    <div class="todo__content" data-id="'{dataId}">
        <div class="control">
            <input type="checkbox" name="finish" id="" class="control__checkbox" {checked}>
            <div class="control__indicator"></div>
        </div>
        <div class="todo__text">
          {content}
        </div>
        <button class="btn-delete"></button>
    </div>
    <div class="todo__content-edit">
        <input type="text" name="content">
        <button class="btn-update"></button>
    </div>   
  </div> 
  `;
  container.append(
    templete
      .replace('{content}', escapeHtml(data.content))
      .replace('{finishClassName}', isFinish ? 'finish' : '')
      .replace('{dataId}', data.id ? data.id : '')
      .replace('{checked}', isFinish ? 'checked' : ''),
  );
}

// 切換 tab
function switchHide(allTodo, isComplete) {
  $.each(allTodo, (i, item) => {
    let hasFinish = $(item).hasClass('finish');
    if (isComplete) {
      hasFinish = !hasFinish;
    }
    hasFinish ? $(item).addClass('hide') : $(item).removeClass('hide');
  });
}

// 分類 todo 狀態
function filterTodo() {
  const list = $('.todo__list').children();
  const control = $('.todo__control').children();
  let active = '';

  // 檢查目前所在 tab
  $.each(control, (i, item) => {
    if ($(item).hasClass('active')) {
      active = $(item).attr('data-statu');
    }
  });

  // 根據目前所在 tab 進行切換
  switch (active) {
    case 'incomplete':
      switchHide(list, false);
      break;
    case 'complete':
      switchHide(list, true);
      break;
    default:
      $.each(list, (i, item) => {
        $(item).removeClass('hide');
      });
      break;
  }
}

// tab 切換
function switchTab(el) {
  const tabs = $(el).parent().children();
  $.each(tabs, (i, item) => {
    $(item).removeClass('active');
  });

  $(el).addClass('active');
  filterTodo();
}

// 新增 todo
function addTodo() {
  const container = $('.todo__list');
  const input = $('input[name="content"]');
  const errorLabel = $('.error__label');
  const content = input.val().trim();
  if (!content) {
    errorLabel.text('沒有輸入內容哦！');
    input.addClass('error');
    return;
  }
  errorLabel.text('');
  input.removeClass('error');
  const formData = {
    siteKey,
    content,
  };
  appendTodo(container, formData);
  todoCount += 1;
  incompleteTodoCount += 1;
  updateCounter();
  filterTodo();
  $('input[name="content"]').val('');
}

// 刪除 todo
function removeTodo(element) {
  const item = $(element).parents('.todo__item');
  const isChecked = $(item).find('.control__checkbox')[0].checked;
  $(item).addClass('remove');
  setTimeout(() => { $(item).hide(); }, 300);
  if (!isChecked) {
    incompleteTodoCount -= 1;
    updateCounter();
  }
  filterTodo();
}

// 標記 todo 為完成/未完成
function finishTodo(element) {
  const item = $(element).parents('.todo__item');
  if (element.checked) {
    $(item).addClass('finish');
    incompleteTodoCount -= 1;
  } else {
    $(item).removeClass('finish');
    incompleteTodoCount += 1;
  }
  updateCounter();
  setTimeout(() => { filterTodo(); }, 450);
}

// 編輯 todo
function editTodo(el) {
  const value = $(el).text().trim();
  const parent = $(el).parents('.todo__item');
  const input = parent.find('input[name="content"]');
  const items = parent.parent().children();
  if (parent.hasClass('finish')) {
    return;
  }
  $.each(items, (i, item) => {
    $(item).removeClass('edit');
  });
  $(input).val(value);
  parent.addClass('edit');
}

// 更新 todo
function updateTodo(element) {
  const input = $(element);
  const parent = input.parents('.todo__item');
  const text = parent.find('.todo__text');
  const value = input.val();
  $(text).text(value);
  parent.removeClass('edit');
}

// 清空 todo
function clearTodo() {
  $.each($('.todo__list').children(), (i, item) => {
    $(item).addClass('remove');
  });
  incompleteTodoCount = 0;
  todoCount = 0;
  updateCounter();
}

// 載入 todo
function getTodo() {
  const container = $('.todo__list');
  $.ajax({
    url: `${baseURL}api_todos.php?site_key=${siteKey}`,
  }).done((data) => {
    if (!data.ok) {
      console.log(data.message);
      return;
    }
    const { todos } = data;
    for (let i = 0; i < todos.length; i += 1) {
      appendTodo(container, todos[i]);
      if (!todos[i].is_finish) {
        incompleteTodoCount += 1;
      }
    }
    todoCount = todos.length;
    updateCounter();
    filterTodo();
  });
}


// 儲存 todo
function saveTodos() {
  const list = $('.todo__list').children();
  const formData = [];
  $.each(list.get().reverse(), (i, item) => {
    const id = Number($(item).find('.todo__content').attr('data-id'));
    const content = $(item).find('.todo__text').text().trim();
    const is_finish = $(item).hasClass('finish');
    const is_deleted = $(item).hasClass('remove');
    formData.push({
      id,
      content,
      is_finish,
      is_deleted,
    });
  });
  $.ajax({
    method: 'POST',
    url: `${baseURL}api_update_todos.php`,
    data: {
      site_key: siteKey,
      todos: formData,
    },
  }).done((data) => {
    if (!data.ok) {
      console.log(data.message);
      return;
    }
    alert('儲存成功');
  });
}

// 監聽 click 事件
function clickEvent(el) {
  el.on('click', '.btn-add', () => {
    addTodo();
  });
  el.on('click', '.btn-delete', (e) => {
    removeTodo(e.target);
  });
  el.on('click', '.control__checkbox', (e) => {
    finishTodo(e.target);
  });
  el.on('click', '.todo__text', (e) => {
    editTodo(e.target);
  });
  el.on('click', '.btn-update', (e) => {
    const input = $(e.target).parent().find('input[name="content"]');
    updateTodo(input);
  });
  el.on('click', '.btn-clear', () => {
    clearTodo();
  });
  el.on('click', '.todo__link', (e) => {
    switchTab(e.target);
  });
}

// 監聽 keydown 事件
function keydownEvent(el) {
  el.on('keydown', '#addTodo', (e) => {
    if (e.code === 'Enter') {
      addTodo();
    }
  });
  el.on('keydown', 'input[name="content"]', (e) => {
    if (e.code === 'Enter') {
      updateTodo(e.target);
    }
  });
}


// 待網頁載入完成後執行
$(document).ready(() => {
  // 監聽事件
  clickEvent($('.todo'));
  keydownEvent($('.todo'));

  // 載入 todos
  getTodo();

  // 儲存 todos
  $('.btn-save').on('click', saveTodos);
});
