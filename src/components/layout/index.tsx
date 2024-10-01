import { Outlet } from 'react-router-dom';
import Header from '../header';
const Layout = () => {
  return (
    <div style={{ margin: "0" }}>
      <Header />
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;
