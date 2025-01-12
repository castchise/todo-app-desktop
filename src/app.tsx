import { getTodoList } from "@/lib/utils";
import { GlobalContextProvider } from "@/contexts";
import RootLayout from "@/components/RootLayout";

export default function App() {
  const todoList = getTodoList();

  return (
    <GlobalContextProvider value={{ todoList }}>
      <RootLayout />
    </GlobalContextProvider>
  );
}
