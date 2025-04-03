import * as yup from 'yup';

export default () => {
    //console.log('gjkhg');
    const form = document.querySelector('div.row');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const list = document.createElement('ul');
        const dataDiv = document.querySelector('div.posts');
        const ent = [...formData.entries()];
        ent.forEach((ert) => {
            const [key, value] = ert;
            const valueEsc = htmlEscape(value);
            let linkSchema = yup.string().url().lowercase().trim().nullable().test({
                name: 'is-link',
                test(value, ctx) {
                    if (!value.startsWith('http')) {
                        return ctx.createError({ message: 'LINK missing correct prefix' });
                    }
                    if (!value.length < 12) {
                        ctx.createError({ message: 'LINK is not the right length' });
                    }
                    return true;
                },
            });
            let link = await linkSchema.validate(valueEsc);
            //const linkJson = await link.json();
            list.innerHTML  = `<li>${link}</li>`;
        });
        dataDiv.append(list);
    });
};