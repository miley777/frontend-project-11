import * as yup from 'yup';
import onChange from 'on-change';
import _ from 'lodash';
import initView from './view.js';

const schema = yup.object().shape({
    url: yup.string().url().lowercase().trim().nullable(),
});

const validate = (fields) => {
    try {
        schema.validateSync(fields, { abortEarly: false });
        return {};
    }
    catch (e) {
        return _.keyBy(e.inner, 'path');
    }
}

const errorMessage = {
    network: {
        error: 'Network connection problem. Try again',
    }
}

export default () => {
    const elements = {
        formVal: document.querySelector('form'),
        inputVal: document.querySelector('input.form-control'),
    }

    const state = {
        form: {
            field: {
                url: '',
            },
            processState: '',
            response: {},
            error: {},
            processError: null,
            isValid: null,
        },
    }
    let urlList = [];

    const watchState = onChange(state, (path) => {
        initView(state, elements, path);
    });

    elements.formVal.addEventListener('submit', async (e) => {
        e.preventDefault();
        watchState.form.processState = 'sending';
        const formData = new FormData(e.target);
        const urlValue = formData.get('url');
        watchState.form.field.url = urlValue.trim();
        const errors = validate(watchState.form.field);
        watchState.form.isValid = _.isEmpty(errors);
        if (watchState.form.isValid) {
            if (urlList.includes(watchState.form.field.url)) {
                watchState.form.error = { url: { message : 'This url is not unique' }};
                throw new Error(`${watchState.form.field.url} is not unique`);
            }
            urlList.push(watchState.form.field.url);
            watchState.form.response = watchState.form.field.url;
            return watchState.form.field.url;
        } else {
            watchState.form.error = errors;
        }
    });
};
