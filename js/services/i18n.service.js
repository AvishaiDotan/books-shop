'use strict'

const ENGLISH = 'eng'
const HEBREW = 'heb'

var gLang = ENGLISH

const gTrans = {
    'title': {
        'heb': 'חנות ספרים',
        'eng': 'Book Shop',
    },
    'sort-header': {
        'heb': 'מיין',
        'eng': 'Sort',
    },
    'by-price': {
        'heb': 'על פי מחיר',
        'eng': 'By Price',
    },
    'by-rating': {
        'heb': 'על פי דירוג',
        'eng': 'By Rating',
    },
    'by-name': {
        'heb': 'על פי שם',
        'eng': 'By Name',
    },
    'by-id': {
        'heb': 'על פי מזהה',
        'eng': 'By ID',
    },
    'sort-direction-checkbox-p': {
        'heb': 'סדר יורד',
        'eng': 'Descending',
    },
    'filter-header': {
        'heb': 'סנן',
        'eng': 'Filter',
    },
    'max-price-range-header': {
        'heb': 'סנן',
        'eng': 'Filter',
    },
    'min-rate-range-header': {
        'heb': 'מחיר מקסימאלי',
        'eng': 'Max Price',
    },
    'misc-header': {
        'heb': 'שונות',
        'eng': 'Misc',
    },
    'page': {
        'heb': 'עמוד',
        'eng': 'Page',
    },
    'book-abstract': {
        'heb': 'תקציר',
        'eng': 'Abstract',
    },
    'book-id': {
        'heb': 'מזהה ספר',
        'eng': 'Book ID',
    },
    'book-name': {
        'heb': 'שם הספר',
        'eng': 'Book Name',
    },
    'book-price': {
        'heb': 'מחיר הספר',
        'eng': 'Book Price',
    },
    'img-url': {
        'heb': 'קישור לתמונת הספר',
        'eng': 'Image Url',
    },
    'rating': {
        'heb': 'דירוג',
        'eng': 'Rating',
    },
    'close': {
        'heb': 'סגור',
        'eng': 'Close',
    },
    'add-book-modal-header': {
        'heb': 'פרטי הספר החדש',
        'eng': 'New Book Data',
    },
    'submit': {
        'heb': 'טען',
        'eng': 'Submit',
    },
    'cancel': {
        'heb': 'בטל',
        'eng': 'Cancel',
    },
    'id': {
        'heb': 'מזהה',
        'eng': 'ID',
    },
    'name': {
        'heb': 'שם',
        'eng': 'Name',
    },
    'price': {
        'heb': 'מחיר',
        'eng': 'Price',
    },
    'image': {
        'heb': 'תמונה',
        'eng': 'Image',
    },
    'options': {
        'heb': 'אפשרויות',
        'eng': 'Options',
    },
    'book-name': {
        'heb': 'שם הספר',
        'eng': 'Book Name',
    },
    'read-action': {
        'heb': 'פתח',
        'eng': 'Read',
    },
    'update-action': {
        'heb': 'עדכן',
        'eng': 'Update',
    },
    'delete-action': {
        'heb': 'מחק',
        'eng': 'Delete',
    },
    'enter-book-name-placeholder': {
        'heb': '...הכנס את שם הספר',
        'eng': 'Enter Book\'s Name...',
    },
    'enter-book-price-placeholder': {
        'heb': 'הכנס את מחיר הספר...',
        'eng': 'Enter Book Price..',
    },
    'enter-book-rating-placeholder': {
        'heb': 'הכנס את דירוג הספר...',
        'eng': 'Enter Book Rating..',
    },
    'enter-book-img-placeholder': {
        'heb': 'הכנס את תמונת הספר...',
        'eng': 'Enter Image Url..',
    },

}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = _getTrans(transKey)
        el.innerText = trans
        if (el.placeholder) el.placeholder = trans
    })
}

function setLang(newLang) {
    gLang = newLang
    doTrans()
}

function getLang() {
    return gLang
}

function _getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'Unknown'

    const trans = transMap[gLang]
    if (!trans) return transMap[ENGLISH]

    return trans
}
