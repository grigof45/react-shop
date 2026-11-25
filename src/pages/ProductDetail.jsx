import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductItem from '../components/ProductItem';
import { Cart } from '../components/Cart';
import { BasketList } from '../components/BasketList';
import { Alert } from '../components/Alert';
import { Preloader } from '../components/Preloader';
import { getProduct } from '../util/api';
import { useCartStore } from "../util/store";


function ProductDetailPage() {
  
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);  
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');

  const params = useParams();
  const { id } = params;
  
  const getTotalQuantity = useCartStore((state) => state.getTotalQuantity);
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  
  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };

  const closeAlert = () => {
    setAlertName('');
  };

  useEffect(function getGoods() {
    getProduct(id)
      .then((res) => {
        if (res.data.productName) {
          res.data.id = id;
          setProduct(res.data);
        }
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Cart quantity={getTotalQuantity()} handleBasketShow={handleBasketShow} />
      {loading ? <Preloader /> : <ProductItem key={product.id} {...product} addToBasket={addToCart} />}
      {isBasketShow && (
        <BasketList
          order={cart}
          handleBasketShow={handleBasketShow}
          removeFromBasket={removeItem}
          incQuantity={incrementQuantity}
          decQuantity={decrementQuantity}
        />
      )}
      {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </>
  );
}

export default ProductDetailPage;