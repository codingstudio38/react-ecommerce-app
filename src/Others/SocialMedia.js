import '../css/App.css';
function SocialMedia() {

    return (
        <>
            <nav className="float-lg-end">
                <a className="btn btn-icon btn-light" title="Facebook" target="_blank" href="#"><i className="fab fa-facebook-f"></i></a>
                <a className="btn btn-icon btn-light" title="Instagram" target="_blank" href="#"><i className="fab fa-instagram"></i></a>
                <a className="btn btn-icon btn-light" title="Youtube" target="_blank" href="#"><i className="fab fa-youtube"></i></a>
                <a className="btn btn-icon btn-light" title="Twitter" target="_blank" href="#"><i className="fab fa-twitter"></i></a>
            </nav>
        </>
    )
}
export default SocialMedia;