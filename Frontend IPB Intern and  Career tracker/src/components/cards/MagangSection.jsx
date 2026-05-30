import MagangCard from "./MagangCard";
import NextButton from "../ui/NextButton";

const ProgramSection = ({
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
                    {sectionTitle}
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

                    <MagangCard
                        key={index}

                        logo={program.logo}
                        title={program.title}
                        company={program.company}
                        category={program.category}
                        location={program.location}
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

export default ProgramSection;