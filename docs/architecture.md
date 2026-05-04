# System Architecture

```text
+-----------------------+          +-----------------------+
| Next.js Frontend      |  REST    | Express API           |
| React + Tailwind      +----------> JWT Auth Middleware   |
| Fabric.js Editor      |          | Controllers/Services  |
+-----------+-----------+          +-----------+-----------+
            |                                  |
            | Signed upload URLs               | SQL queries
            v                                  v
+-----------------------+          +-----------------------+
| AWS S3 + CDN          |          | PostgreSQL            |
| uploads/previews/pdf  |          | relational source     |
+-----------------------+          +-----------------------+
            ^                                  |
            | render artifacts                 | queued jobs
            |                                  v
            |                      +-----------------------+
            +----------------------+ Print Renderer        |
                                   | Puppeteer/Node canvas |
                                   | JSON -> 300 DPI PDF   |
                                   +-----------------------+

Payment lifecycle:
Frontend cart -> Backend creates Stripe PaymentIntent -> Stripe webhook confirms
-> order status paid -> print job queued -> admin downloads final files.
```

## Boundaries

- Frontend owns interaction, layout, client preview export, and draft editing.
- Backend owns auth, validation, price calculations, durable design persistence, checkout, and print file generation.
- PostgreSQL owns business data and Fabric JSON configs.
- S3 owns all binary assets: uploaded images, previews, and generated print files.
- Stripe owns card payment and webhook confirmation.

## Scaling Considerations

- Use S3 object keys in the database, never raw binaries.
- Place CDN in front of public previews and template images.
- Lazy-load Fabric editor only on customization routes.
- Move render jobs to a queue worker when volume grows.
- Store immutable design versions for completed orders so later edits do not affect production files.
