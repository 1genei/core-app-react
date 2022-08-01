import {
  
  List,
  Square,
  Users,
} from "react-feather";

import {
  Contacts
  }from '@mui/icons-material';

const pagesSection = [
  {
    href: "/",
    icon: Users,
    title: "Utilisateurs",
    children: [
      {
        href: "/utilisateurs",
        title: "Actifs",
      },
      {
        href: "/archives",
        title: "Archives",
      },
    ],
  },

  {
    href: "/",
    icon: Contacts,
    title: "Contacts",
    children: [
      {
        href: "/contacts",
        title: "Actifs",
      },
      {
        href: "/archives",
        title: "Archivés",
      },
    ],
  },
];

const elementsSection = [
   

  {
    href: "/liste",
    icon: List,
    title: "Liste",
  },
  {
    href: "/blank",
    icon: Square,
    title: "Vide",
  },
  

];


const navItems = [
  
  {
    title: "",
    pages: pagesSection,
  },
  {
    title: "Elements",
    pages: elementsSection,
  },
  
];

export default navItems;
