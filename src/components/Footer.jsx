const Footer = () => {
  return (
    <>
      <footer className="bg-body-tertiary text-center text-lg-start">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © {new Date().getFullYear()} Copyright:
          <a className="text-body" href="/">
            Pixel6
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
