class SearchHistory {
  constructor() {
    this.histories = []
    this.init()
  }
  add(keyWord) {
    if (keyWord && !this.histories.indexOf(keyWord) > -1) {
      this.histories.push(keyWord)
      this.render()
    }
  }
  render() {
    console.log(this.histories)
    const htmlString = this.histories
      .map((keyWord) => `<li>${keyWord}</li>`)
      .join('')
    this.$histories.innerHTML = htmlString
  }
  init() {
    this.$ = document.querySelector('#search-history')
    this.$.innerHTML = '<h2>검색 히스토리</h2><div id = "history"></div>'
    this.$histories = document.querySelector('#history')
    this.$histories.innerHTML = '검색내역이 없습니다'
  }
}

export default SearchHistory