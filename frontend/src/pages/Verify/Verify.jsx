import React, { useEffect } from 'react'
import './Verify.css'
import {  useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        if (!url) {
            console.error('API URL is not defined');
            navigate('/');
            return;
        }

        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
               window.location.href = "https://fooddelivery-frontend-git-main-sauravls-projects.vercel.app/myorders";
                // navigate('/myorders');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            navigate('/');
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [url, success, orderId]); // Ensure correct dependencies


  return (
    <div className='verify'>
        <div className='spinner'></div>
    </div>
  )
}

export default Verify
