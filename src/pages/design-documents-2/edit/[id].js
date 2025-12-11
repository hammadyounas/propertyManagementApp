import withAuth from "../../../components/ui/organisms/withAuth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DesignDocument2Page = dynamic(
  () => import("../../../templates/Documents2/combined/pages/DesignDocument2Page"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    ),
  }
);

const EditDesignDocument2 = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  return <DesignDocument2Page documentId={id} />;
};

export default withAuth(EditDesignDocument2);


