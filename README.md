<p align="center">
  <a href="" rel="noopener">
 <img width=100px height=100px src="https://fingo.africa/images/logo-p-500.png" alt="Project logo"></a>
</p>

<h3 align="center">social-media-fingoafrica</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/collins-kariuki/social-app-fingoAfrica/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> <br>
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

A mini social media api that can register users login and return details of the logged in user.

To be added
Friend requests

## 🏁 Getting Started <a name = "getting_started"></a>

Clone the repo
On the root folder run:

```
npm install
```

then

```
npm start
```

for development purposes run:

```
npm run dev
```

### Prerequisites

Install

```
Node
Postgres database
```

## 🎈 Usage <a name="usage"></a>

<b>i)</b> `/signup` <b>POST</b> takes in <li>fullName</li> <li>email(unique)</li> <li>password</li>
<b>ii)</b> `/login` <b>POST</b> takes in <li>email</li> <li>password</li> returns jwt token (x-access-token) as a header.

<b>iii)</b> `/getuser`<b>GET</b> returns the fullName, email and creation date of the current. lgged in user

## ⛏️ Built Using <a name = "built_using"></a>

- [Postgres](https://www.postgresql.org/) - Relational Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
-

## ✍️ Authors <a name = "authors"></a>

- [@collins-kariuki](https://github.com/collins-kariuki)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- [FingoAfrica](https://fingo.africa/) -Youth Focused Banking.
