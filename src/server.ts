import { createServer, type ServerResponse } from "node:http";
import { URL } from "node:url";
import { passengerRecords } from "./data/passengers.js";
import type { ErrorResponse, SuccessResponse } from "./types.js";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const apiKey = process.env.LEAFYBUS_API_KEY ?? "";
const operatorQueryName = (process.env.OPERATOR_QUERY_NAME ?? "leafybus").toLowerCase();
const pnrPattern = /^[A-Z0-9]{8,20}$/;

function sendJson(
  res: ServerResponse,
  statusCode: number,
  payload: SuccessResponse | ErrorResponse
): void {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function sendError(
  res: ServerResponse,
  statusCode: number,
  code: ErrorResponse["error"]["code"],
  message: string
): void {
  sendJson(res, statusCode, {
    success: false,
    error: {
      code,
      message
    }
  });
}

const server = createServer((req, res) => {
  try {
    if (req.method !== "GET" || !req.url) {
      return sendError(res, 404, "PNR_NOT_FOUND", "Resource not found");
    }

    const requestUrl = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

    if (requestUrl.pathname === "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          service: "LeafyBus Demo API",
          operator_name: "LeafyBus",
          service_mode: "welcome_kit",
          hostname: req.headers.host ?? null,
          endpoints: {
            health: "/health",
            pnr_query: "/pnr/query?pnr=LBKG100001&operator_name=leafybus"
          },
          sample_pnrs: passengerRecords.map((record) => record.pnr)
        })
      );
      return;
    }

    if (requestUrl.pathname === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true }));
      return;
    }

    if (requestUrl.pathname !== "/pnr/query") {
      return sendError(res, 404, "PNR_NOT_FOUND", "Resource not found");
    }

    if (!apiKey) {
      return sendError(res, 500, "SERVER_ERROR", "Server API key is not configured");
    }

    const authorization = req.headers.authorization;
    if (authorization !== `Bearer ${apiKey}`) {
      return sendError(res, 401, "UNAUTHORIZED", "API key invalid or missing");
    }

    const pnr = (requestUrl.searchParams.get("pnr") ?? "").trim().toUpperCase();
    const operatorName = (requestUrl.searchParams.get("operator_name") ?? "").trim().toLowerCase();

    if (!pnrPattern.test(pnr)) {
      return sendError(res, 400, "INVALID_PNR_FORMAT", "PNR format is malformed");
    }

    if (operatorName !== operatorQueryName) {
      return sendError(res, 400, "INVALID_OPERATOR", `operator_name must be ${operatorQueryName}`);
    }

    const record = passengerRecords.find((item) => item.pnr === pnr);

    if (!record) {
      return sendError(res, 404, "PNR_NOT_FOUND", "No booking found for this PNR");
    }

    return sendJson(res, 200, {
      success: true,
      data: {
        pnr: record.pnr,
        passenger_name: record.passengerName,
        seat_number: record.seatNumber,
        scheduled_departure_time: record.scheduledDepartureTime,
        boarding_point: record.boardingPoint,
        destination: record.destination,
        operator_name: "LeafyBus",
        service_mode: "welcome_kit"
      }
    });
  } catch {
    return sendError(res, 500, "SERVER_ERROR", "LeafyBus system encountered an internal error");
  }
});

server.listen(port, () => {
  console.log(`LeafyBus API listening on port ${port}`);
});
