import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator'
import router from './routes/partyRouter';
import officeRouter from './routes/officeRouter';
import userRouter from './routes/userRouter';
import candidateRouter from './routes/candidateRouter';
import voteRouter from './routes/voteRouter';
import resultRouter from './routes/resultRouter';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.yaml';
import chores from 'cors';

const app = express();

const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator())
app.use(chores());

app.use(router);
app.use(officeRouter);
app.use(userRouter);
app.use(candidateRouter);
app.use(voteRouter);
app.use(resultRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.get('/', (req,res,next)=>{
    res.send('Welcome to Politico App')
})

app.listen(port, () => {
    console.log('hello')
});

export default app
