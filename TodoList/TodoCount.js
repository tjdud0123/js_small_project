class TodoCount {
    constructor(data) {
        this.todoNum = data ? data.length : 0
        this.completeNum = data ? data.filter(todo => todo.isCompleted).length : 0
        this.render()
    }
    render() {
        document.querySelector('#todo-count').innerHTML =
            `&#128203; 할 일 : ${this.todoNum}개<br> &#9989; 완료한 일 : ${this.completeNum}개`
    }
    setState(nextData) {
        this.todoNum = nextData.length
        this.completeNum = nextData.filter(todo => todo.isCompleted).length
        this.render()
    }
}