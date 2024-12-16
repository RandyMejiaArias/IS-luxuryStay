import { checkAvailability } from '../controllers/availability.controller.js';

export const service = {
  HotelService: {
    HotelPort: {
      CheckAvailability: async ({ startDate, endDate, roomType }) => {
        return checkAvailability({ startDate, endDate, roomType });
      },
    },
  },
};
