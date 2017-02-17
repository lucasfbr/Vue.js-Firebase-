var chatComponent = Vue.extend({
    template: `
                <style type="text/css" scoped>
                    .chat {
                        padding: 0;
                    }
                    .chat li {
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .chat li.left .chat-body {
                        margin-left: 100px;
                    }
                    .chat li.right .chat-body {
                        text-align: right;
                        margin-right: 100px;
                    }
                    .panel-body {
                        overflow-y: scroll;
                        height: 400px;
                    }
                </style>
                <div class="panel panel-primary">
                    <div class="panel-heading">Chat</div>
                    <div class="panel-body">
                        <ul class="chat list-unstyled">
                            <li class="clearfix"
                                v-bind:class="{left: !isUser(o.email), right: isUser(o.email)}" v-for="o in messages">
                                <span v-bind:class="{'pull-left': !isUser(o.email), 'pull-right': isUser(o.email)}">
                                    <img v-bind:src="o.photo" class="img-circle"/>
                                </span>
                                <div class="chat-body">
                                    <strong>{{o.name}}</strong>
                                    <p>{{o.text}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-footer">
                        <div class="input-group">
                            <input type="text" class="form-control input-md" 
                                    placeholder="Digite sua mensagem" v-model="message" @keyup.enter="sendMessage"/>
                            <span class="input-group-btn">
                                <button class="btn btn-success btn-md" @click="sendMessage">Enviar</button>
                            </span>
                        </div>
                    </div>
                </div>
        `,
    created: function(){
        var roomRef = 'chat/rooms/' + this.$route.params.room;
        this.$bindAsArray('messages', db.ref(roomRef + '/messages'));
    },
    data: function () {
        return {
            user: {
                email: 'lucas-fbr@hotmail.com',
                name: 'Lucas Rosa',
                photo: 'https://placeholdit.imgix.net/~text?txtsize=6&txt=50%C3%9750&w=50&h=50'
            },
            message: [
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
        };
    },
    methods: {
        isUser: function (email) {
            return this.user.email == email;
        },
    }
});

var appComponent = Vue.extend({});

var router = new VueRouter();

router.map({
    '/chat': {
        component: chatComponent
    }
});

router.start(appComponent,"#app");