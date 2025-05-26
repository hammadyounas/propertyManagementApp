import withAuth from "../../../components/ui/organisms/withAuth"
import CreateACMPage from "../../../templates/ACMListing/combined/page/CreateACMPage"

const CreateACM = () => {
    return <CreateACMPage />
}

export default withAuth(CreateACM)