import React from 'react'
import Textinput from '../../../../components/ui/atoms/TextInput'
import ReactSelect from "react-select";

export default function AddForm({register, errors, loading, invoice, handleSelectInvoiceStatus, invoiceStatus, pmtReceived, handlePmtReceived, pmtReceivedStatus}) {
  return (
      <div className='my-4'>
        <div className='flex flex-wrap justify-between'>
        <div className="w-full md:w-[49%]">
            <Textinput
              name="signature_date"
              label="Signature Date*"
              type="date"
              register={register}
              error={errors.signature_date}
              placeholder="Signature Date"
              disabled={loading}
            />
          </div>

        <div className="mt-[6px] w-full md:w-[49%]">
            <Textinput
              name="dd"
              label="DD*"
              type="number"
              register={register}
              error={errors.dd}
              placeholder="DD"
              disabled={loading}
            />
          </div>

        <div className="mt-[6px] w-full md:w-[49%]">
            <Textinput
              name="financing_days"
              label="Financing Days*"
              type="number"
              register={register}
              error={errors.financing_days}
              placeholder="Financing Days"
              disabled={loading}
            />
          </div>

        <div className="mt-[6px] w-full md:w-[49%]">
            <Textinput
              name="closing_days"
              label="Closing Days*"
              type="number"
              register={register}
              error={errors.closing_days}
              placeholder="Closing Days"
              disabled={loading}
            />
          </div>

          <div className="mt-[6px] w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Invoice*</div>
            <ReactSelect
              name="invoice"
              value={invoice}
              onChange={handleSelectInvoiceStatus}
              options={invoiceStatus}
              placeholder="Invoice Status"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.invoice && !invoice && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.invoice?.message}
              </p>
            )}
          </div>

          <div className="mt-[6px] w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">PMT Received*</div>
            <ReactSelect
              name="pmtReceived"
              value={pmtReceived}
              onChange={handlePmtReceived}
              options={pmtReceivedStatus}
              placeholder="PMT Received"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.pmtReceived && !pmtReceived && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.pmtReceived?.message}
              </p>
            )}
          </div>

          <div className="w-full md:w-[49%]">
            <Textinput
              name="value_of_amount"
              label="Value of Amount*"
              type="number"
              register={register}
              error={errors.value_of_amount}
              placeholder="Value of Amount"
              disabled={loading}
            />
          </div>

        </div>

        
      </div>
  
  )
}
