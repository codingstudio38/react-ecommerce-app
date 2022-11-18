import TopHeader from './TopHeaderComponents/TopHeader';
import Producticons from './ProductComponents/Producticons';
import NewProductList from './ProductComponents/NewProductList';
import RecommendedProductList from './ProductComponents/RecommendedProductList';
import ProductAddFirst from './ProductOfferComponents/ProductAddFirst';
import ProductAddSecond from './ProductOfferComponents/ProductAddSecond';
import Subscribe from './Others/Subscribe';
import SocialMedia from './Others/SocialMedia';
import Footer from './Footer/Footer';
import React, { useEffect } from 'react';

function Home() {
    useEffect(() => {
        document.title = "Home Page";
    }, [])
    return (
        <div>
 

            <TopHeader />
            <ProductAddFirst />
            <Producticons />
            <NewProductList />
            <ProductAddSecond />
            <RecommendedProductList />
            <section className="padding-y-sm bg-gray-light">
                <div className="container">
                    <div className="row gy-3 align-items-center">
                        <div className="col-md-4">
                            <Subscribe />
                        </div>
                        <div className="col-md-8">
                            <SocialMedia />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />



        </div>
    )
}
export default Home;