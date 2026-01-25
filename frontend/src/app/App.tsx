import AuthTabsCard from "@/pages/AuthTabsCard";
import { ContextProvider } from "@/state-management/context.provider";

function App() {
  return (
    <div className="max-h-fit flex flex-1 items-center justify-center bg-background">
      <ContextProvider>
        <AuthTabsCard />
      </ContextProvider>
    </div>
  );
}

export default App;
