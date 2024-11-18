import useRoleInClass from '~/hooks/useRoleInClass';
import { Role } from '~/enums/role';

function PermissionWrapper({
    children,
    role,
}: {
    children: JSX.Element | JSX.Element[];
    role: Role;
}) {
    const currentRole = useRoleInClass();
    console.log('chjeck cure', currentRole);
    return <>{currentRole === role && children}</>;
}

export default PermissionWrapper;
