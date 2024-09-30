import CardUI from "../../ui/molecules/CardUI";

const Card = ({
  children,
  title,
  subtitle,
  headerslot,
  className = "custom-class  bg-white ",
  bodyClass = "p-6",
  noborder,
  titleClass = "custom-class ",
}) => {
  return (
    <CardUI
      children={children}
      title={title}
      subtitle={subtitle}
      headerslot={headerslot}
      className={className}
      bodyClass={bodyClass}
      noborder={noborder}
      titleClass={titleClass}
    />
  );
};

export default Card;
