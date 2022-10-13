'use strict'

const ENGLISH = 'eng'
const HEBREW = 'heb'

var gCurrLang = ENGLISH

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
    
}

function switchLang() {
    gCurrLang = (gCurrLang === ENGLISH) ? HEBREW : ENGLISH
}