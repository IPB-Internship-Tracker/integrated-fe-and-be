import {
  ArrowRight,
} from "lucide-react";

const FilePreviewCard = ({
  title,
  fileUrl,
}) => {

  const isPDF =
    fileUrl?.toLowerCase().split("?")[0].endsWith(".pdf");

  return (

    <div className="space-y-2">

      {/* TITLE */}
      <h3 className="text-md font-semibold">
        {title}
      </h3>

      {/* PREVIEW */}
      <div
        className="
          h-[600px]
          overflow-hidden
          rounded-xl
          border
          border-light-blue
          bg-gray-100
        "
      >

        {isPDF ? (

          <iframe
            src={fileUrl}
            title={title}
            className="w-full h-full"
          />

        ) : (

          <img
            src={fileUrl}
            alt={title}
            className="
              w-full
              h-full
              object-cover
            "
          />

        )}

      </div>

      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex
          items-center
          gap-2
          text-bold-blue
          text-sm
          hover:text-indigo-700
          hover:underline
          transition
        "
      >
        Selengkapnya
        <ArrowRight size={18} />
      </a>

    </div>
  );
};

export default FilePreviewCard;
