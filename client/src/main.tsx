import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set the document title
document.title = "Flaze - Premium Heated Lunch Boxes";

// Add meta description for SEO
const metaDesc = document.createElement('meta');
metaDesc.name = 'description';
metaDesc.content = 'Discover our premium heated lunch boxes designed for busy professionals, students, and anyone on the go. Enjoy hot meals anywhere with Flaze.';
document.head.appendChild(metaDesc);

// Add Open Graph tags for social sharing
const ogTitle = document.createElement('meta');
ogTitle.property = 'og:title';
ogTitle.content = 'Flaze - Premium Heated Lunch Boxes';
document.head.appendChild(ogTitle);

const ogDesc = document.createElement('meta');
ogDesc.property = 'og:description';
ogDesc.content = 'Premium heated lunch boxes designed for busy professionals, students, and anyone on the go. Enjoy a hot meal anywhere, anytime.';
document.head.appendChild(ogDesc);

const ogType = document.createElement('meta');
ogType.property = 'og:type';
ogType.content = 'website';
document.head.appendChild(ogType);

createRoot(document.getElementById("root")!).render(<App />);
