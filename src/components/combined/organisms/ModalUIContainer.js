import ModalUI from "../../ui/organisms/ModalUI";

const Modal = ({
  activeModal,
  onClose,
  noFade,
  disableBackdrop,
  className = "max-w-xl",
  children,
  footerContent,
  centered,
  scrollContent,
  themeClass = "bg-primary-default dark:bg-slate-800 dark:border-b dark:border-slate-700",
  title = "Basic Modal",
  uncontrol,
  label = "Basic Modal",
  labelClass,
  ref,
}) => {
  return (
    <ModalUI
      activeModal={activeModal}
      onClose={onClose}
      noFade={noFade}
      disableBackdrop={disableBackdrop}
      className={className}
      children={children}
      footerContent={footerContent}
      centered={centered}
      scrollContent={scrollContent}
      themeClass={themeClass}
      title={title}
      uncontrol={uncontrol}
      label={label}
      labelClass={labelClass}
    />
  );
};

export default Modal;
