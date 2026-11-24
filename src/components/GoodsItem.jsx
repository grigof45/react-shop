import { Link } from 'react-router-dom';
import { getProductId } from '../util/api';

function GoodsItem(props) {
  const { id, productName, description, price, image, addToBasket = Function.prototype } = props;
  
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={productName} />
      </div>
      <div className="card-content">
        <span className="card-title"><Link  to={`/product/${id}`}>{productName}</Link></span>
        <p>{description}</p>
      </div>
      <div className="card-action">
        <button
          className="btn blue accent-4"
          onClick={() =>
            addToBasket({
              id,
              productName,
              price,
            })
          }
        >
          Купить
        </button>
        <span className="right" style={{ fontSize: '1.5rem' }}>
          {price} ₽
        </span>
      </div>
    </div>
  );
}

export { GoodsItem };
