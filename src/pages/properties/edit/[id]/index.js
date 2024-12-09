import withAuth from "../../../../components/ui/organisms/withAuth";
import EditPropertyPage from "../../../../templates/EditProperties/combined/page/EditPropertyPage";

const EditProperty = () => {
    return <EditPropertyPage />
}

export default withAuth(EditProperty);