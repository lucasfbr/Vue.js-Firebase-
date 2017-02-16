
var chat = new Vue({
    el:'#chat',
    data: {
        user:{
            name: 'Lucas Rosa',
            email: 'lucas-fbr@hotmail.com'
        },
        chat: {
            messages: [
                {
                    email: 'fulano@gmail.com',
                    text: 'Olá, eu sou fulano, como você esta?',
                    name: 'Fulano',
                    photo: 'https://placeholdit.imgix.net/~text?txtsize=6&txt=50%C3%9750&w=50&h=50'
                },
                {
                    email: 'lucas-fbr@hotmail.com',
                    text: 'Estou jóia, meu nome é luiz carlos',
                    name: 'Lucas Rosa',
                    photo: 'https://placeholdit.imgix.net/~text?txtsize=6&txt=50%C3%9750&w=50&h=50'
                },
                {
                    email: 'lucas-fbr@hotmail.com',
                    text: 'não te conheço',
                    name: 'Lucas Rosa',
                    photo: 'https://placeholdit.imgix.net/~text?txtsize=6&txt=50%C3%9750&w=50&h=50'
                }
            ]
        }
    },
    methods: {
        isUser: function (email) {
            //return this.user.email == email;

            return alert('sddasdasdasd')
        }
    }
})