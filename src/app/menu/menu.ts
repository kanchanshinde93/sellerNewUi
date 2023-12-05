import { CoreMenu } from "@core/types";

export const menu: CoreMenu[] = [
  {
    id: "orders",
    title: "Orders",
    translate: "MENU.ORDERS",
    type: "item",
    icon:"../../assets/images/myimages/Group 40311.svg",
    url: "dashboard/orders",
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
    title: "AllOutlet",
    translate: "MENU.ALLOUTLET",
    type: "item",
    icon:"../../assets/images/myimages/Group 40305.svg",
    url: "dashboard/allOutlet",
  },
  {
    id: "ticket",
    title: "Ticket",
    translate: "MENU.TICKET",
    type: "item",
    icon:"../../assets/images/myimages/Group 40309.svg",
    url: "dashboard/ticket",
  },
  {
    id: "promotion",
    title: "Promotion",
    translate: "MENU.PROMOTION",
    type: "item",
    icon:"../../assets/images/myimages/Group 40307.svg",
    url: "dashboard/promotion",
  },
  {
    id: "Account",
    title: "Account",
    translate: "MENU.ACCOUNT",
    type: "item",
    icon:"../../assets/images/myimages/Group 40306.svg",
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
