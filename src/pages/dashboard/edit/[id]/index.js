import withAuth from "../../../../components/ui/organisms/withAuth"
import EditFormPage from "../../../../templates/Dashboard/combined/page/EditFormPage";

const EditDashboardPage = () => {
    return <EditFormPage />
}

export default withAuth(EditDashboardPage);