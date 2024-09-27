import useBreadcrumbs from "../../functional/molecules/useBreadcrumbs";
import BreadcrumbsUI from "../../ui/molecules/BreadcrumbsUI";

const BreadcrumbsUIContainer = () => {
  const { locationName, isHide, groupTitle } = useBreadcrumbs();
  return (
    <BreadcrumbsUI
      locationName={locationName}
      isHide={isHide}
      groupTitle={groupTitle}
    />
  );
};

export default BreadcrumbsUIContainer;
