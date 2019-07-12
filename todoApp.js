(function () {
    'use strict';
    //ローカルストレージ取得
    const storage = localStorage;
    //todo内容記述エリア取得
    const userInputArea = document.getElementById('create-todo-input');
    //登録ボタン要素s湯特
    const createTodoButton = document.getElementById('create-todo-button');
    //日付要素取得
    const limitDateArea = document.getElementById('limit-date');
    //TODO表示エリア取得
    const printTodoArea = document.getElementById('print-todo-area');

    /**
     * ユーザーが作ったTodoの内容とその期限の日付を連想配列で返す
     * @return {object} Todoの内容と期限日付
     */
    function getUserTodoInfo() {
        const todoContent = userInputArea.value;
        const todoLimitDate = limitDateArea.value;
        const todo = { content: todoContent, limitDate: todoLimitDate };

        return todo;
    }

    /**
     * TODOをWebStorageへ保存する
     */
    function saveTodoToStorage() {
        //todoの内容と期限日付を取得
        const todo = getUserTodoInfo();
        //連想配列で保存
        storage.setItem('1', JSON.stringify(todo));
    }

    /**
     * webstorageから引数Keyと対応するデータを取得して返す
     * @param {object} key webstorageのキー
     */
    function getTodoFromStorage(key) {
        //オブジェクトとしてパースしてデータ取得
        const result = JSON.parse(storage.getItem(key));
        return result;
    }

    /**
     * 画面に作成済みTODOを表示する
     * @param {String} content TODO内容
     * @param {String} limit TODOの期限日付
     */
    function printTodo(content, limit) {
        //表示用メッセージ
        const message = 'TODO: ' + content + ' 期限: ' + limit;
        //表示
        printTodoArea.innerHTML = message;
    }

    /**
     * 登録ボタンが押されたら編集ボタンを作成する
     */
    function createEditButton() {
        //Editボタン要素作成
        const editButton = document.createElement('button');
        //id=edit属性付与
        editButton.setAttribute('id', 'edit');
        editButton.innerHTML = '編集';
        //id=edit-area要素の子要素として生成
        document.getElementById('edit-area').appendChild(editButton);
    }

    /**
     * 削除ボタン作成
     */
    function createDeleteButton() {
        //削除ボタン要素作成
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', 'delete');
        deleteButton.innerHTML = '削除';
        document.getElementById('edit-area').appendChild(deleteButton);
    }

    /**
     * 完了ボタンを作成
     */
    function createDoneButton() {
        const doneButton = document.createElement('button');
        doneButton.setAttribute('id', 'done');
        doneButton.innerHTML = '完了';
        document.getElementById('edit-area').appendChild(doneButton);
    }

    createTodoButton.onclick = () => {
        //保存
        saveTodoToStorage();
        //ストレージからTODO取得
        const result = getTodoFromStorage('1');
        //画面に表示
        printTodo(result['content'], result['limitDate']);
        //編集(編集と削除)ボタンを作成
        createEditButton();
        createDeleteButton();
        createDoneButton();
    };
})();