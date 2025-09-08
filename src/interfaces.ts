import type { JwtPayload } from "jwt-decode";

export interface Ilogin {
  email: string;
  password: string;
}
export interface MyToken extends JwtPayload {
  role: string;
  id?: string;
  verified?: boolean;
}
export interface Iregister {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
  role?: string;
  profileImage?: File | null;
}

export interface Userdata {
  _id: string;
  userName: string;
  role: string;
}

export interface IAuthcontext {
  userdata: Userdata | null | undefined;
  savedata: () => void;
}

export interface Responsedata {
  data: {
    user: {
      _id: string;
      userName: string;
      role: string;
    };
    token: string;
  };
}

export interface IRoom {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: [
    {
      _id: string;
      name: string;
    }
  ];
  createdBy: {
    _id: string;
    userName: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
}
export interface UpdateRoom {
  _id?: string;
  roomNumber?: string;
  price?: string;
  capacity?: string;
  discount?: string;
  facilities?: FacilityData[];
  imgs?: File[] | null;
}
export interface Addroom {
  _id?: string;
  roomNumber?: string;
  price?: string;
  capacity?: string;
  discount?: string;
  facilities?: FacilityData[];
  imgs?: File[] | null;
}
export interface ResponseRoomdata {
  success: boolean;
  message: string;
  data: {
    rooms: IRoom[];
    totalCount: number;
  };
}

export interface ResponseFacilityData {
  success: boolean;
  message: string;
  data: {
    facilities: FacilityData[];
  };
}
export interface FacilityData {
  _id?: string;
  name?: string;
  createdBy?: {
    _id: string;
    userName: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
export interface Addfacility {
  name: string;
}
export interface AdvertismentData {
  _id: string;
  isActive: boolean;
  room: {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
    discount: number;
    facilities: string[];
    createdBy: string;
    images: File[];
    createdAt: string;
    updatedAt: string;
  };
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ResponseAdvertisment {
  success: boolean;
  message: string;
  data: {
    ads: AdvertismentData[] | null;
  };
}
export interface Advertisementdatahandel {
  room?: string;
  discount?: number;
  isActive?: boolean;
}
export interface Advertisementdatahandelupdata {
  discount?: number;
  isActive?: boolean;
}

export interface Listbook {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: {
    _id: string;
    userName: string;
  };
  room: {
    _id: string;
    roomNumber: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  stripeChargeId: string;
}
export interface Users {
  country: string;
  createdAt: string;
  email: string;
  phoneNumber: number;
  profileImage: string;
  role: string;
  updatedAt: string;
  userName: string;
  verified: boolean;
  _id: string;
}

export interface IFavorite {
  _id: string;
  rooms: [
    {
      _id: string;
      roomNumber: number;
      price: number;
      capacity: number;
      discount: number;
      facilities: string[];
      createdBy: string;
      images: string[];
      createdAt: string;
      updatedAt: string;
    }
  ];
  user: {
    _id: string;
    userName: string;
  };
}

export interface Dashboarddata{
rooms: number,
        facilities: number,
        bookings: {
            pending: number,
            completed: number
        },
        ads: number,
        users: {
            user: number,
            admin: number
}
}
