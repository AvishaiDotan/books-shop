'use strict'

const ON = true
const OFF = false


var gQueryString = {}

function onInit() {
    renderApp()
}



function renderApp() {
    renderAppByQueryStringParams()
    renderPaging()
    renderBooks()
}

function renderPaging() {
    
    const currPage = getPagingData().currPage
    const maxPage = getPagingData().maxPage

    const elBtns = document.querySelectorAll('.scroll-page-btns button')

    elBtns.forEach((btn, idx) => {
        if (btn.dataset.operation === 'prev') {
            btn.dataset.next = currPage - 1
            btn.disabled = isInvalidPage(currPage - 1)
        } else if (+btn.dataset.operation < 5) {
            btn.dataset.next = idx
            btn.innerText = idx
            btn.disabled = isInvalidPage(idx) 
        } else if (+btn.dataset.operation === 5) {
            btn.dataset.next = currPage + 5
            btn.disabled = isInvalidPage(currPage + 5) 
        } else if (btn.dataset.operation === 'max') {
            btn.dataset.next = maxPage 
            btn.innerText = maxPage 
        } else {
            btn.dataset.next = currPage + 1
            btn.disabled = isInvalidPage(currPage + 1) 
        }
    })

    const page = document.querySelector('.page-num')
    page.innerText = currPage
}

function renderBooks() {
    const books = getBooks()
    const view = getViewPref()
    var elSectionStrHtml

    if (view === 'list') {
        var booksKeys = ['ID', 'Name', 'Price', 'Rating', 'Image']
        booksKeys = booksKeys.map(key => `\n\t<td data-trans="${key.toLowerCase()}">${_getTrans(key.toLowerCase())}</td>`)
        booksKeys.push(`\n\t<td data-trans="options" colspan="3">${_getTrans('options')}</td>`)
    
        //  Change name
        const strHTMLsTableBodyTd = books.map((book) => `
            <tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td data-price="${book.price}" >${formatCurrencySign(book.price)}</td>
                <td>${book.rating}</td>
                <td><img src="${book.imgUrl}"></img></td>
                <td><button data-trans="read-action" onclick="onOpenBookModal('${book.id}')">Read</button></td>
                <td><button data-trans="update-action" onclick="onUpdateBook('${book.id}')">Update</button></td>
                <td><button data-trans="delete-action" onclick="onRemoveBook('${book.id}')">Delete</button></td>
            </tr>
        `)
    
        const elTable = ` <table class="table-layout">
                                <thead>
                                    <tr>
                                        ${booksKeys.join('')} 
                                    </tr>
                                </thead>
                                <tbody class="table-body">
                                    ${strHTMLsTableBodyTd.join('')}
                                </tbody>
                            </table>`
        
        elSectionStrHtml = elTable
    } else {
        // books-action-container  |  btn classes: action-read action
        const articles = books.map(book => `
        <article>
            <img src="${book.imgUrl}">
            <p>${book.name}</p>
            <div class="books-option-btns-container">
                <button onclick="onOpenBookModal('${book.id}')">Read</button></td>
                <button onclick="onUpdateBook('${book.id}')">Update</button></td>
                <button onclick="onRemoveBook('${book.id}')">Delete</button></td>
            </div>
        </article>`)
        elSectionStrHtml = articles.join('')
    }


    
    const elSection = document.querySelector('.books-layout')
    elSection.innerHTML = elSectionStrHtml
}


function updateWindowPath() {
    _setQueryStringByFilter()
    _setQueryStringByModal()
    _setQueryStringByPage()
    _setQueryStringByLang()

    const queryString = getQueryStringParams()

    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryString
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function getQueryStringParams() {
    return `?maxPrice=${gQueryString.maxPrice}&minRate=${gQueryString.minRate}&custom=${gQueryString.custom}&bookId=${gQueryString.bookId}&page=${gQueryString.currPage}&lang=${gQueryString.lang}`
}

function renderAppByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterParams = {
        maxPrice: queryStringParams.get('maxPrice') || '',
        minRate: queryStringParams.get('minRate') || 0,
        custom: queryStringParams.get('custom') || '',
    }
    const pageParams = {
        bookId: queryStringParams.get('bookId') || '',
        currPage: queryStringParams.get('page') || 0,
        lang: queryStringParams.get('lang') || 'eng'
    }

    document.querySelector('.filter-price-range').value = filterParams.maxPrice
    document.querySelector('.filter-rate-range').value = filterParams.minRate
    document.querySelector('.custom-filter').value = filterParams.custom
    document.querySelector('.lang-select').value = pageParams.lang

    _setOpenBookByQueryParam(pageParams.bookId)
    _setPageByQueryParam(+pageParams.currPage)
    _setLangByQueryParam(pageParams.lang)
    setFilterBy(filterParams)
}

function onRemoveBook(bookId) {
    removeBook(bookId)

    renderPaging()
    renderBooks()
}

function onAddBook() {

    const bookName = document.querySelector(`[name="name"]`).value
    const price = +document.querySelector(`[name="price"]`).value
    const rating = +document.querySelector(`[name="rating"]`).value
    const imgUrl = document.querySelector(`[name="imgUrl"]`).value || getImgPath()

    if (!bookName || !(price > 0 && price < 1000) || !(rating >= 0 && rating <= 10)) {
        document.querySelector('.add-book-btn').classList.add('shake')
        setTimeout(() => {document.querySelector('.add-book-btn').classList.remove('shake')}, 500)
        return
    }

    addBook(bookName, price, rating, imgUrl)
    _resetFilters()

    renderPaging()
    renderBooks()
    onCloseAddBookModal()
}

function onOpenBookModal(bookId) {

    const book = openBook(bookId)
    document.querySelector('.abstract').innerText = book.abstract
    document.querySelector('.name-id').innerText = book.id
    document.querySelector('.name-name').innerText = book.name
    document.querySelector('.name-price').innerText = book.price
    document.querySelector('.name-img-url').innerText = book.imgUrl
    document.querySelector('.rating span').innerText = book.rating
   
    // CR Implement: 
    // document.querySelector('.book-rate').innerHTML=    `
    // <p>Rating: </p>
    // <button onclick="onSetRating(-1, '${book.id}')">➖</button>
    // <span class="rating"><span></span></span>
    // <button onclick="onSetRating(+1, '${book.id}')">➕</button>
    // `
    
    _setModalDisplay(ON)
    updateWindowPath()
}

function onCloseBookModal() {
    closeBook()
    _setModalDisplay(OFF)

    updateWindowPath()
    renderPaging()
    renderBooks()
}

function onUpdateBook(bookId) {
    const price = prompt('New price?')
    updateBook(bookId, price)
    
    renderPaging()
    renderBooks()
}




function onSetRating(operation) {  
    setRating(operation)
    const book = getOpenedBook()

    document.querySelector('.rating span').innerText = book.rating
}

function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value

    if (!prop) return

    const isDesc = document.querySelector('.sort-desc').checked
    const sortBy = {
        prop,
        isDesc: isDesc ? 1 : -1,
    }

    setSortBy(sortBy)
    updateWindowPath()

    renderPaging()
    renderBooks()
}

function onSetFilterBy(filterObj) {
    setFilterBy(filterObj)
    onSetPage(0)

    updateWindowPath()
    renderPaging()
    renderBooks()
}

function onSetPage(page) {
    setPage(page)

    updateWindowPath()
    renderPaging()
    renderBooks()
}

function onOpenAddBookModal() {
    const elModal = document.querySelector('.dark-overlay')
    elModal.classList.remove('hide-by-display')
}

function onCloseAddBookModal() {
    document.querySelector(`[name="name"]`).value = ''
    document.querySelector(`[name="price"]`).value = ''
    document.querySelector(`[name="rating"]`).value = ''
    document.querySelector(`[name="imgUrl"]`).value = ''

    const elModal = document.querySelector('.dark-overlay')
    elModal.classList.add('hide-by-display')
}

function onSwitchBooksDisplay() {
    var view = getViewPref()
    toggleBooksViewPref()

    renderPaging()
    renderBooks()

    const elImg = document.querySelector('.view-switch-img')
    elImg.src = `img/${view}-icon.png`
}

function onSetLang(lang) {
    setLang(lang)
    updateWindowPath()
}


function _setLangByQueryParam(lang) {
    onSetLang(lang)
}

function _setModalDisplay(state) {
    const elModal = document.querySelector('.book-information-modal')
    if (state) elModal.classList.add('display-by-slide')
    else elModal.classList.remove('display-by-slide')
}

function _setQueryStringByFilter() {
    const filterBy = getFilter()
    gQueryString.maxPrice = filterBy.maxPrice || ''
    gQueryString.minRate = filterBy.minRate || ''
    gQueryString.custom = filterBy.custom || ''
}

function _setQueryStringByModal() {
    const book = getOpenedBook()
    gQueryString.bookId = book ? book.id : ''
}

function _setQueryStringByPage() {
    const currPage = getPagingData().currPage
    gQueryString.currPage = currPage
}

function _setQueryStringByLang() {
    const lang = getLang()
    gQueryString.lang = lang
}

function _setOpenBookByQueryParam(bookId) {
    if (!bookId) return
    onOpenBookModal(bookId)
}

function _setPageByQueryParam(page) {
    onSetPage(page)
}

function _resetFilters() {
    onSetFilterBy({})
}





