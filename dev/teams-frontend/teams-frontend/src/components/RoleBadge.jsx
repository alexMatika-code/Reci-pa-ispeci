import {Badge} from "react-bootstrap";

const RoleBadge = ({ role }) => {
    // Determine the badge class based on the role
    let badgeClass = "bg-info"; // Default class

    if (role === "ADMIN") {
        badgeClass = "bg-danger";
    } else if (role === "CHEF") {
        badgeClass = "bg-success";
    }

    return <Badge className={badgeClass}>{role}</Badge>;
};

export default RoleBadge;
