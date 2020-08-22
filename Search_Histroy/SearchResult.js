class SearchResult {
    constructor(data, target) {
        this.data = data
        this.$target = document.querySelector(target)
        this.render()
    }
    setState(newData) {
        this.data = newData
        this.render()
    }
    render() {

        const htmlString = this.data.length === 0 ? '해당 키워드의 이미지가 없습니다' : this.data.map(({
            imageUrl
        }) => `<img src="${imageUrl}">`).join('')

        this.$target.innerHTML = htmlString
    }
}

export default SearchResult