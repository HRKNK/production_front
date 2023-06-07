# Проект: Frontend Production (Новостная лента)

### О проекте:

Представляет собой социальную сеть или ленты новостей. На сайте реализован переход между страницами: main, about, profile и articles.

Защищенные маршруты для авторизованных пользователей.

На странице профиля есть как просмотр, так и редактирование профиля пользователя.

Лента новостей использует динамическую подгрузку (пагинацию), фильтрацию и сохранение пользовательского вида представления/скролла-позиции.

Опциональный выбор дизайна проекта/приложения в настройках профиля.

---

## Использемые технологии

- Применены архитектурные правила Feature Sliced Design - [Документация](https://feature-sliced.design/docs/get-started/tutorial);
- Глобальный стейт-менеджер: Redux Toolkit
- Конфигурация Webpack-a: dev | prod оптимизация, лоадеры, плагины;
- Конфигурация Vite-а: базовая настройка;
- Библиотека переводов I18N, Плюральные формы склонения;
- Работа c AST (TypeScript) через библиотеку ts-morph: Реализация Фича-флага на удаление устаревших блоков кода.
- Тестирование: Cypress, JEST + RTL, Loki;
- Библиотека компонентов Storybook (или витрина компонентов). Аддоны Моков/Тем;
- Форматирование кода/стайлинг Prettier-ом;
- Линтинг ESLINT с использованием кастомных правил проверки: Кольцевых зависимостей, Изоляция компонентов (паблик апи), Архитектурная проверка путей импорта;
- CI pipeline средствами GITHUB Actions или pre-commit хуки Husky;
- Lazy-loading компонентов, библиотек и редьсов
- ... что-то мог забыть)

---

## Начало работы

- `npm install` - Установка зависимостей;

## Запуск

- `npm run start` - Запуск Frontend-а через Webpack dev_server;
- `npm run start:vite` - Запуск Frontend-а через Vite dev_server;
- `npm run start:dev` - Комбинированый запуск Frontend + Backend (Webpack);
- `npm run start:dev:vite` - Комбинированый запуск Frontend + Backend (Vite);
- `npm run server:json` - Запуск сервера (JSON Server);

## Сборка проекта

- `npm run build:prod` - Production сборка (Webpack);
- `npm run build:dev` - Developer сборка (Webpack);

## Линтинг/Форматирование

- `npm run eslint` - Анализ tsx\ts кода по правилам Eslint-а;
- `npm run eslint:fix` - Исправление найденных Eslint-ом ошибок;
- `npm run prettier:fix` - Инструмент форматирования кода. Коррекция Prettier-ом;
- `npm run lint:scss` - Анализ css\scss кода по правилам Stylelint-а;
- `npm run lint:scss:fix` - Исправление найденных Stylelint-ом ошибок;

## Тестирование

- `npm run cypress:open` - Запуск Cypress (E2E) тестирования интерфейса приложения;
- `npm run test:unit` - Запуск JEST (Unit) тестирования компонентов приложения (включает в себя RTL);
- `npm run storybook` - Запуск Storybook библиотеки компонентов приложения;
- `npm run storybook:build` - Сборка Storybook;
- `npm run test:loki` - Запуск LOKI (Скриншотное тестирование);
- `npm run test:loki:ok` - Подтверждение изменений в скриншотном тестировании. LOKI;
- `npm run test:loki:ci` - Запуск LOKI в режиме CI;
- `npm run test:loki:report` - Генерация отчета тестирования LOKI (html report);

## Хелперы

- `npm run generate:slice` - генерация каталога в соответствии архитектурных правил FSD;
- `npm run remove-feature` - Рефакторинг проекта по шаблону Фича-флага (удаление устаревших компонентов/редизайн)
- `postinstall` - автоматическая очистка каталога .cache

---
