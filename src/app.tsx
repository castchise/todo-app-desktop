import { getIsDarkmode, getTodoList } from "@/lib/utils";
import { GlobalContextProvider } from "@/contexts";
import RootLayout from "@/components/RootLayout";

export default function App() {
  const todoList = getTodoList();
  const darkmode = getIsDarkmode();

  return (
    <GlobalContextProvider value={{ todoList, darkmode }}>
      <RootLayout />
    </GlobalContextProvider>
  );
}
