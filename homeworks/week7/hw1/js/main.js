// 檢查一般 input 是否為空
function isEmpty(element) {
  const input = element;
  return !input.value.trim();
}

// 檢查 radio 是否為空
function checkRadio(element) {
  const radios = [...element];
  const hasCheck = radios.some(radio => radio.checked);
  return !hasCheck;
}

// 根據判定有沒有值 改變 Error 狀態
function changeErrorStatus(fun, thisErrorText, thisFormGroup) {
  const elErrorText = thisErrorText;
  if (fun) {
    elErrorText.innerText = '此問題為必填';
    thisFormGroup.classList.add('error');
    return;
  }
  thisFormGroup.classList.remove('error');
}


// 檢查表單各欄位的值
function checkValue(element) {
  const form = element;
  const label = form.querySelectorAll('.formGroup__text');
  let countEmpty = 0;
  // 遍歷選單
  for (let i = 0; i < label.length; i += 1) {
    // 撈出必填欄位
    if (label[i].classList.contains('required')) {
      const formGroup = label[i].parentNode;
      const input = formGroup.querySelector('input');
      const radioGroup = formGroup.querySelectorAll('input[type="radio"]');
      const errorText = formGroup.querySelector('.error__label');
      const inputType = input.getAttribute('type');

      // 檢查是否為一般 input 欄位檢查是否為空
      if (inputType === 'text' || inputType === 'email' || inputType === 'tel') {
        changeErrorStatus(isEmpty(input), errorText, formGroup);
        // 計算空值數量
        if (isEmpty(input)) {
          countEmpty += 1;
        }
      }

      // 檢查是否為 radio 檢查是否為空
      if (radioGroup.length) {
        changeErrorStatus(checkRadio(radioGroup), errorText, formGroup);
        // 計算空值數量
        if (checkRadio(radioGroup)) {
          countEmpty += 1;
        }
      }
    }
  }

  console.log('有', countEmpty, '題必填為空');
  // 回傳有沒有空值
  return countEmpty;
}

// 得到值
function getValue(element) {
  const form = element;
  const obj = {};
  const inputs = form.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    if (input.type !== 'radio' || input.checked) {
      obj[input.name] = input.value;
    }
  }
  return JSON.stringify(obj);
}

function firstEmpty(element) {
  const form = element;
  return form.querySelector('.error').querySelector('input');
}

function formEvent(element) {
  const el = document.querySelector(element);
  el.addEventListener('submit', (e) => {
    // 檢查值，如果空值禁止送出
    if (checkValue(el)) {
      // focus 到第一個空欄位
      firstEmpty(el).focus();
      e.preventDefault();
      return;
    }
    // alert 值
    alert(getValue(el));
  });
}

window.onload = function () {
  formEvent('.form');
};
