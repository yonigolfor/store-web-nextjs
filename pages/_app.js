import "bootstrap/dist/css/bootstrap.min.css"; // make the bootstrap work!
import "../style/global.css"; // needs to appear after to be ablee to use both bootstrap and my own css
import { Provider } from "react-redux";
import store from "../store/index";
import Header from "../components/header";
import HeaderNavbar from "../components/navbars/HeaderNavbar";

// import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    // <Layout>
    <Provider store={store}>
      <HeaderNavbar />
      <Component {...pageProps} />
    </Provider>
    // </Layout>
  );
}

export default MyApp;
