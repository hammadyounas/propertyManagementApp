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
  
  // Wait for router to be ready before rendering
  if (!router.isReady) {
    return <div>Loading...</div>;
  }
  
  return <DesignDocumentPage documentId={id} />;
};

export default withAuth(EditDesignDocument);


