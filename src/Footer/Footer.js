
import { MAIN_LOGO, BASE_URL } from '../TopHeaderComponents/TopbrandLogo';
function Footer() {

    return (
        <>
            <footer className="section-footer bg-white border-top">
                <div className="container">
                    <section className="footer-main padding-y">
                        <div className="row">
                            <aside className="col-12 col-sm-12 col-lg-4">
                                <article className="me-lg-4">
                                    <img src={MAIN_LOGO} className="logo-footer" />
                                    <p className="mt-3"> © 2018- 2021 Templatemount.All rights reserved. </p>
                                </article>
                            </aside>
                            <aside className="col-6 col-sm-4 col-lg-2">
                                <h6 className="titl">Store</h6>
                                <ul className="list-menu mb-3">
                                    <li> <a href="#">About us</a></li>
                                    <li> <a href="#">Find store</a></li>
                                    <li> <a href="#">Categories</a></li>
                                    <li> <a href="#">Blogs</a></li>
                                </ul>
                            </aside>
                            <aside className="col-6 col-sm-4 col-lg-2">
                                <h6 className="title">Information</h6>
                                <ul className="list-menu mb-3">
                                    <li> <a href="#">Help center</a></li>
                                    <li> <a href="#">Money refund</a></li>
                                    <li> <a href="#">Shipping info</a></li>
                                    <li> <a href="#">Refunds</a></li>
                                </ul>
                            </aside>
                            <aside className="col-6 col-sm-4  col-lg-2">
                                <h6 className="title">Support</h6>
                                <ul className="list-menu mb-3">
                                    <li> <a href="#"> Help center </a></li>
                                    <li> <a href="#"> Documents </a></li>
                                    <li> <a href="#"> Account restore </a></li>
                                    <li> <a href="#"> My Orders </a></li>
                                </ul>
                            </aside>
                            <aside className="col-6 col-sm-4 col-lg-2">
                                <h6 className="title">Our apps</h6>
                                <a href="#" className="mb-2 d-inline-block"> <img src="images/misc/btn-appstore.png" height="38" /></a>
                                <a href="#" className="mb-2 d-inline-block"> <img src="images/misc/btn-market.png" height="38" /></a>
                            </aside>
                        </div>
                    </section>

                    <section className="footer-bottom d-flex justify-content-lg-between border-top">
                        <div>
                            <i className="fab fa-lg fa-cc-visa"></i>
                            <i className="fab fa-lg fa-cc-amex"></i>
                            <i className="fab fa-lg fa-cc-mastercard"></i>
                            <i className="fab fa-lg fa-cc-paypal"></i>
                        </div>
                        <nav className="dropup">
                            <button className="dropdown-toggle btn d-flex align-items-center py-0" type="button" data-bs-toggle="dropdown">
                                <img src="images/flags/flag-usa.png" className="me-2" height="20" />
                                <span>English</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="#">Russian</a></li>
                                <li><a className="dropdown-item" href="#">Arabic</a></li>
                                <li><a className="dropdown-item" href="#">Spanish</a></li>
                            </ul>
                        </nav>

                    </section>
                </div>
            </footer>
        </>
    )
}
export default Footer;