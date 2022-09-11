import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity {
  @Column()
  userID: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  dob: Date;

  @Column()
  avatar: string;

  @Column()
  password: string;

  @Column()
  registeredAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
