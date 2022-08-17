import {

    List,
    Square
} from "react-feather";

import {
    Contacts,
    Store,
    Group,
    Settings
} from '@mui/icons-material';

const pagesSection = [
    {
        href: "/",
        icon: Contacts,
        title: "Contacts",
        children: [
            {
                href: "/contacts/actifs",
                title: "Actifs",
            },
            {
                href: "/contacts/archives",
                title: "Archives",
            },
        ],
    },
    {
        href: "/",
        icon: Store,
        title: "Organismes",
        children: [
            {
                href: "/organismes/actifs",
                title: "Actifs",
            },
            {
                href: "/organismes/archives",
                title: "Archives",
            },
        ],
    },
    {
        href: "/",
        icon: Group,
        title: "Utilisateurs",
        children: [
            {
                href: "/utilisateurs/actifs",
                title: "Actifs",
            },
            {
                href: "/utilisateurs/archives",
                title: "Archives",
            },
        ],
    },
    {
        href: "/parametres",
        icon: Settings,
        title: "Paramètres",
    },
];

const navItems = [

    {
        title: "",
        pages: pagesSection,
    },

];

export default navItems;
