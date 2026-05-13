import React from 'react'
import Textinput from '../../../../components/ui/atoms/TextInput'
import TextareaUI from '../../../../components/ui/molecules/TextareaUI'
import ReactSelect from "react-select";

export default function EditDashboardForm({ register, errors, loading, invoice, handleSelectInvoiceStatus, invoiceStatus, pmtReceived, handlePmtReceived, pmtReceivedStatus }) {
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
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="w-full md:w-[49%]">
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
            className="text-sm capitalize"
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
            className="text-sm capitalize"
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
          />
        </div>

        <div className="mt-[6px] w-full md:w-[49%]">
          <Textinput
            name="commission_percentage"
            label="Commission %*"
            type="number"
            register={register}
            error={errors.commission_percentage}
            placeholder="Commission Percentage"
            disabled={loading}
            step="0.01"
            min="0"
            max="100"
          />
        </div>

        <div className="w-full md:w-[49%]">
          <TextareaUI
            name="comment"
            label="Comment"
            register={register}
            error={errors.comment}
            placeholder="Comment"
            classLabel='my-2 text-sm'
            className={'capitalize'}
          />
          <p className="text-xs text-gray-500 text-right">Max (100 words)</p>
        </div>

      </div>


    </div>

  )
}
