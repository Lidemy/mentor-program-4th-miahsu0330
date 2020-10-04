/* eslint-disable */
import $ from 'jquery';
// 轉換成 html 字元
export function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// 渲染 comment 
export function appendComment(commentDOM, data, isPrepend) {
    let templete = `
            <div class="col-sm-6 mt-5">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${escapeHtml(data.nickname)}</h5>
                        <p class="card-text">${escapeHtml(data.content)}</p>
                    </div>
                </div>
            </div>
        `;
    if (isPrepend) {
        commentDOM.prepend(templete);
    } else {
        commentDOM.append(templete);
    }
}
