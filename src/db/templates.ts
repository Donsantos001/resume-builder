import DefaultTemplate from "../components/Template/DefaultTemplate"
import DefaultTemplateImage from "../asset/imgs/defaulttemplate.png";
import BasicTemplateImage from "../asset/imgs/basictemplate.png";
import BasicTemplate from "../components/Template/BasicTemplate";

export const templates = [
    {
        name: "Default",
        image: DefaultTemplateImage,
        component: DefaultTemplate,
    },
    {
        name: "Basic",
        image: BasicTemplateImage,
        component: BasicTemplate,
    }
    
]