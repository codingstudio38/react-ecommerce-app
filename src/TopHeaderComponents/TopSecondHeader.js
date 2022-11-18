import { MAIN_LOGO, BASE_URL } from './TopbrandLogo';
import Topsingin from './Topsingin';
import Topsearch from './Topsearch';

function TopSecondHeader() {

    return (
        <>

            <section className="header-main">
                <div className="container">
                    <div className="row gy-3 align-items-center">
                        <div className="col-lg-2 col-sm-4 col-4">
                            <a href={BASE_URL} className="navbar-brand">
                                <img className="logo" height="40" src={MAIN_LOGO} />
                            </a>
                        </div>
                        <Topsingin />
                        <div className="col-lg-5 col-md-12 col-12">
                            <Topsearch />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TopSecondHeader;