export const Baseurl = "https://upskilling-egypt.com:3000";

export const UserBase = `${Baseurl}/api/v0/admin/users`;
export const UserUrlBase = {
  login: `${UserBase}/login`,
  createuser: `${UserBase}`,
  forgetpassword: `${UserBase}/forgot-password`,
  resetpassword: `${UserBase}/reset-password`,
};

const RoomBase = `${Baseurl}/rooms`;

export const RoomUrlBase = {
  getallrooms: `${RoomBase}`,
  UpdateRooms: (id: string) => `${RoomBase}/${id}`,
};
export const ListBaseBooks = `${Baseurl}/api/v0/admin/booking`;
