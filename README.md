### Hexlet tests and linter status:
[![Actions Status](https://github.com/miley777/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/miley777/frontend-project-11/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/e6cc44dc1fb3603796cb/maintainability)](https://codeclimate.com/github/miley777/frontend-project-11/maintainability)


### Vercel
https://frontend-project-11-tcst.vercel.app/


<img src="/assets/axios.png" width="100" hight="100">
<img src="/assets/i18next.png" width="100" hight="100">
<img src="/assets/js.png" width="100" hight="100">
<img src="/assets/valtio.png" width="100" hight="100">
<img src="/assets/vercel256x256.png" width="100" hight="100">
<img src="/assets/vite.png" width="100" hight="100">
<img src="/assets/yup.png" width="100" hight="100">

## RSS Aggregator

---
---

### App Description

RSS Aggregator —  service for aggregating RSS feeds, which makes it convenient to read from a variety of sources, such as blogs. It allows you to add an unlimited number of RSS feeds, automatically keeps them updated, and adds new entries to a unified feed.


### App capabilities

- Downloading and displaying RSS feed data
- Read posts change their status within the post list
- Ability to add multiple feeds
- The service checks for updates in the feeds and downloads new posts
- Ability to preview posts

---

### Minimum system requirements

- Must have npm and vite installed.
- Node v21.4.0 or higher. The version can be found in terminal: node -v

### Installation

!!! Following commands must be run from the app directory!

1.Clone the project repository: `git clone`.

_________________
_________________

### App Description

RSS Aggregator —  service for aggregating RSS feeds, which makes it convenient to read from a variety of sources, such as blogs. It allows you to add an unlimited number of RSS feeds, automatically keeps them updated, and adds new entries to a unified feed.



### App capabilities

- Downloading and displaying RSS feed data
- Read posts change their status within the post list
- Ability to add multiple feeds
- The service checks for updates in the feeds and downloads new posts
- Ability to preview posts

---

### Minimum system requirements

- Must have npm and vite installed.
- Node v21.4.0 or higher. The version can be found in terminal: node -v

### Installation

!!! Following commands must be run from the app directory!

1.Clone the project repository: `git clone`.

### Usage

!!! Remember! Command to start the service must be used in in terminal. The terminal must be run in app-directiry

To start the service, type the following in the console: `npm start`.

The RSS aggregator application will open in your browser; alternatively, enter the localhost link from the console.

Enter the RSS link for the news you would like to follow into the RSS field and click the "Добавить" button. A "Посты" section will appear below, displaying a list of posts from that link, while a section "Фиды" listing the feeds you have already added will appear to the right. The application's status will be shown below the example link. To the right of each post title, there is a "Просмотр" button; clicking this button—or the title itself—will open a preview window for the post. This preview window contains "Закрыть" and "Читать полностью" buttons. The "Читать полностью" button will take you to the original source page for the post.