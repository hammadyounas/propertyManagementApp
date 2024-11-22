import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const userId =
        typeof window !== "undefined" && localStorage.getItem("user_id");

      const protectedPaths = [
        "/meetings",
        "/properties",
        "/dashboard",
        "/sales-team",
        "/clients",
        "/invoices",
        "/send-email",
        "/acms",
        "/email-templates",
      ];

      // Check if path starts with any protected path
      const isProtectedPath = protectedPaths.some(
        (path) => pathname === path || pathname?.startsWith(`${path}/`)
      );

      // Redirect based on user_id and path
      if (!userId && isProtectedPath) {
        router.push("/");
      } else if (userId && (pathname === "/" || pathname === "/forget_password")) {
        router.push("/dashboard");
      }
    }, [pathname, router]);

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
