export type PassengerRecord = {
  pnr: string;
  passengerName: string;
  seatNumber: string;
  scheduledDepartureTime: string;
  boardingPoint: string;
  destination: string;
};

export type SuccessResponse = {
  success: true;
  data: {
    pnr: string;
    passenger_name: string;
    seat_number: string;
    scheduled_departure_time: string;
    boarding_point: string;
    destination: string;
    operator_name: "LeafyBus";
    service_mode: "welcome_kit";
  };
};

export type ErrorResponse = {
  success: false;
  error: {
    code:
      | "PNR_NOT_FOUND"
      | "UNAUTHORIZED"
      | "INVALID_PNR_FORMAT"
      | "INVALID_OPERATOR"
      | "SERVER_ERROR";
    message: string;
  };
};
