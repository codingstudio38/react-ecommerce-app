
function ProductAddFirst() {

    return (
        <>
            <section className="section-intro pt-3">
                <div className="container">
                    <div className="row gx-3">
                        <main className="col-lg-9">
                            <article className="card-banner p-5 bg-primary" style={{ height: "350px" }}>
                                <div style={{ maxWidth: "500px" }}>
                                    <h2 className="text-white">Great products with <br /> best deals </h2>
                                    <p className="text-white">No matter how far along you are in your sophistication as an amateur astronomer, there is always one.</p>
                                    <a href="#" className="btn btn-warning"> View more </a>
                                </div>
                            </article>
                        </main>
                        <aside className="col-lg-3">
                            <article className="card-banner h-100" style={{ backgroundColor: "var(--bs-warning)" }}>
                                <div className="card-body text-center">
                                    <h5 className="mt-3 text-white">Amazing Gifts</h5>
                                    <p className="text-white">No matter how far along you are in your sophistication</p>
                                    <a href="#" className="btn btn-outline-light"> View more </a>
                                </div>
                            </article>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ProductAddFirst;