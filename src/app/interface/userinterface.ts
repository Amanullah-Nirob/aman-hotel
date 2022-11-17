export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    birthYear: Number,
    subscribe: Boolean,
    role: String,
    gender: String,
}

  export interface LoginRequest {
    email: string;
    password: string;
  }
  

  export interface AuthResponse {
    _id: string,
    name: string,
    email: string,
    birthYear: Number,
    subscribe: Boolean,
    role: String,
    gender: String,
    cloudinary_id: string,
    profilePic: string,
    token: string,
    expiryTime: number
}