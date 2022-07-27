export interface IEmail {
  email: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IProduct {
  imgUrl: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export interface IUser {
  email: string;
  firstname: string;
  lastname: string;
  profilPicture: string;
  uid: string;
  address: {street: string; zipCode: number; state: string};
}
