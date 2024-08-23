import { useContext } from 'react'
import './ProductDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import ProductItem from '../ProductItem/ProductItem'


const ProductDisplay = ({category}) => {

    const { product_list } = useContext(StoreContext)

  return (
    <div className='product-display' id='product-display'>
        <h2>Nos meilleurs produits</h2>
        <div className="product-display-list">
          {product_list.map((item,index)=>{
            if(category==='All' || item.category===category)  // show only products in the selected category or all products if no category is selected
              return <ProductItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          })}
        </div>
    </div>
  )
}

export default ProductDisplay