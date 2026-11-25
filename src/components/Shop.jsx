import { useState, useEffect } from 'react';

import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import { Alert } from './Alert';
import { Preloader } from './Preloader';
import { getMainProducts, getProductId} from '../util/api';
import { useCartStore } from "../util/store";

function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');

  const getTotalQuantity = useCartStore((state) => state.getTotalQuantity);
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };

  useEffect(function getGoods() {
    getMainProducts()
      .then((res) => {
        if (res.data._embedded.product) {
          const updatedProducts = res.data._embedded.product.map(product => {
            const id = getProductId(product._links);
            return { ...product, id: id };
          });
          setGoods(updatedProducts);
          setLoading(false);
        }
        setLoading(false);
      });
  }, []);

  const closeAlert = () => {
    setAlertName('');
  };

  return (
    <main className="container content">
      <Cart quantity={getTotalQuantity()} handleBasketShow={handleBasketShow} />
      {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToCart} />}
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
    </main>
  );
}

export { Shop };