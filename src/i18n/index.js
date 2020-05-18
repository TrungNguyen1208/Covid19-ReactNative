import trTR from './tr-TR';
import enUS from './en-US';

class Index {
    constructor() {
        this.LANG = 'tr-TR';
    }

    get(key) {
        switch(this.LANG) {
            case 'tr-TR':
                return trTR[key];
            case 'en-US':
                return enUS[key];
        }
    }
}

export default new Index();
