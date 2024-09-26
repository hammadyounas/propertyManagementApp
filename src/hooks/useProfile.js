import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "../components/partials/auth/store";

const useProfile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const setAuth = (val) => dispatch(handleLogin(val));

  return [auth, setAuth];
};

export default useProfile;
