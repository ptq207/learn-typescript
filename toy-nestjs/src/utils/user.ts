import moment from 'moment';
import { UserEntity } from 'src/user/user.entity';
import { UserData } from 'src/user/dto/user.dto';

export function mapUserData(userEntity: UserEntity): UserData {
  const dobStr =
    userEntity.dob !== null ? moment(userEntity.dob).format('YYYYMMDD') : '';
  const registeredAtStr =
    userEntity.registeredAt !== null
      ? moment(userEntity.registeredAt).format('YYYYMMDD')
      : '';
  return {
    username: userEntity.username,
    email: userEntity.email,
    dob: dobStr,
    registeredAt: registeredAtStr,
    avatar: userEntity.avatar,
  };
}
