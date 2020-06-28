import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Typography from '@material-ui/core/Typography'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = { numInCart: 0 }
  }

  render() {
    return (
      <React.Fragment>
        <Typography style={{ marginTop: '-8px' }} className={this.props.classes.cartText}>
          {this.props.numInCart}
        </Typography>
        <ShoppingCartIcon className={this.props.classes.cart} />
      </React.Fragment>
    )
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
  numInCart: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
  const { numInCart } = state.cart
  return { numInCart: numInCart }
}

export default connect(mapStateToProps)(Cart)
