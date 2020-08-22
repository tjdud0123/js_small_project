class TodoInput {
    constructor($app) {
        this.value = ''
        this.$app = $app
        this.init()
    }
    init() {
        // innerHtml
        document.querySelector('#todo-input').innerHTML =
            `<aside>
            <label for="newTodo"> + 할 일 추가하기</label><br>
            <input type="text" id="newTodo" name="newTodo" placeholder="추가 할 내용을 입력해 주세요">
            <input type="submit" value="추가" id="addBtn"><br>
            <button id="remove-all">투두리스트 모두제거</button>
            </aside>`;

        // element
        this.$input = document.querySelector('#newTodo');
        this.$removeallBtn = document.querySelector('#remove-all');

        // 커스텀 이벤트
        this.$removeallBtn.addEventListener('click', e => {
            const eventRemoveAll = new CustomEvent('remove-all')
            console.log(this.$app)
            this.$app.dispatchEvent(eventRemoveAll);
        })
    }
    getValue() {
        this.value = this.$input.value
        this.resetValue()
        return this.value
    }
    resetValue() {
        this.$input.value = ''
        this.$input.focus()
    }

}