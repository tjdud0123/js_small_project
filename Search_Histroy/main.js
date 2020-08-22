// 모듈 불러오기 - require과 import 차이? 실행하는 방법 모르겠음
// Uncaught SyntaxError: Cannot use import statement outside a module
import SearchHistory from "./SearchHistory.js"
import SearchResult from "./SearchResult.js"


const searchResult = new SearchResult([], '#search-result')
const searchHistory = new SearchHistory()

const $history = document.querySelector('#history')
const $input = document.querySelector('#search-keyword')

// 디바운싱
let timer;

document.querySelector('#search-keyword').addEventListener(
    'keyup',
    function (e) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(async function () {
            const keyWord = e.target.value
            const newData = await fetch(
                `https://jjalbot.com/api/jjals?text=${keyWord}`
            ).then((x) => x.json())
            searchResult.setState(newData)
            searchHistory.add(keyWord)
        }, 1000); // 몇초가 적당..?
    }
)

// 클릭 이벤트
$history.addEventListener(
    'click',
    async function (e) {
        if (e.target.tagName === "LI") {
            const historyWord = e.target.innerHTML
            $input.value = historyWord
            const newData = await fetch(
                `https://jjalbot.com/api/jjals?text=${historyWord}`
            ).then((x) => x.json())
            searchResult.setState(newData)
        }
    }
)