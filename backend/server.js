const jsonServer = require('json-server');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Configuração do servidor JSON
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Localização do arquivo JSON
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Middleware para criptografar senhas ao cadastrar usuário
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/users') {
    if (req.body.password) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
    }
  }
  next();
});

// Rota de login
server.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Busca o usuário pelo email no arquivo db.json
  const users = router.db.get('users').value();
  const user = users.find((u) => u.email === email);

  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json({
      message: 'Login bem-sucedido!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas!' });
  }
});

// Monta as outras rotas do json-server
server.use(router);

// Inicia o servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server rodando em http://localhost:${PORT}`);
});
