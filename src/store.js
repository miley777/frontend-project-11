import { proxy } from 'valtio';

const defaultLanguage = 'ru';

export const state = proxy({
        ui: {
            lng: defaultLanguage,
        },
        form: {
            response: '',
            processState: 'loading',
            errors: '',
            valid: true,
            validatedLink: '',
        },
        currentFeed: '',
        selectedItem: '',
        activePost: '',
        viewedPosts: [],
        fetchedData: '',
        data: {
            posts: [],
            feeds: [],
        }
    });