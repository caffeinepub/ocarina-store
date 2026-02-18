# Specification

## Summary
**Goal:** Provide an admin-only dashboard to create and edit store products, with authorization enforced in both backend and frontend.

**Planned changes:**
- Add backend admin authorization using an allowlist of principals; reject non-admin calls to admin-only methods with clear errors.
- Implement a persistent Product data model and admin-only backend methods to create products and update products by id (title, description, price, image references), including a not-found error for missing ids.
- Build an Admin Dashboard UI with a consistent Tailwind theme (not primarily blue/purple) to: view product list, add a product, and edit a product with pre-filled values and basic form validation.
- Add routing and navigation so only admins see an “Admin” entry and can access admin routes; non-admins see an English “Access denied” state when visiting admin pages directly.

**User-visible outcome:** Admin users can open an Admin Dashboard from the app, view products, add new products, and edit existing products; non-admin users cannot access admin tools and will see an access-denied message on admin routes.
