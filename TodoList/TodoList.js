// 추가 구현사항 - 보너스 구현사항 (에러 처리)
function validateData(data) {
    console.log(data)
    if (!data) {
        throw new Error('data가 없습니다')
    }
    if (!Array.isArray(data)) {
        throw new Error('배열 형태가 아닙니다')
    }
    if (data.some((data) => typeof data.text !== 'string')) {
        throw new Error(' text 프로퍼티의 타입이 string 이어야 합니다')
    }
}

// 클래스버전
class TodoList {
    constructor(data, queryId) {
        validateData(data)
        this.todos = data
        this.queryId = queryId
        if (!document.querySelector(this.queryId)) {
            throw new Error('해당 노드를 찾을 수 없습니다.')
        }
        this.render()
    }
    render() {
        document.querySelector(this.queryId).innerHTML = this.todos
            .map(
                (todo, index) =>
                `<li id="${index}">` +
                (todo.isCompleted ?
                    `<s class="completed">${todo.text}</s>&#9996;` :
                    `<p>${todo.text}</p>`) +
                `<button class="del-btn">삭제</button>` +
                '</li>'
            )
            .join('\n')
    }
    setState(nextData) {
        this.todos = nextData
        this.render()
        // 로컬스토리지에 저장
        localStorage.setItem('data', JSON.stringify(nextData))
    }
}