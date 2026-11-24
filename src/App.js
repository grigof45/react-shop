import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Shop } from './components/Shop';
import { Footer } from './components/Footer';
import WelcomePage from './pages/Welcome';
import ProductLayout from './pages/ProductLayout';
import ProductDetailPage from './pages/ProductDetail';

function App() {
  return (
    <>
      <Header />
          <BrowserRouter>      
        <Routes>
          <Route path="/Welcome" element={<WelcomePage />} />
          <Route path="/" element={<Shop />} />
          <Route path="/product" element={<ProductLayout />}>
            <Route index element={<Shop />} />
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>
        </Routes>      
    </BrowserRouter>      
      <Footer />
    </>
  );
}

export default App;
