import { proxy } from 'valtio';

const defaultLanguage = 'ru';

export const state = proxy({
        ui: {
            lng: defaultLanguage,
        },
        form: {
            response: '',
            processState: 'filling',
            errors: '',
            processError: null,
            isNotValid: true,
        },
        currentFeed: '',
        selectedItem: '',
        activePost: '',
        viewedPosts: [],
        data: {
            posts: [],
            feeds: [],
        }
    });