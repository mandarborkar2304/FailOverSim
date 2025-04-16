# FailOverSim ⚡

FailOverSim is a browser-based network failure simulation tool that visualizes network topology disruptions and automatic recovery processes in real-time. Built with React, WebSockets, and Tailwind CSS, it allows users to simulate link failures, node outages, and recovery strategies without the need for a backend.

🔗 **Live Demo:** [failoversim.netlify.app](https://failoversim.netlify.app)  
🧩 **Frontend:** React + Tailwind CSS  
📡 **Real-Time Events:** WebSocket-based simulation logic (browser-side)


## 🔍 Purpose

FailOverSim helps developers, students, and network engineers understand **network resilience** and **fault-tolerance mechanisms** through interactive, hands-on simulations — without complex server setups or cloud backends.


## 🔧 Features

- 🗺️ **Network Topology Visualization**  
  Interactive node-link maps that visually represent the network structure.

- 💥 **Failure Simulation**  
  Trigger node and link failures to observe the impact on the network in real time.

- 🛠️ **Auto Recovery Mechanisms**  
  Simulates self-healing network behavior and route recalculations with visual feedback.

- 📡 **Real-Time WebSocket Simulation**  
  WebSocket-like behavior powered by browser logic for seamless updates without backend dependency.

- 🖥️ **Modern UI Inspired by n8n**  
  Responsive and intuitive UI styled with Tailwind CSS, offering drag-and-drop potential for future extensibility.


## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

git clone https://github.com/your-username/failoversim.git
cd failoversim
npm install
npm run dev

## 🚀 Deployment

FailOverSim is deployed using **Netlify**.

To deploy your own version:

1. Push your forked repo to GitHub.
2. Connect your repo to Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`


## 📁 Project Structure
```
failoversim/
│
├── public/                # Static files
├── src/
│   ├── components/        # Network nodes, links, simulation UI
│   ├── hooks/             # Real-time simulation logic
│   ├── pages/             # Main dashboard
│   └── App.jsx            # Root component
├── tailwind.config.js
├── package.json
└── README.md
```

## 🧠 Use Cases

- Training and workshops on fault-tolerant networking.
- Demonstrations for classroom education or product showcases.
- Lightweight simulation environments for testing routing logic.


## 📌 Tech Stack

- **React** – UI rendering and state management
- **Tailwind CSS** – Responsive design with minimal effort
- **Simulated WebSockets** – Browser-side real-time interactions
- **Chart.js & D3 (optional)** – Visual feedback and graph animations


## 📬 Contact

Created by [Your Name](https://your-portfolio.com)  
Email: your.email@example.com  
LinkedIn: [linkedin.com/in/yourname](https://linkedin.com/in/yourname)


## 📃 License

MIT License – feel free to modify, fork, and enhance.


> ⚠️ Note: FailOverSim runs entirely in the browser and does **not** include server-side failover emulation. A backend implementation (Python/Flask or FastAPI) could be added later for more realistic simulations.

Let me know if you want to add contribution guidelines, API mock integration, or a roadmap for future features!
