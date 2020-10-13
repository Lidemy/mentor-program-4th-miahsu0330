/* eslint-disable */
import $ from 'jquery';
// 發送 request 
export function getComments(apiURL, siteKey, cb) {
    $.ajax({
        url: `${apiURL}api_comments.php`,
        data: {
            site_key: siteKey,
        }
    }).done(function (data) {
        cb(data);
    });
}

// 新增 commment 
export function addComments(apiURL, siteKey, data, cb) {
    $.ajax({
        method: 'POST',
        url: `${apiURL}api_add_comments.php?`,
        data
    }).done(function (data) {
        cb(data)
    });
}
