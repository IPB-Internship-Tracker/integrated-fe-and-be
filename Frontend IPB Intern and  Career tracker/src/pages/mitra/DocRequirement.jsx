import DocRequirementForm from "../../components/forms/DocRequirementForm";
import { kegiatanService } from "../../services/kegiatanService";
import { mapMagangFormToPayload } from "../../services/adapters";

const DocRequirement = () => {
    return (
        <div className="flex flex-col items-center py-5">
            <DocRequirementForm
                onSaveDraft={async (selectedDocs) => {
                    const raw =
                        sessionStorage.getItem("pending_magang_form");
                    const formData = raw ? JSON.parse(raw) : {};

                    await kegiatanService.saveDraft(
                        "magang",
                        mapMagangFormToPayload(
                            formData,
                            selectedDocs
                        )
                    );

                    sessionStorage.removeItem(
                        "pending_magang_form"
                    );
                    sessionStorage.removeItem(
                        "pending_magang_docs"
                    );
                }}
                onPublish={async (selectedDocs) => {
                    const raw =
                        sessionStorage.getItem("pending_magang_form");
                    const formData = raw ? JSON.parse(raw) : {};

                    await kegiatanService.createMagang(
                        formData,
                        selectedDocs
                    );

                    sessionStorage.removeItem(
                        "pending_magang_form"
                    );
                    sessionStorage.removeItem(
                        "pending_magang_docs"
                    );
                }}
            />

        </div>
    );
};

export default DocRequirement;
