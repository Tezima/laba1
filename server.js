const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 8080;

// Створюємо сервер
const server = http.createServer((req, res) => {
  // Вказуємо шлях до HTML файлу
  const filePath = path.join(__dirname, 'index.html');

  // Читаємо HTML файл
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Помилка на сервері');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

// Запускаємо сервер і виводимо повідомлення в консоль
server.listen(port, hostname, () => {
  console.log(`Сервер запущено на http://${hostname}:${port}/`);
  console.log("Сервер запущений");
});
