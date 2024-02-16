const styles = {
    searchBar: {
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: '150vh',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '150vw'
    }
}

const SearchBar = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden" style={styles.searchBar}>Search blog posts</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;