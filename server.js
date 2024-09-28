const http = require('http');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const hostname = 'localhost';
const port = 8080;

// Інтерфейс для введення прізвища та імені через консоль
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Запитуємо ім'я та прізвище користувача
rl.question("Введіть ваше прізвище: ", (surname) => {
  rl.question("Введіть ваше ім'я: ", (name) => {
    
    // Створюємо сервер
    const server = http.createServer((req, res) => {
      // Вказуємо шлях до HTML файлу
      const filePath = path.join(__dirname, 'index.html');

      // Читаємо HTML файл
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Помилка на сервері');
        } else {
          // Отримуємо поточний час запиту
          const currentDateTime = new Date().toLocaleString();

          // Замінимо спеціальні маркери на ім'я, прізвище та час запиту
          let modifiedData = data
            .replace('{{surname}}', surname)
            .replace('{{name}}', name)
            .replace('{{time}}', currentDateTime);

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(modifiedData);
        }
      });
    });

    // Запускаємо сервер і виводимо повідомлення в консоль
    server.listen(port, hostname, () => {
      console.log(`Сервер запущено на http://${hostname}:${port}/`);
    });

  });
});
