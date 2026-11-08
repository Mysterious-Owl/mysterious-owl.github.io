// Firebase Analytics (page views). Skipped on local dev so testing doesn't pollute stats.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// Firebase web config is public by design; access is controlled via API key
// referrer restrictions (Google Cloud Console) and Firebase security rules.
const firebaseConfig = {
  apiKey: "AIzaSyByVxzVRg9wpudFBN6x0v32yb4zyS1q_vI",
  authDomain: "tanishq-gupta.firebaseapp.com",
  databaseURL: "https://tanishq-gupta-default-rtdb.firebaseio.com",
  projectId: "tanishq-gupta",
  storageBucket: "tanishq-gupta.firebasestorage.app",
  messagingSenderId: "74052943105",
  appId: "1:74052943105:web:b0fc533757c7bfc7936f00",
  measurementId: "G-MTQTJ65CBT"
};

const isLocal = ["localhost", "127.0.0.1", ""].includes(location.hostname);

if (!isLocal) {
  getAnalytics(initializeApp(firebaseConfig));
}
