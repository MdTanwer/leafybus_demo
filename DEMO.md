# LeafyBus Demo Exposure

This project is exposed through:

- App container: `127.0.0.1:3001 -> container:3000`
- Public hostname: `leafybus.yatriyum.com`
- Reverse proxy: host-level Caddy

Quick checks:

```bash
curl https://leafybus.yatriyum.com/
curl "https://leafybus.yatriyum.com/pnr/query?pnr=LBKG100001&operator_name=leafybus" \
  -H "Authorization: Bearer leafybus-demo-secret"
```
