export interface updateuserData {
  email: string;
  password_verified_code?: string | undefined;
  password_reset_expires?: Date | undefined;
  reset_code_verified?: boolean | undefined | string;
  password?: string;
}

export type user = {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  passwordConfirm?: string;
  phone?: string;
  role?: string;
  city?: string;
  profile_img?: string;
  password_changed_at?: Date;
  password_verified_code?: number;
  password_reset_expires?: Date;
  reset_code_verified?: boolean;
};
