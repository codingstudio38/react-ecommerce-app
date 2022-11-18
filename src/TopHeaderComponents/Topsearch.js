function Topsearch() {

    return (
        <>
            <form action="#" className="">
                <div className="input-group">
                    <input type="search" className="form-control" style={{ width: "55%" }} placeholder="Search" />
                    <select className="form-select">
                        <option value="">All type</option>
                        <option value="codex">Special</option>
                        <option value="comments">Only best</option>
                        <option value="content">Latest</option>
                    </select>
                    <button className="btn btn-primary"> <i className="fa fa-search"></i> </button>
                </div>
            </form>
        </>
    )
}
export default Topsearch;