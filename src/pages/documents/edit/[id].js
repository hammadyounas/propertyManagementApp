import withAuth from "../../../components/ui/organisms/withAuth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DesignDocumentPage = dynamic(
  () => import("../../../templates/Documents/combined/pages/DesignDocumentPage"),
  { ssr: false }
);

const EditDesignDocument = () => {
  const router = useRouter();
  const { id } = router.query;
  return <DesignDocumentPage />;
};

export default withAuth(EditDesignDocument);


