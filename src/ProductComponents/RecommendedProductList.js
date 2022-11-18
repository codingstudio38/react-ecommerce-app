function RecommendedProductList() {

    return (
        <>
            <section className="padding-y">
                <div className="container">

                    <header className="section-heading">
                        <h3 className="section-title" style={{ textAlign: "left" }}>Recommended</h3>
                    </header>

                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <figure className="card-product-grid">
                                <a href="#" className="img-wrap rounded bg-gray-light">
                                    <img height="250" className="mix-blend-multiply" src="images/items/9.jpg" />
                                </a>
                                <figcaption className="pt-2">
                                    <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                    <strong className="price">$17.00</strong>
                                    <a href="#" className="title text-truncate">Blue jeans shorts for men</a>
                                    <small className="text-muted">Sizes: S, M, XL</small>
                                </figcaption>
                            </figure>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <figure className="card-product-grid">
                                <a href="#" className="img-wrap rounded bg-gray-light">
                                    <img height="250" className="mix-blend-multiply" src="images/items/10.jpg" />
                                </a>
                                <figcaption className="pt-2">
                                    <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                    <strong className="price">$9.50</strong>
                                    <a href="#" className="title text-truncate">Slim fit T-shirt for men</a>
                                    <small className="text-muted">Sizes: S, M, XL</small>
                                </figcaption>
                            </figure>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <figure className="card-product-grid">
                                <a href="#" className="img-wrap rounded bg-gray-light">
                                    <img height="250" className="mix-blend-multiply" src="images/items/11.jpg" />
                                </a>
                                <figcaption className="pt-2">
                                    <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                    <strong className="price">$29.95</strong>
                                    <a href="#" className="title text-truncate">Modern product name here</a>
                                    <small className="text-muted">Sizes: S, M, XL</small>
                                </figcaption>
                            </figure>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <figure className="card-product-grid">
                                <a href="#" className="img-wrap rounded bg-gray-light">
                                    <img height="250" className="mix-blend-multiply" src="images/items/12.jpg" />
                                </a>
                                <figcaption className="pt-2">
                                    <a href="#" className="float-end btn btn-light btn-icon"> <i className="fa fa-heart"></i> </a>
                                    <strong className="price">$29.95</strong>
                                    <a href="#" className="title text-truncate">Modern product name here</a>
                                    <small className="text-muted">Sizes: S, M, XL</small>
                                </figcaption>
                            </figure>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
export default RecommendedProductList;