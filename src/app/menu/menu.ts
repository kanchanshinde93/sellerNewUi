import { CoreMenu } from "@core/types";

export const menu: CoreMenu[] = [
  {
    id: "orders",
    title: "Orders",
    translate: "MENU.ORDERS",
    type: "item",
    icon:"../../assets/images/myimages/Group 40292.png",
    url: "dashboard/order",
  },
 /*  {
    id: "orders",
    title: "Orders",
    translate: "MENU.ORDERS",
    type: "item",
    url: "dashboard/orders",
  }, */
  {
    id: "allOutlet",
    title: "",
    translate: "MENU.ALLOUTLET",
    type: "item",
    icon:"../../assets/images/myimages/Group 40294.png",
    url: "dashboard/allOutlet",
  },
  {
    id: "ticket",
    title: "",
    translate: "MENU.TICKET",
    type: "item",
    icon:"../../assets/images/navbaricon/Group 40275.png/",
    url: "dashboard/ticket",
  },
  {
    id: "promotion",
    title: "",
    translate: "MENU.PROMOTION",
    type: "item",
    icon:"../../assets/images/navbaricon/Group 40276.png/",
    url: "dashboard/promotion",
  },
  {
    id: "Account",
    title: "",
    translate: "MENU.ACCOUNT",
    type: "item",
    icon:"../../assets/images/myimages/Group 40291.png/",
    url: "dashboard/account",
  },
  // {
  //   id: "newmenu",
  //   title: "newmenu",
  //   translate: "MENU.NEWMENU",
  //   type: "item",
  //   url: "dashboard/newmenu",
  // },

];
