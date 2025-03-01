import {
    ArchiveBoxArrowDownIcon,
    DonorIcon,
    HospitalIcon,
    AnalyticsIcon,
  } from "../../../shared/Icons";
  
  export const OrganistionMenue = [
    {
      name: "Inventory",
      href: "/home",
      icon: ArchiveBoxArrowDownIcon,
      current: true,
    },
    { name: "Donor", href: "/donor", icon: DonorIcon, current: false },
    { name: "Hospital", href: "/hospital", icon: HospitalIcon, current: false },
    {
      name: "Analytics",
      href: "/Analytics",
      icon: AnalyticsIcon,
      current: false,
    },
  ];