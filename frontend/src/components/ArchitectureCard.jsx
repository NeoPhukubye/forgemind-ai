import ArchitectureHeader from "./ArchitectureHeader";
import TechStack from "./TechStack";
import FolderStructure from "./FolderStructure";
import ApiEndpoints from "./ApiEndpoints";
import DatabaseSchema from "./DatabaseSchema";
import Roadmap from "./Roadmap";
import Security from "./Security";
import Risks from "./Risks";

export default function ArchitectureCard({
                                             result,
                                             activeTab,
                                         }) {
    if (!result) return null;

    switch (activeTab) {

        case "architecture":
        case "dashboard":
            return (
                <ArchitectureHeader
                    result={result}
                />
            );

        case "tech":
            return (
                <TechStack
                    result={result}
                />
            );

        case "folders":
            return (
                <FolderStructure
                    result={result}
                />
            );

        case "api":
            return (
                <ApiEndpoints
                    result={result}
                />
            );

        case "database":
            return (
                <DatabaseSchema
                    result={result}
                />
            );

        case "roadmap":
            return (
                <Roadmap
                    result={result}
                />
            );

        case "security":
            return (
                <Security
                    result={result}
                />
            );

        case "risks":
            return (
                <Risks
                    result={result}
                />
            );

        default:
            return (
                <ArchitectureHeader
                    result={result}
                />
            );
    }
}