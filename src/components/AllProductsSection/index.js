import {Component} from 'react'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/products'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'Get',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const camelCaseData = data.products.map(product => ({
      title: product.title,
      brand: product.brand,
      id: product.id,
      imageUrl: product.image_url,
      price: product.price,
      rating: product.rating,
    }))
    // console.log(data.products)
    this.setState({productsList: camelCaseData})
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
