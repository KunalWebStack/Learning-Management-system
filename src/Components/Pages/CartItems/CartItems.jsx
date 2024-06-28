import React, { useState } from 'react';
import "./CartItems.scss";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart ,clearCart } from "../../../store/userSlice"
import { useNavigate } from 'react-router-dom';
import SpinerLogo from '../../CommonComponents/SpinerLogo';
import { toast } from 'react-toastify';
import { getReffrelCodeApi } from "../../Api";
import { Link } from 'react-router-dom';

const CartItems = () => {
  const [referralCode, setReferralCode] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState(null);
  const [isCodeApplied, setIsCodeApplied] = useState(false);
  // console.log(referralCode,">>>>>>>>>>>>>>>");
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const products = useSelector(state => state.user.cart);
  // console.log(products,">>>products<<<<<<<<<<");

  
  const productIds = products.map(product => product._id);
  const url = productIds.map((productId) => `course=${productId}`);
  const queryString = url.join('&');
  

  const total = products
  ? products.reduce((totalPrice, product) => {
      return totalPrice + (product.price * (product.quantity || 1));
    }, 0)
  : 0;
  
  const handleRemove = (productId) => {
    if (token) {
      dispatch(removeFromCart(productId));
    } else {
      toast.error("You have to Login first", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored"
      })
    }
  }
  

  const handleCheckout = () => {
    let checkoutTotal = isCodeApplied ? discountedTotal : total;

    if (token) {
      navigate("/billing_details", { state: { totalPrice: checkoutTotal, queryString: queryString } });
      dispatch(clearCart());
    } else {
      toast.error("You have to Login first", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored"
      })
    }
  }

  const handleReferralCodeCheck = async () => {
    try {
      const res = await getReffrelCodeApi(token, { code: referralCode })
   console.log(res,">>>>>>>>>>>>>");
      if (res.status === true) {
        const newDiscountedTotal = total - (total * 0.1);
        setDiscountedTotal(newDiscountedTotal);
        setIsCodeApplied(true);
        toast.success(`Referral code applied successfully! You got a 10% discount. New total: ₹${discountedTotal.toFixed(2)}`, {
          position: "top-center",
          autoClose: 2000, 
          theme: "colored"
        });
      }else if(res.response.data.message === "You Can Not Use Your Own Refferal Code" && res.response.data.status=== false){
        setIsCodeApplied(false);
        toast.error(res.response.data.message, {
          position: "top-center",
          autoClose: 2000,
          theme: "colored"
        });
      }else if(referralCode === ""){
        setIsCodeApplied(false);
        toast.error(" You have to enter the code first", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored"
        })
      }else {
        setIsCodeApplied(false);
        toast.error("Invalid referral code", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored"
        });
      }
    } catch (error) {
      console.error('Error checking referral code:', error);
    }
  }

  if (!products) {
    return (
      <SpinerLogo />
    )
  }

  return (
    <>
      <div className='cart_details'>
        <div className='container'>
          <div className='cart_wrapper_outer'>
            <div className='cart_wrapper'>
              {products.map((product) => (
                <div className='cartCard' key={product._id}>
                  <div className='cart_card_image'>
                    <img src={product.imageUrl} alt="" 
                     onError={(e) => {
                      e.target.src =
                        'https://img.freepik.com/premium-vector/online-training-courses-landing-page-design-concept_254538-184.jpg';
                    }}
                    /></div>
                  <h5>{product.title}</h5>
                  <h6> Price:{'\u20B9'}{product.price}</h6>
                  <button className='btn_remove' onClick={() => handleRemove(product.id)}>Remove</button>
                </div>
              ))}
               {total ?
              <div className='checkout_main'>

                {!isCodeApplied && (
                  <div className='no_of_cources'>
                    <h3>Referral Discount</h3>
                    <p>Enter Your Referral code if you have one</p>
                    <input placeholder='Enter Your Code Here' type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
                    <button onClick={handleReferralCodeCheck} className='btn_CheckReferralCode'>Apply Code</button>
                  </div>
                )}

                {isCodeApplied && (
                  <div className='no_of_cources'>
                    <h3>Referral Discount</h3>
                    <h4>Coupon code  applied successfully! </h4>
                  </div>
                )}
                    
                <div className='checkout_div'>
                  {products.length >= 1 && (
                    <div>
                      {isCodeApplied ? (
                        <>
                          <div>
                            <div className='total_ammount'>
                              <p>Previous price </p>
                              <h5 className="original-total">{'\u20B9'}{total.toFixed(2)}</h5>
                            </div>

                            <div className='total_ammount'>
                              <p>Discounted price </p>
                              <h5>{'\u20B9'}{discountedTotal.toFixed(2)}</h5>
                            </div>
                            <p className='msg'>Congrulations you get 10% off!!!</p>
                            <div className='total_price'>
                              <p> Total </p>
                              <h5>{'\u20B9'}{discountedTotal.toFixed(2)}</h5>
                            </div>

                          </div>
                        </>
                      ) : (
                        <div >
                          <div className='total_ammount'>
                            <p>Subtotal</p>
                            <h5> {'\u20B9'}{total.toFixed(2)}</h5>
                          </div>
                          <div className='total_price'>
                            <p>Total</p>
                            <h5> {'\u20B9'}{total.toFixed(2)}</h5>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {products.length > 0 && (
                    <div className='checkout_btn'>
                      <button className='btn btn_Continue' onClick={() => navigate("/courses")}>Continue shopping</button>
                      <button onClick={handleCheckout} className=' btn_Checkout'>Checkout</button>
                    </div>
                  )}
                </div>
              </div>
                :<div className='empty-cart-message'>
                <p className='msg text-center'>Your Cart is empty at the moment...</p>
                <Link to="/courses" className='sub-msg text-center'>Discover our amazing courses and enrich your learning journey!</Link>
              </div>
                }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CartItems;
