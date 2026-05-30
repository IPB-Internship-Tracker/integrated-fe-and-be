import NextButton from "../ui/NextButton";
import KompeStupenCard from "./KompeStupenCard";

const KompeStupenSection = ({
    logo,
    sectionTitle,
    buttonTo,
    programs,
}) => {

    return (
        <div className="mb-6">

            {/* HEADER */}
            <div className="
                flex items-center justify-between
                mb-4
            ">
                {/* TITLE */}
                <h3 className="
                    text-lg
                    font-semibold
                    text-gray-900
                ">
                    {sectionTitle} {/*kayaknya ini harus disesuaikan lagi sama nanti untuk ambil apakah dia magang, kompe, stupen*/}
                </h3>

                {/* BUTTON */}
                <NextButton
                    to={buttonTo}
                    label="Selengkapnya"
                />

            </div>

            {/* CARD LIST */}
            <div className="
                flex gap-4
                overflow-x-auto
                scrollbar-hide
                pb-2
            ">

                {programs.map((program, index) => (
                     <KompeStupenCard
                        key={index}
                        logo={program.logo}
                        title={program.title}
                        company={program.company}
                        deadline={program.deadline}

                        to={program.to}

                        className="
                            min-w-[350px]
                            max-w-[350px]
                            flex-shrink-0
                        "
                        />
                ))}
                
                

            </div>


        </div>
    );
};

export default KompeStupenSection;