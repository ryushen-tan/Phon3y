# Phon3y

![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white) ![License](https://img.shields.io/badge/license-MIT-green)

## 📝 Description

Phon3y is a web application built with React and TypeScript. This project leverages the power of modern web technologies to deliver a user-friendly and efficient experience. While the specific functionality isn't detailed, the use of React ensures a dynamic and responsive interface, and TypeScript provides enhanced code maintainability and scalability. Stay tuned for more details on the specific features and use cases of Phon3y!

## ✨ Features

- 🕸️ Web
- ML backend


## 🛠️ Tech Stack

- ⚛️ React
- 📜 TypeScript
- 🐍 Python


## 📦 Key Dependencies

```
@ffmpeg/core: ^0.12.10
@ffmpeg/ffmpeg: ^0.12.15
@react-oauth/google: ^0.12.1
@reduxjs/toolkit: ^2.5.1
@splinetool/react-spline: ^4.0.0
@supabase/supabase-js: ^2.49.4
@tailwindcss/vite: ^4.0.6
@tanstack/react-query: ^5.74.4
@tanstack/react-query-devtools: ^5.74.4
framer-motion: ^12.4.7
jwt-decode: ^4.0.0
react: ^19.0.0
react-audio-voice-recorder: ^2.2.0
react-dom: ^19.0.0
react-redux: ^9.2.0
```

## 🚀 Run Commands

- **dev**: `npm run dev`
- **build**: `npm run build`
- **lint**: `npm run lint`
- **preview**: `npm run preview`
- **Run**: `go run .`
- **Build**: `go build`


## 📁 Project Structure

```
.
├── LICENSE
├── be
│   ├── go-backend
│   │   ├── go.mod
│   │   ├── go.sum
│   │   └── main.go
│   ├── nn
│   │   ├── data
│   │   │   └── sample
│   │   │       ├── LDC93S1.phn
│   │   │       ├── LDC93S1.txt
│   │   │       ├── LDC93S1.wav
│   │   │       └── LDC93S1.wrd
│   │   ├── data.py
│   │   ├── main.ipynb
│   │   ├── model
│   │   │   └── model.bin
│   │   ├── requirements.txt
│   │   ├── rnd.md
│   │   └── utils.py
│   ├── requirements.txt
│   └── server
│       ├── api.py
│       ├── requirements.txt
│       ├── services
│       │   ├── mouth_service.py
│       │   └── transcription_service.py
│       └── utils
│           └── ngrok.py
├── fe
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── public
│   │   ├── background.png
│   │   ├── demo.png
│   │   ├── edit.svg
│   │   ├── logo 1.svg
│   │   ├── logo.png
│   │   ├── mockup.png
│   │   ├── overlay.png
│   │   └── phoneyText.png
│   ├── src
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── Camera
│   │   │   │   ├── Camera.tsx
│   │   │   │   ├── Camera_New.tsx
│   │   │   │   └── hooks.ts
│   │   │   ├── Dashboard
│   │   │   │   └── DashboardRow.tsx
│   │   │   ├── DescriptionBox
│   │   │   │   └── DescriptionBox.tsx
│   │   │   ├── Footer
│   │   │   │   └── Footer.tsx
│   │   │   ├── Gallery
│   │   │   │   ├── GalleryCard.tsx
│   │   │   │   └── types.ts
│   │   │   ├── GoogleAuth
│   │   │   │   └── GoogleAuth.tsx
│   │   │   ├── Navbar
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── NavbarHooks.tsx
│   │   │   ├── Save
│   │   │   │   ├── SavePopup.tsx
│   │   │   │   └── types.ts
│   │   │   ├── Text
│   │   │   │   ├── ShinyText.css
│   │   │   │   └── ShinyText.tsx
│   │   │   └── Transcribe
│   │   │       ├── Recorder.tsx
│   │   │       ├── Transcribe.tsx
│   │   │       ├── hooks.ts
│   │   │       └── types.ts
│   │   ├── fonts
│   │   │   └── Harabara.ttf
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── LandingPage.tsx
│   │   │   ├── LandingPageHooks.tsx
│   │   │   ├── LogInHooks.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignUpHooks.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   └── TranscribePage.tsx
│   │   ├── services
│   │   │   ├── account-services.ts
│   │   │   └── base-fetch.ts
│   │   ├── store
│   │   │   ├── AuthStore.ts
│   │   │   ├── recorderSlice.ts
│   │   │   └── store.ts
│   │   └── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── test_mouth_service.py
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/ryushen-tan/Phon3y.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

## 📜 License

This project is licensed under the MIT License.

---
