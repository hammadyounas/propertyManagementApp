import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../store/authSlice";
import { getRequest } from "../../../libs/utils/request_handler"

const withAuth = (Component) => {
  const Auth = (props) => {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    const userId =
      typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

    const getUser = async () => {
      setLoading(true);
      try {
        const response = await getRequest(`user/${userId}`);
        if (response?.data) {
          dispatch(setUser(response?.data));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      if (userId && !user) {
        getUser();
      } else {
        setLoading(false);
      }
    }, [userId, user]);

    useEffect(() => {
      if (loading) return;


      const publicRoutes = ["/", "/forgot-password", "/reset-password"];
      const protectedRoutes = [
        "/meetings",
        "/properties",
        "/dashboard",
        "/broker",
        "/clients",
        "/invoices",
        "/send-email",
        "/acms",
        "/marketing-emails",
        "/profile",
        "/templates",
        "/templates/create",
        "/templates-listing",
        "/design-documents",
      ];

      const isProtectedPath = protectedRoutes.some(
        (path) => pathname === path || pathname?.startsWith(`${path}/`)
      );

      if (!user && isProtectedPath) {
        router.replace("/");
      } else if (user && publicRoutes.includes(pathname)) {
        router.replace("/dashboard");
      }
    }, [loading, pathname, user, router]);

    if (loading || typeof window == "undefined") {
      return (
        <div className="flex flex-col items-center justify-center app_height">
          <div className="mb-3">
            {/* <img
              src={"/assets/images/all-img/logo-red.png"}
              alt="Logo"
              className="mx-auto w-36"
            /> */}
          </div>
          <svg
            className="animate-spin h-12 w-12"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      );
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
