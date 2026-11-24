function Footer() {
  return (
    <footer className="page-footer blue darken-1">
      <div className="footer-copyright blue darken-2">
        <div className="container white-text">
          © {new Date().getFullYear()}. Магазин
          <a className="white-text right" href="http://localhost/">Ссылка</a>          
        </div>
      </div>
    </footer>
  );
}

export { Footer };
