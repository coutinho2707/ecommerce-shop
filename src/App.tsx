import { ProdutcListPage } from "./pages/product-list.page"
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProdutcListPage />
    </>
  )
}

export default App
