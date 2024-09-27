import useFooter from "../../functional/organisms/useFooter";
import FooterUI from "../../ui/organisms/FooterUI";

const FooterUIContainer = ({ className = "custom-class" }) => {
  const { footerclassName } = useFooter();
  return (
    <FooterUI
      footerclassName={footerclassName}
      className={className}
    />
  );
};

export default FooterUIContainer;
