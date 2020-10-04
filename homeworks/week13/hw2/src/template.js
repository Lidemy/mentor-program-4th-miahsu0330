/* eslint-disable */
export function getTemplate(formClassName, commentClassName, loadMoreButtonClassName) {
    return `
    <div>
        <div class="row">
            <form class="col-12 ${formClassName}">
                <div class="form-group">
                    <label for="">暱稱</label>
                    <input type="text" class="form-control" name="nickname" id="" placeholder="請輸入暱稱">
                </div>
                <div class="form-group">
                    <label for="">留言內容</label>
                    <textarea class="form-control" id="" rows="3" name="content"></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-submit">送出</button>
            </form>
            <div class="col-12 border-top mt-5 border-primary"></div>
        </div>
        <div class="row ${commentClassName}"></div>
        <button type="button" class="btn btn-outline-primary btn-block mt-5 ${loadMoreButtonClassName}">載入更多</button>
    </div>
`;
}