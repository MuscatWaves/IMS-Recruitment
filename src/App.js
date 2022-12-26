import { QueryClientProvider, QueryClient } from "react-query";
import Routing from "./routes";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routing />
      </QueryClientProvider>
    </div>
  );
}

export default App;
