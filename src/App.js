import { QueryClientProvider, QueryClient } from "react-query";
import Routing from "./routes";
import { ConfigProvider } from "antd";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#313848",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Routing />
        </QueryClientProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
