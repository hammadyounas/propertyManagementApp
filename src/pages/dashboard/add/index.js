import withAuth from "../../../components/ui/organisms/withAuth";
import AddFormPage from "../../../templates/Dashboard/combined/page/AddFormPage";

const Add = () => {
    return <AddFormPage />;
}

export default withAuth(Add);