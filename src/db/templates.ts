import DefaultTemplate from "../components/Template/DefaultTemplate"
import TemplateImage from "../asset/imgs/template1.png";
import BasicTemplate from "../components/Template/BasicTemplate";

export const templates = [
    {
        name: "Default",
        image: TemplateImage,
        component: DefaultTemplate,
    },
    {
        name: "Basic",
        image: TemplateImage,
        component: BasicTemplate,
    }
    
]