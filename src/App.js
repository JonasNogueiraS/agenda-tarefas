import ServiceRoutes from "./routes/routes";
import {BrowserRouter} from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
      <ServiceRoutes/>
    </BrowserRouter>
  );
}

export default App;
