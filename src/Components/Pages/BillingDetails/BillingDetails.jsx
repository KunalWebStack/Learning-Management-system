import React, { useEffect } from 'react';
import { BillingApi } from "../../Api";
import { useLocation } from 'react-router-dom';
import {  useSelector } from 'react-redux';

const BillingDetails = () => {
  const location = useLocation();
  const { totalPrice, queryString } = location?.state || { totalPrice: 0, queryString: "" };
  const token = useSelector((state) => state.user.token);
  const affiliateToken = useSelector((state) => state.user.affiliateToken);

  


  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const apiRequestParams = affiliateToken
        ? { totalPrice, queryString, affiliateToken }
        : { totalPrice, queryString };

      const response = await BillingApi(apiRequestParams, token);
      console.log('API response:', response);

        if (isMounted && response && typeof response === 'string' && response.startsWith('http')) {
          window.open(response, '_blank');
        }
      } catch (error) {
        console.error("Error fetching billing details:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [totalPrice, queryString, token,affiliateToken]);

  return (
    <>
      <div>
        <div className="container">
          <div className='msg text-center'> payment processing...</div>
        </div>
      </div>
    </>
  );
};

export default BillingDetails;
