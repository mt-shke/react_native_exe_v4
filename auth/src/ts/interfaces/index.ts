export interface IUser {
  email: string;
  uid: string;
  newUser: boolean;
  profile: {
    username: string;
    job: string;
  };
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IEmail {
  email: string;
}

export interface IGalleryImg {
  title: string;
  description?: string;
  imgUrl: string;
  fileName: string;
}

export interface IGalleryImgData {
  data: IGalleryImg;
}
