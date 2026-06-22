import { proxy } from 'valtio';

const defaultLanguage = 'en';

export const state = proxy({
        ui: {
            lng: defaultLanguage,
        },
        form: {
            //field: {
            //    link: '',
            //},
            //urlLists: []  //{ id: someId, link: link, ?name: name}
            response: '',
            //error: {},
            processState: 'filling',
            errors: '',
            processError: null,
            isNotValid: true,
        },
        currentFeed: '',
        activePostId: '',
        data: {
            posts: [],
            feeds: [],
        }
    });