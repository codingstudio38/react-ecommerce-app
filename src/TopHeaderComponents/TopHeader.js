import TopSecondHeader from './TopSecondHeader';
function TopHeader() {

    return (
        <>
            <header className="section-header">
                <TopSecondHeader />
                <nav className="navbar navbar-light bg-gray-light navbar-expand-lg">
                    <div className="container">
                        <button className="navbar-toggler border" type="button" data-bs-toggle="collapse" data-bs-target="#navbar_main">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbar_main">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link ps-0" href="#"> Categories </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Hot offers</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Gift boxes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Projects</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Menu item</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Menu name</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="dropdown-toggle nav-link" href="#" data-bs-toggle="dropdown">
                                        Others
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li> <a className="dropdown-item" href="#">Submenu one </a> </li>
                                        <li> <a className="dropdown-item" href="#">Submenu two</a> </li>
                                        <li> <a className="dropdown-item" href="#">Submenu three</a> </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default TopHeader;