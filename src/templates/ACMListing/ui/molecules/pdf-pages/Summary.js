// components/pdf
import PdfHeader from '../../../../../components/ui/molecules/PdfHeader';

const Summary = ({ acmData }) => {
  const baseProperty = acmData.base_property || {};

  return (
    <div
      className="w-full bg-gray-100 min-h-screen p-8 flex flex-col"
      style={{ height: '1120px', width: '794px' }}
    >
      {/* Header */}
      <PdfHeader acmData={acmData} />
    </div>
  );
};

export default Summary;