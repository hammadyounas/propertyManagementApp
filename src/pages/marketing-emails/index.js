import withAuth from "../../components/ui/organisms/withAuth";
import MarketingEmailsListingPage from "../../templates/MarketingEmailsListing/combined/page/MarketingEmailsListingPage";

const MarketingEmails = () => {
  return <MarketingEmailsListingPage />;
};

export default withAuth(MarketingEmails);
