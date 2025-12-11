import useTemplates2List from '../../functional/useTemplates2List';
import Templates2ListUI from '../../ui/Templates2ListUI';

export default function Templates2ListPage() {
  const {
    templates,
    loading,
    globalFilter,
    setGlobalFilter,
    handleEdit,
    handleDelete,
    handleDuplicate,
    router,
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    handlePageChange,
  } = useTemplates2List();

  return (
    <Templates2ListUI
      templates={templates}
      loading={loading}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onDuplicate={handleDuplicate}
      router={router}
      currentPage={currentPage}
      pageSize={pageSize}
      totalCount={totalCount}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  );
}

