export default {
    translation: {
        languages: {
            ru: 'Russian',
        },

        errors: {
            validation: {
                url: 'Ссылка должна быть валидным URL', //рамка, проверка ввода
                required: 'Поле не должно быть пустым', //рамка?
                matches: 'Ресурс не содержит валидный RSS', //нет рамки
            },
            unique: 'RSS уже существует', //рамка, проверка ввода
            networkError: 'Ошибка сети', //нет рамки, 
        }, 
        success: 'RSS успешно загружен',
    
    }
}