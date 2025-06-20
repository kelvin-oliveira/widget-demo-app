# Widget Demo App

A playground for designing and customizing the [`@k12kelvin/chat-widget`](https://github.com/kelvin-oliveira/chat-widget) with real-time preview.

**Live app:** [https://widget-demo-app.vercel.app/](https://widget-demo-app.vercel.app/)

## Features

- Interactive playground to customize the chat widget's appearance and behavior.
- Real-time preview of your widget configuration.
- Easily copy React or HTML integration code for your customized widget.
- Supports theme presets, branding, widget position, status, suggested questions, and more.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or use npm/yarn)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kelvin-oliveira/widget-demo-app.git
   cd widget-demo-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root of the project.
   - Add your OpenAI API key:
     ```env
     OPENAI_API_KEY=your-openai-api-key-here
     ```

### Running Locally

Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

- Visit the live app or run locally.
- Use the playground UI to customize your chat widget.
- Copy the generated code (React or HTML) to integrate the widget into your own project.

## Technologies Used

- Next.js
- React 19
- Tailwind CSS
- Zustand (state management)
- Radix UI
- [`@k12kelvin/chat-widget`](https://github.com/kelvin-oliveira/chat-widget) 