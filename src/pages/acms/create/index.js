import withAuth from "../../../components/ui/organisms/withAuth"
import CreateACMPage from "../../../templates/ACMListing/combined/page/CreateACMPage"

const ACM = () => {
    return <CreateACMPage />
}

export default withAuth(ACM)