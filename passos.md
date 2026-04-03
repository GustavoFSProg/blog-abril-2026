1 - npm init -y


2- npm install express
npm install -D typescript ts-node-dev @types/node @types/express

3- npx tsc --init

4 - no tsconfig.json:

    {
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}


5 - na src/index.ts

   import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Servidor Node com TypeScript funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


6 - "scripts": {
  "dev": "ts-node-dev --respawn src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}

FUNCIONOU:

    "build": "sucrase ./src -d ./dist  --transforms typescript,imports && cp -r ./src/generated dist/ ",
