import * as yup from 'yup';

export default () => {
    const data = document.querySelector('input');
    data.addEventListener('input', async (e) => {
        let linkSchema = yup.object({
            link: string().url().lowercase().trim().nullable().test({
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
            }),
        })
            .json()
            .camelCase();
        let link = await linkSchema.validate(await fetch(e.target.value));
        const items = await link.json();
        const list = document.createElement('ul');
        const dataDiv = document.querySelector('div.posts');
        dataDiv.append(list);
        const options = items.length === 0 ? '' : items;
        const listHTML = options.map((item) => `<li>${item}</li>`).join('\n');
        list.innerHTML = listHTML;
    });

};