class App {
    constructor() {
        this.data = this.getLocalstorage()
        this.$app = document.querySelector('#App')
        this.init()
    }
    setState(nextData) {
        this.todoList.setState(nextData)
        this.todoCount.setState(nextData)
    }
    getLocalstorage() {

        try {
            const data = localStorage.getItem('data') || []
            return JSON.parse(data)
        } catch (err) {
            throw new Error('데이터를 불러오는 것에 실패했습니다')
        }
    }

    // 투두리스트 추가
    addTodo() {
        const todoText = this.todoInput.getValue()
        this.data.push({
            text: todoText,
            isCompleted: false,
        })
        this.setState(this.data)
    }

    // 투두 리스트 삭제하기
    delTodo(todoId) {
        this.data.splice(todoId, 1)
        this.setState(this.data)
    }

    // toggle 처리
    toggleTodo(todoId) {
        this.data[todoId].isCompleted = !this.data[todoId].isCompleted
        this.setState(this.data)
    }

    init() {
        // innerHtml
        this.$app.innerHTML = `<article class="todoContainer">
            <h2>투두 리스트</h2>
            <div id="todo-list"></div>
            <div id="todo-count"></div>
            </article>
            <div id="todo-input"></div>`

        //TodoList 컴포넌트
        this.todoList = new TodoList(this.data, '#todo-list')
        // TodoCount 컴포넌트
        this.todoCount = new TodoCount(this.data)
        //TodoInput 컴포넌트
        this.todoInput = new TodoInput(this.$app)

        // element
        this.$listNode = document.querySelector('#todo-list')
        this.$removeallBtn = document.querySelector('#remove-all')
        this.$addBtn = document.querySelector('#addBtn')
        this.$input = document.querySelector('#newTodo')

        /* 추가 버튼 클릭 */
        this.$addBtn.addEventListener('click', (e) => {
            this.addTodo()
        })
        /* 엔터입력 */
        this.$input.addEventListener('keypress', (e) => {
            if (e.keyCode === ENTER_KEY) {
                this.addTodo()
            }
        })

        // 삭제,토글 이벤트 처리 - 이벤트 위임
        this.$listNode.addEventListener('click', (e) => {
            const idx = e.target.parentNode.id
            if (idx !== 'todo-list') {
                e.target.tagName !== 'BUTTON' ? this.toggleTodo(idx) : this.delTodo(idx)
            }
        })

        // 커스텀 이벤트 - 모두제거
        this.$removeallBtn.addEventListener('click', (e) => {
            const eventRemoveAll = new CustomEvent(REMOVE_ALL)
            this.$app.dispatchEvent(eventRemoveAll)
        })

        this.$app.addEventListener(REMOVE_ALL, (e) => {
            this.data = []
            this.setState(this.data)
        })
    }
}