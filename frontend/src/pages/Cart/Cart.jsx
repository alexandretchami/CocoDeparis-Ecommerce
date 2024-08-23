import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems,product_list,removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Articles</p>
          <p>Titre</p>
          <p>Prix</p>
          <p>Quantité</p>
          <p>Total</p>
          <p>Retirer</p>
        </div>
        <br />
        <hr />
        {product_list.map((item, index) =>{
          if(cartItems[item._id]>0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price} €</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price*cartItems[item._id]} €</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Totaux du panier</h2>
          <div>
            <div className="cart-total-details">
                <p>Total articles</p>
                <p>{getTotalCartAmount()} €</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <p>Frais de livraison</p>
                <p>{getTotalCartAmount()===0?0:2} €</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <p>Total</p>
                <p>{getTotalCartAmount()===0?0:getTotalCartAmount()+2} €</p>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PASSER À LA CAISSE</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Si vous avez un code promo, saisissez-le ici</p>
            <div className="cart-promocode-input">
              <input type="text"  placeholder='code promo'/>
              <button>Soumettre</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart