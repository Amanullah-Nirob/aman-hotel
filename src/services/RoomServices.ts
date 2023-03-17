import axios from 'axios';
import apiClient from '../lib/apiClient'
import { RoomType } from '../types/types';
import { catchError } from '../utils/catchError';

const getRooms = async (query: Record<string, any> = {}): Promise<{}> => {
  try {
    const url = `/room`;
    const params = new URLSearchParams({...query});
    // const res = await apiClient.get(url, { params: params });
    const response= await fetch('https://amanhotel.onrender.com/api/room?' + params)
    const data= await response.json()
    return data
  } catch (error) {
    throw new Error(catchError(error as any));
  }
};

export const getRoom = async (id: string): Promise<RoomType> => {
  try {
    const url = `/room/${id}`;
    const response= await fetch(`https://amanhotel.onrender.com/api/room/${id}`)
    const data= await response.json()
    return data;
  } catch (error) {
    throw new Error(catchError(error as any));
  }
};
export const getMyReview = async (id: string): Promise<[]> => {
  try {
    const url = `/review/myReview/${id}`;
    const { data } = await apiClient.get(url);
    return data;
  } catch (error) {
    throw new Error(catchError(error as any));
  }
};
export const getMyLikes = async (id: string): Promise<[]> => {
  try {
    const url = `/like/myLikes/${id}`;
    const { data } = await apiClient.get(url);
    return data;
  } catch (error) {
    throw new Error(catchError(error as any));
  }
};

const RoomServices = {
  getRooms,
  getRoom,
  getMyReview,
  getMyLikes
};

export default RoomServices;
