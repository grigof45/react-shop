function Header() {
  return (
    <nav className="blue darken-1">
      <div className="nav-wrapper">
        <a href="http://localhost:3000" className="brand-logo">Магазин</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="http://localhost:3000" target="_blank" rel="noreferrer">Магазин</a></li>
        </ul>
      </div>
    </nav>
  );
}

export { Header };
