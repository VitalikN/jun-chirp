import JuniorForm from "@/components/RoleFormes/junior/JuniorForm";
import PartnerForm from "@/components/RoleFormes/partner/PartnerForm";
import { RoleType } from "@/utils/types/Role";
import { Roles } from "../app/Role";
import MentorForm from "@/components/RoleFormes/mentor/MentorForm";
import InvestorForm from "@/components/RoleFormes/investor/InvestorForm";

export const getRoleForm = (role: RoleType): React.ReactElement => {
  console.log(Roles.JUNIOR);
  switch (role) {
    case Roles.INVESTOR:
      return <InvestorForm />;
    case Roles.JUNIOR:
      return <JuniorForm />;
    case Roles.MENTOR:
      return <MentorForm />;
    case Roles.PARTNER:
      return <PartnerForm />;
    default:
      return <p>No form available for this role.</p>;
  }
};
