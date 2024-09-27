import { useState } from "react";

const useSearchModal = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [query, setQuery] = useState(" ");
  const searchList = [
    {
      id: 1,
      name: "What is Dashcode ?",
    },
    {
      id: 2,
      name: "Our Services",
    },
    {
      id: 3,
      name: "Our Team",
    },
    {
      id: 4,
      name: "Our Clients",
    },
    {
      id: 5,
      name: "Our Partners",
    },
    {
      id: 6,
      name: "Our Blog",
    },
    {
      id: 7,
      name: "Our Contact",
    },
  ];
  const filteredsearchList = searchList.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return {
    isOpen,
    closeModal,
    openModal,
    setQuery,
    filteredsearchList
  }

}

export default useSearchModal