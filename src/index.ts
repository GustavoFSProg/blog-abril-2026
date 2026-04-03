import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes';

  dotenv.config()

const app = express();
const {PORT} = process.env;


app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


export default app