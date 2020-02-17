export interface IUser {
  userId?: string;
  username: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
  language: number;
  hemiferium?: string
}

export interface createUserDTO {
  userId?: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  latitude: number;
  longitude: number;
  language: number;
  hemiferium?: string;
}



