import { Provider } from "react-redux";
import LandingPage from "./LandingPage";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <LandingPage />
    </Provider>
  )
}