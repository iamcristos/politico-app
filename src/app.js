import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator'
import router from './routes/partyRouter';
import officeRouter from './routes/officeRouter';
import userRouter from './routes/userRouter';

const app = express();

const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator())

app.use(router);
app.use(officeRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log('hello')
});

export default app
