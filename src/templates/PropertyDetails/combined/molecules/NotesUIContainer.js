import useNotesTable from "../../functionality/organisms/useNotesTable";
import NotesUI from "../../ui/molecules/NotesUI";

const Notes = ({ rows }) => {
    const {columns} = useNotesTable();
  return <NotesUI columns={columns} rows={rows} />;
};

export default Notes;