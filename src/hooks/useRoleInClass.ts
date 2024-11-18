import { Role } from '~/enums/role';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getRole } from '~/repositories/class';

export default function useRoleInClass(): Role | undefined {
    const { id } = useParams();
    console.log('check id in param', id);
    const { data } = useQuery<Role>(['role', id], () => getRole(Number(id)));
    console.log('check data in param', data);

    return data;
}
