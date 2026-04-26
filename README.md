# 📝 Notes.APP

<div align="center">

**Aplicativo de notas profissional com recursos nativos e globalização**

![React Native](https://img.shields.io/badge/React%20Native-0.83.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-55.0.8-000020?style=for-the-badge&logo=expo&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-i18n-26A69A?style=for-the-badge&logo=i18next&logoColor=white)
![Maps](https://img.shields.io/badge/Google%20Maps-API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)

[🎥 Vídeo de Demonstração](https://www.youtube.com/watch?v=OScl7GulPZE) • [📦 Repositório](https://github.com/castropatrick/notes-app) • [📱 Download APK](https://expo.dev/accounts/castroooop/projects/notes-app)

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

O **Notes.APP** é um aplicativo mobile desenvolvido com React Native e Firebase que permite ao usuário criar, visualizar, editar e deletar notas pessoais. Na Fase 2, o app foi evoluído para um produto profissional com suporte a múltiplos idiomas, inteligência de localização, sistema de notificações e distribuição via APK.

---

## 🚀 Funcionalidades

### Fase 1 — Base
- 🔐 Cadastro e login com email e senha (Firebase Auth)
- 🔒 Logout com confirmação
- 📝 Criar, listar, editar e deletar notas (Firestore)
- 👤 Cada usuário vê apenas suas próprias notas
- 🔍 Filtro de notas por título
- ⏳ Indicador de carregamento
- ✅ Confirmação antes de deletar
- ⚠️ Tratamento de erros

### Fase 2 — Recursos Nativos e Globalização

#### 🌐 Internacionalização (i18n)
- Suporte completo a **Português** e **Inglês**
- Nenhuma string fixa no código — todas as traduções estão em arquivos JSON (`i18n/pt.json` e `i18n/en.json`)
- Seletor de idioma na tela de login (botões PT/EN)
- Detecção automática do idioma do dispositivo via `expo-localization`
- Biblioteca utilizada: `react-i18next` + `i18next`

#### 🗺️ Mapas e Geolocalização
- Captura automática de latitude e longitude ao criar uma nota via `expo-location`
- Coordenadas salvas no documento da nota no Firestore
- Visualização do local de criação em tela dedicada com `react-native-maps`
- Marcador (Pin) indicando o local exato onde a nota foi criada
- Ícone 📍 na lista de notas para abrir o mapa
- Exibição das coordenadas GPS na tela de criação

#### 📍 Geocoding (Extra — 0.5 pts)
- Conversão de coordenadas em endereço legível (rua, cidade, estado) via `Location.reverseGeocodeAsync`
- Endereço exibido na tela do mapa e no marcador

#### 🔔 Notificações (Push & Local)
- Integração com `expo-notifications`
- Notificação de **boas-vindas** ao realizar login
- Notificação de **confirmação** ao criar uma nova nota com sucesso
- Solicitação e tratamento de permissão de notificações
- Handler configurado para exibir alertas, tocar som e mostrar banner

#### 📦 Build Android (.apk)
- Arquivo APK gerado via **EAS Build** (`eas build --platform android --profile preview`)
- Arquivo instalável e funcional testado em dispositivo/emulador
- Configuração completa no `eas.json` com perfis development, preview e production

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) — Framework mobile
- [Expo](https://expo.dev/) — Plataforma de desenvolvimento
- [Expo Router](https://expo.github.io/router/) — Navegação baseada em arquivos
- [Firebase Authentication](https://firebase.google.com/products/auth) — Autenticação
- [Cloud Firestore](https://firebase.google.com/products/firestore) — Banco de dados
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) — Persistência local
- [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) — Internacionalização
- [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization/) — Detecção de idioma do dispositivo
- [react-native-maps](https://github.com/react-native-maps/react-native-maps) — Mapas nativos
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) — Geolocalização e geocoding
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) — Notificações push e locais
- [EAS Build](https://docs.expo.dev/build/introduction/) — Geração do APK

---

## ▶️ Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado
- Expo CLI instalado (`npm install -g expo-cli`)
- EAS CLI instalado (`npm install -g eas-cli`)
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

### Gerar APK

```bash
# Login no Expo
npx expo login

# Build do APK
eas build --platform android --profile preview
```

---

## 📁 Estrutura do Projeto

```
notes-app/
├── app/
│   ├── components/
│   │   └── NoteCard.tsx         # Componente de card da nota (com botão de mapa)
│   ├── _layout.tsx              # Layout raiz (I18nextProvider + NotificationHandler)
│   ├── index.tsx                # Tela de Login (com seletor de idioma PT/EN)
│   ├── CadastroScreen.tsx       # Tela de Cadastro
│   ├── HomeScreen.tsx           # Tela principal (lista de notas)
│   ├── NoteFormScreen.tsx       # Tela de criar/editar nota (com captura GPS)
│   └── MapScreen.tsx            # Tela de mapa (com pin e geocoding)
├── i18n/
│   ├── index.ts                 # Configuração do i18next
│   ├── pt.json                  # Traduções em Português
│   └── en.json                  # Traduções em Inglês
├── services/
│   ├── firebaseConfig.tsx       # Configuração do Firebase
│   └── noteService.ts           # CRUD de notas (com lat/long)
├── app.json                     # Configuração do Expo (Google Maps API, notificações)
├── eas.json                     # Configuração do EAS Build
└── README.md
```

---

## 🆕 O que foi implementado na Fase 2

| Funcionalidade | Pontos | Status |
|---|---|---|
| Internacionalização (PT/EN completo) | 2.0 | ✅ |
| Mapas e Geolocalização (GPS + Pin) | 2.5 | ✅ |
| Notificações (boas-vindas + criação) | 2.5 | ✅ |
| Geração do APK (EAS Build) | 2.0 | ✅ |
| Organização e Documentação | 1.0 | ✅ |
| **Extra:** Geocoding (endereço na nota) | +0.5 | ✅ |

---

## 🎥 Vídeo de Demonstração

O vídeo demonstra:
1. Troca de idioma (PT ↔ EN) na tela de login
2. Criação de nota com captura automática de GPS
3. Visualização do Pin no mapa com endereço (geocoding)
4. Notificação de boas-vindas ao logar
5. Notificação de confirmação ao criar nota
6. App instalado e funcionando via APK

> [Assistir vídeo](https://www.youtube.com/watch?v=OScl7GulPZE)

---

<div align="center">

Desenvolvido com 💜 por **Gabriel Rossi, Patrick Quintana e Rodrigo Yamasaki**

**FIAP — 2025**

</div>
