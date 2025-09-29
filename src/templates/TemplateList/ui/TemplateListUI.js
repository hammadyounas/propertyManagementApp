"use client";
import { useState, useEffect } from "react";
import Card from "../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import GlobalFilter from "../../../components/ui/atoms/GlobalFilter";
import DropdownUINew from "../../../components/ui/organisms/DropdownUINew";
import Button from "../../../components/ui/molecules/Button";
import LoadingUI from "../../../components/ui/atoms/LoadingUI";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { dateFormat } from "../../../libs/utils/helper";

export default function TemplateListUI({
  templates,
  onEdit,
  onDelete,
  onDuplicate,
  globalFilter,
  setGlobalFilter,
  loading = false,
  setCategoryFilter,
  categoryFilter,
}) {
  const router = useRouter();

  const categories = [
    { label: 'All Templates', value: 'all' },
    { label: 'Email Templates', value: 'email' },
    { label: 'Contract Templates', value: 'contract' },
    { label: 'Listing Templates', value: 'listing' },
    { label: 'Marketing Templates', value: 'marketing' },
  ];

  const columns = [
    { label: 'Template Name' },
    { label: 'Category' },
    { label: 'Content Preview' },
    { label: 'Created Date' },
    { label: 'Actions' },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      email: 'text-blue-600 bg-blue-200',
      contract: 'text-green-600 bg-green-200',
      listing: 'text-purple-600 bg-purple-200',
      marketing: 'text-orange-600 bg-orange-200',
      default: 'text-gray-600 bg-gray-200',
    };
    return colors[category] || colors.default;
  };

  const truncateContent = (content, maxLength = 100) => {
    if (!content) return '';
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
  };

  return (
    <Card noborder>
      <ToastContainer />
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center sm:mb-6 mb-2 w-full">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="flex flex-wrap items-center justify-end gap-2 max-sm:mt-2">
          <div className="w-full flex items-center max-sm:justify-end gap-2 whitespace-nowrap text-sm">
            <DropdownUINew
              label={categoryFilter || "All Categories"}
              wrapperClass="sm:w-48"
              labelClass="btn-secondary bg-primary-default flex items-center justify-center gap-2 px-4 py-3 rounded cursor-pointer"
              classMenuItems="left-0 max-sm:w-32 text-sm"
              classItem="p-2"
              onSelect={(value) => {
                setCategoryFilter(value);
              }}
              items={categories}
            />
            <span className="">
              <Button
                text="Add Template"
                onClick={() => router.push('/templates/create')}
                className="btn-primary bg-primary-default w-full whitespace-nowrap font-medium"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 text-center">
              <thead className="bg-slate-200 dark:bg-slate-700">
                <tr>
                  {columns?.map((column, i) => (
                    <th key={i} scope="col" className="table-th font-bold px-4 py-4 text-center whitespace-nowrap">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={columns.length} className="p-4">
                      <div className="flex items-center justify-center w-full">
                        <LoadingUI />
                      </div>
                    </td>
                  </tr>
                ) : templates.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="p-4 text-center">
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  templates?.map((template, i) => (
                    <tr
                      key={i}
                      className="even:bg-slate-200 dark:even:bg-slate-700"
                    >
                      <td className="table-td sm:p-4 p-2">
                        <div className="flex items-center justify-center">
                          <span className="text-primary-default font-bold cursor-pointer">
                            {template.title}
                          </span>
                        </div>
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        <span className="block w-full whitespace-nowrap">
                          <span
                            className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${getCategoryColor(template.category || 'uncategorized')}`}
                          >
                            {template.category || 'Uncategorized'}
                          </span>
                        </span>
                      </td>
                      <td className="table-td sm:p-4 p-2 text-left">
                        <div className="">
                          {truncateContent(template.content)}
                        </div>
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        {dateFormat(template.createdAt || template.date)}
                      </td>
                      <td className="table-td sm:p-4 p-2">
                        <div className="flex justify-center">
                          <Icon
                            onClick={() => onEdit(template)}
                            className="cursor-pointer text-[20px]"
                            icon={"heroicons:pencil-square"}
                          />
                          <Icon
                            onClick={() => onDuplicate(template)}
                            className="cursor-pointer text-[20px] mx-4"
                            icon={"heroicons:document-duplicate"}
                          />
                          <Icon
                            onClick={() => onDelete(template.id)}
                            className="cursor-pointer text-[20px]"
                            icon={"heroicons-outline:trash"}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
}
