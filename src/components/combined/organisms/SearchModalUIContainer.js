import useSearchModal from "../../functional/organisms/useSearchModal";
import SearchModalUI from "../../ui/organisms/SearchModalUI";

const SearchModalUIContainer = () => {
  const { isOpen, closeModal, openModal, setQuery, filteredsearchList } =
    useSearchModal();
  return <SearchModalUI isOpen={isOpen} closeModal={closeModal} openModal={openModal} setQuery={setQuery} filteredsearchList={filteredsearchList}/>;
};

export default SearchModalUIContainer;
