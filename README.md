# 📝 Notes.APP

<div align="center">

**Aplicativo de notas com autenticação Firebase**

![React Native](https://img.shields.io/badge/React%20Native-0.83.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-55.0.8-000020?style=for-the-badge&logo=expo&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

[🎥 Vídeo de Demonstração](#) • [📦 Repositório](https://github.com/castropatrick/notes-app)

</div>

---

## 👥 Integrantes

| Nome | RM |
|------|-----|
| Gabriel Oliveira Rossi | RM560967 |
| Patrick Castro Quintana | RM559271 |
| Rodrigo Naoki Yamasaki | RM560759 |

**Professor:** Fernando Pinéo de Abreu
**Disciplina:** Mobile App Development
**Instituição:** FIAP

---

## 📋 Descrição do Projeto

O **Notes.APP** é um aplicativo mobile desenvolvido com React Native e Firebase que permite ao usuário criar, visualizar, editar e deletar notas pessoais. Cada usuário possui suas próprias notas, acessíveis apenas após autenticação.

---

## 🚀 Funcionalidades

- 🔐 Cadastro e login com email e senha
- 🔒 Logout com confirmação
- 📝 Criar, listar, editar e deletar notas
- 👤 Cada usuário vê apenas suas próprias notas
- 🔍 Filtro de notas por título
- ⏳ Indicador de carregamento
- ✅ Confirmação antes de deletar
- ⚠️ Tratamento de erros

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://expo.github.io/router/)
- [Firebase Authentication](https://firebase.google.com/products/auth)
- [Cloud Firestore](https://firebase.google.com/products/firestore)
- [TypeScript](https://www.typescriptlang.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

---

## ▶️ Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- Expo CLI instalado (`npm install -g expo-cli`)
- Android Studio ou Expo Go no celular

### Instalação
```bash
# Clone o repositório
git clone https://github.com/castropatrick/notes-app.git

# Entre na pasta
cd notes-app

# Instale as dependências
npm install --legacy-peer-deps

# Inicie o projeto
npx expo start
```

### Executar no Android
```bash
npx expo start --android
```

---

## 📁 Estrutura do Projeto
```
notes-app/
├── app/
│   ├── components/
│   │   └── NoteCard.tsx
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── CadastroScreen.tsx
│   ├── HomeScreen.tsx
│   └── NoteFormScreen.tsx
├── services/
│   ├── firebaseConfig.tsx
│   └── noteService.ts
└── README.md
```

---

## 🎥 Vídeo de Demonstração

> Em breve

---

<div align="center">

Desenvolvido com 💜 por **Gabriel Rossi, Patrick Quintana e Rodrigo Yamasaki**

**FIAP — 2025**

</div>
