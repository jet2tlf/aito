const aito = require("aito")

const app = aito()

const logger = (req, res, next) => {
    console.log(req.headers['user-agent']);
    next();
}

app.get("/", logger)

app.get('/', (req, res) => {
    res.send({ message: "success" });
});

app.get('/2', (req, res) => {
    res.writeHead(200)
    res.write('Hello world from /2');
    res.end();
});

app.post('/post',(req,res) => {
    res.writeHead(200)
    res.write('Data from post :)');
    res.end();
})

app.listen(3000, () => console.log('App listening on port 3000!'))