import apiClient from '../lib/apiClient'
import { RoomType } from '../types/types';
import { catchError } from '../utils/catchError';

const getRooms = async (query: Record<string, any> = {}): Promise<{}> => {
  try {
    const url = `/room`;
    const { data } = await apiClient.get(url, { params: {...query} });
    return data
  } catch (error) {
    throw new Error(catchError(error as any));
  }
};

export const getRoom = async (id: string): Promise<RoomType> => {
  try {
    const url = `/room/${id}`;
    const { data } = await apiClient.get(url);
    return data;
  } catch (error) {
    throw new Error(catchError(error as any));
  }
};

const RoomServices = {
  getRooms,
  getRoom,
};

export default RoomServices;
