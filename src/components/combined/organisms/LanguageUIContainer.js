import useLanguage from "../../functional/organisms/useLanguage";
import LanguageUI from "../../ui/organisms/LanguageUI";

const LanguageUIContainer = () => {
  const { selected, setSelected, months } = useLanguage();
  return <LanguageUI selected={selected} setSelected={setSelected} months={months}/>;
};

export default LanguageUIContainer;
