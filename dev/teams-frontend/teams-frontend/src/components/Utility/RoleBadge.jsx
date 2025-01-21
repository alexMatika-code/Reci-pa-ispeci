import {Badge} from "react-bootstrap";

const RoleBadge = ({ role }) => {
    let badgeClass = "bg-info";

    if (role === "ADMIN") {
        badgeClass = "bg-danger";
    } else if (role === "CHEF") {
        badgeClass = "bg-success";
    }

    return <Badge className={badgeClass}>{role}</Badge>;
};

export default RoleBadge;
