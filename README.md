# LeafyBus Demo

Node.js + TypeScript implementation of API 1 from the YatriYum integration guide.

## Implemented API

`GET /pnr/query?pnr={PNR_NUMBER}&operator_name=leafybus`

Headers:

```text
Authorization: Bearer {LEAFYBUS_API_KEY}
```

Example:

```bash
curl --request GET \
  --url "http://localhost:3000/pnr/query?pnr=LBKG100001&operator_name=leafybus" \
  --header "Authorization: Bearer replace-with-a-strong-api-key"
```

## Local Run

```bash
cp .env.example .env
npm install
npm run build
npm start
```

## Docker Run

```bash
cp .env.example .env
docker compose up --build -d
```

## Seeded Dummy PNRs

The service includes 10 seeded dummy PNR records. All have `boarding_point` set to `Kashmere Gate, Delhi` and `service_mode` fixed to `welcome_kit`.

Valid sample PNRs:

`LBKG100001`, `LBKG100002`, `LBKG100003`, `LBKG100004`, `LBKG100005`, `LBKG100006`, `LBKG100007`, `LBKG100008`, `LBKG100009`, `LBKG100010`
