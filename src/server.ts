import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

const customLogger = (message) => (req, res, next) => {
  console.log(`Hello from ${message}`);
  next();
}


app.use(cors()); //Cross-Origin Resource Sharing
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(customLogger('customer logger'));

app.use((req, res, next) => {
  req.nombre_de_mi_perrito = 'logged'; 
  //res.status(401);
  //res.send('Nope');
  next();
});

app.get('/', (req, res) => {
  // console.log('Hello from ExpressJS');
  // res.status(200);
  res.json({message: 'hello'});
  //throw new Error('hello');
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);


app.use((err, req, res, next)=> {
  if (err.type === 'auth'){
    res.status(401).json( {message: 'unauthorized'} );
  }else if(err.type === 'input'){
    res.status(400).json( {message: 'invalid input'} );
  }else{
    res.status(500).json( {message: 'Opps, thats on us!'} );
  }
});

export default  app;