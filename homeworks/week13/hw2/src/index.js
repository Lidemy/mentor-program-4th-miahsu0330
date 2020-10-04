/* eslint-disable */
import { getComments, addComments } from './api';
import { appendComment } from './utils';
import { getTemplate } from './template';
import $ from 'jquery';

export function init(options) { //初始化要怎麼呼叫這麼 plugin.init
    let siteKey = '';
    let apiURL = '';
    let containerElement = null;
    let commentDOM = null;
    let begin = 0; // 從第幾筆載入
    let count = 5; // 一次載入幾筆
    let loadMoreButtonClassName;
    let loadMoreButtonSelector;
    let formClassName;
    let formSelector;
    let commentClassName;
    let commentsSelector;

    siteKey = options.siteKey;
    apiURL = options.apiURL;
    containerElement = $(options.containerSelector);

    loadMoreButtonClassName = `${siteKey}-btn-more`;
    formClassName = `${siteKey}-add-comment-form`;
    commentClassName = `${siteKey}-comments`;

    containerElement.append(getTemplate(formClassName, commentClassName, loadMoreButtonClassName));

    loadMoreButtonSelector = '.' + loadMoreButtonClassName;
    formSelector = '.' + formClassName;
    commentsSelector = '.' + commentClassName;
    commentDOM = $(commentsSelector);

    // 載入留言
    getNewComments(begin, count);

    // 載入更多留言
    $(loadMoreButtonSelector).click(() => {
        begin += count;
        getNewComments(begin, count);
    })

    // 新增留言
    $(formSelector).submit(e => {
        e.preventDefault();
        addComment();
    })

    // 得到資料庫 comment 內容
    function getNewComments(begin, count) {
        let start = begin;
        let end = start + count;
        getComments(apiURL, siteKey, (data) => {
            let comments = data.discussions;
            if (end >= comments.length) {
                end = comments.length;
                $(loadMoreButtonSelector).hide();
            }
            for (let i = start; i < end; i++) {
                appendComment(commentDOM, comments[i]);
            }
        });
    }
    // 新增 commment 
    function addComment() {
        const nickNameDOM = $(`${formSelector} input[name="nickname"]`);
        const contentDOM = $(`${formSelector} textarea[name="content"]`);
        const formData = {
            site_key: siteKey,
            nickname: nickNameDOM.val(),
            content: contentDOM.val(),
        }
        addComments(apiURL, siteKey, formData, data => {
            // 錯誤處理
            if (!data.ok) {
                console.log(data.message);
                return;
            }

            appendComment(commentDOM, formData, true);
            nickNameDOM.val('')
            contentDOM.val('')
        })
    }
}

