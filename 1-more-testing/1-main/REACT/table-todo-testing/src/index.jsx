// import { ColorModeScript } from "@chakra-ui/react";

import ReactDOM from "react-dom/client";
import App from "./App";

import './dist/output.css';



const root = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
    <App />
);


