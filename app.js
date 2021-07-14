// Reference to the sequelize module by using global require function
let Sequelize = require('sequelize');
// Sequelize is a constructor function

// demo_schema - name of db sequelize should connect to
// root - username for your database
// password - password
// returns an object that effectively represent the connection to our database
// without defining dialect it will be 'mysql' by default
let connection = new Sequelize('demo_schema', 'student', 'password', {
    dialect: 'postgres',
});

// we can begin to define models using this connection object as we have provided sequelize with all the necessary info
// to defining model we use define function on the connection object
// article - name of the model with properties of the model (title and body)
//
let Article = connection.define(
    'article',
    {
        slug: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        body: {
            type: Sequelize.TEXT,
            defaultValue: 'Coming soon ...',
        },
    },
    {
        timestamps: false,
    }
);

// sync function is gonna connect to the database and then automatically generate the sequal,
// that will create corresponding table in our database
// connection.sync().then(function () {});
// .then( callback function )
// sync function that creates a table might take a long time to finish doing it's job
// we don't want to attempt to insert a record into the table that doesn't exist
// basically the only way to know for sure that the table has been generated before you insert a record
// from event of callback function as we doing here
// connection.sync().then(function () {
//     Article.create({
//         title: 'demo schema',
//         body: 'lorem lorem lorem',
//     });
// });

//--TypeError: Article.findById is not a function--//
// connection.sync().then(function () {
//     Article.findById(1).then(function (article) {
//         console.log(article.dataValue);
//     });
// });
//--TypeError: Article.findById is not a function--//

// connection.sync().then(function () {
//     Article.findAll().then(function (articles) {
//         console.log(articles.dataValue);
//     });
// });

// let Article = connection.define('article', {
//     title: Sequelize.STRING,
//     body: {
//         type: Sequelize.TEXT,
//         defaultValue: 'Coming soon',
//     },
// });

// connection.sync().then(function () {
//     Article.findAll().then(function (article) {
//         console.log(article.dataValue);
//     });
// });

connection
    .sync({
        force: true,
        logging: console.log(),
    })
    .then(function () {})
    .catch(function (error) {
        console.log(error);
    });
