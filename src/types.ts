export type PassengerRecord = {
  pnr: string;
  passengerName: string;
  mobileNumber: string;
  pnrStatus: "active" | "expired" | "cancelled" | "completed";
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
    mobile_number: string;
    pnr_status: "active" | "expired" | "cancelled" | "completed";
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
