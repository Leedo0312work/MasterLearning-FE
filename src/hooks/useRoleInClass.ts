import { Role, RoleInClass } from '~/enums/role';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getRole } from '~/repositories/class';
import { getMe } from '~/repositories/auth';

export default function useRoleInClass(): any | undefined {
    const { id } = useParams();
    const { data } = useQuery<any>(['role', id], () => getMe());

    return data?.role;
}
