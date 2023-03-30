import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <h1>Layout</h1>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
