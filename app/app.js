var config = {
    apiKey: "AIzaSyD4vsOjFTtet17lExPKx84xeZuT-O-iU-E",
    authDomain: "vuejs-firebase-99b60.firebaseapp.com",
    databaseURL: "https://vuejs-firebase-99b60.firebaseio.com",
    storageBucket: "vuejs-firebase-99b60.appspot.com",
    messagingSenderId: "339835159999"
};
var firebaseApp = firebase.initializeApp(config);

var db = firebaseApp.database   ();

var chatComponent = Vue.extend({
    template: `
                <style type="text/css">
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
    created: function () {
        var rommRef = 'chat/rooms/' + this.$route.params.room;
        this.$bindAsArray('messages', db.ref(rommRef + '/messages'));
    },
    data: function () {
        return {
            user: {
                email: localStorage.getItem('email'),
                name: localStorage.getItem('name'),
                photo: localStorage.getItem('photo'),
            },
            message: ''
        };
    },
    methods: {
        isUser: function (email) {
            return this.user.email == email;
        },
        sendMessage: function () {
            this.$firebaseRefs.messages.push({
                name:  this.user.name,
                email: this.user.email,
                text:  this.message,
                photo: this.user.photo,

            });
        }
    }
});

var roomsComponent = Vue.extend({
    template: `
        <div class="col-md-4" v-for="o in rooms">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    {{o.name}}
                </div>
                <div class="panel-body">
                    {{o.description}}
                    <br />
                    <a href="#" @click="openModal($event, o)">Entrar</a>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalLoginEmail" tabindex="-1" role="dialog" aria-labelledby="modalLoginEmail">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="exampleModalLabel">Entre com as informações</h4>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <input type="text" class="form-control" name="email" v-model="email" placeholder="E-mail">
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" name="name" v-model="name" placeholder="Nome">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" @click="login">Login</button>
              </div>
            </div>
          </div>
        </div>
        `,
        firebase:{
            rooms: db.ref('chat/rooms')
        },
        data: function () {
            return {
                rooms: [],
                name: '',
                email: '',
                room: null
            }
        },
        methods: {
            login: function () {

                localStorage.setItem('name', this.name);
                localStorage.setItem('email', this.email);
                localStorage.setItem('photo','http://www.gravatar.com/avatar/'+md5(this.email)+'.jpg');

                $('#modalLoginEmail').modal('hide');

                this.$route.router.go('/chat/'+this.room.id);
            },
            openModal: function (e, room) {

                e.preventDefault();

                this.room = room;

                $('#modalLoginEmail').modal('show');
            }
        }
});

var rooms = [
    {id: "001", name: "PHP", description: "Entusiasta do PHP"},
    {id: "002", name: "Java", description: "Developer experts"},
    {id: "003", name: "C#", description: "Os caras do C#"},
    {id: "004", name: "C++", description: "Fissurados por programação"},
    {id: "005", name: "Javascript", description: "Olha a web aí!"},
    {id: "006", name: "Vue.js", description: "Chat dos caras do data-binding"},
];

var roomsCreateComponent = Vue.extend({
    template: `
        <ul>
            <li v-for="o in rooms">
                {{o.name}}
            </li>
        </ul>
    `,
    firebase:{
        rooms: db.ref('chat/rooms')
    },
    ready: function (){
        var chatRef = db.ref('chat');
        var roomsChildren = chatRef.child('rooms')

        rooms.forEach(function (room) {
            roomsChildren.child(room.id).set({
                id: room.id,
                name: room.name,
                description: room.description
            });
        })
    }
});

var appComponent = Vue.extend({});

var router = new VueRouter();

router.map({
    '/chat/:room': {
        component: chatComponent
    },
    '/rooms' : {
        component: roomsComponent
    },
    'rooms-create' : {
        component: roomsCreateComponent
    }
});

router.start(appComponent,"#app");