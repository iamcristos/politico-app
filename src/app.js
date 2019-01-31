import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/partyRouter';
import officeRouter from './routes/officeRouter';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);
app.use(officeRouter);

app.listen(3000, () => {
    console.log('hello')
});

export default app
