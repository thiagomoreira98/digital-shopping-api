const app = require("express")();
const bodyParser = require("body-parser");
const consign = require("consign");
const port = process.env.PORT || 4001;
const response = require('./src/api/middleware/response');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(response);

// Routes
consign({ cwd: 'src/api/' })
    .include('routes')
    .into(app);

app.listen(port, () => {
    console.log(`Server online on port: ${port}`);
});