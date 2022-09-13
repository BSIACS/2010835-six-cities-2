import { HostType } from './host-type.enum.js';

export type Host = {
  name: string,
  email: string,
  avatar: string,
  password: string,
  hostType: HostType
}
