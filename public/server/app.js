"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
require('dotenv').config();
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes/routes");
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
app.use(express_1.default.static(path_1.default.join(__dirname, '/../client')));
app.set('view engine', 'handlebars');
app.engine('handlebars', express_handlebars_1.default({
    defaultLayout: 'main',
    layoutsDir: path_1.default.join(__dirname, '/../../views/layouts')
}));
app.use(body_parser_1.default.json());
app.use(cors_1.default({
    origin: function (origin, callback) {
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
}));
//test DB
database_1.db.authenticate()
    .then(() => {
    console.log('DB connected');
})
    .catch((err) => {
    console.log('Error: ' + err);
});
//Authentication
let SequelizeStore = require('connect-session-sequelize')(express_session_1.default.Store); // initalize sequelize with session store
function extendDefaultFields(defaults, session) {
    return {
        data: defaults.data,
        expires: defaults.expires,
        userId: session.userId
    };
}
let seshStore = new SequelizeStore({
    db: database_1.db,
    table: 'Session',
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 10 * 1000,
    extendDefaultFields
});
app.use(express_session_1.default({
    name: "sid",
    saveUninitialized: true,
    resave: true,
    secret: "make_up_a_better_secret",
    store: seshStore,
    cookie: {
        path: "/",
        maxAge: 1000 * 60 * 100,
        sameSite: 'strict',
        secure: false //no https :(
    }
}));
seshStore.sync();
//Middleware
app.use('/', routes_1.router);
database_1.db.sync()
    .then(() => {
    app.listen(process.env.PORT || 3002);
})
    .catch(err => console.log(err));
//# sourceMappingURL=app.js.map