# Project Notes / README

## Project Structure

* **Pages**:

  * `src/app/page.tsx` → Home page
  * `src/app/Dashboard/page.tsx` → Dashboard / component entry page
  * `src/app/login/page.tsx` → Login page

* **Hooks**:

  * `src/hooks/useUser.ts` → Custom hook to manage authentication state

* **Supabase Client**:

  * `src/lib/supabaseClient.ts` → Supabase client setup

---

## Authentication

### `useUser` Hook

* Manages authentication state (`user`) and exposes a setter `setUser`.
* Returns:

  * `user`:

    * `undefined` → authentication is loading (checking session)
    * `null` → no user logged in
    * `User object` → authenticated user
  * `setUser` → allows updating user state
* Automatically listens to authentication state changes using `supabase.auth.onAuthStateChange`.
* Cleans up listener on component unmount.

**Usage Example:**

```ts
const { user, setUser } = useUser();

if (user === undefined) {
  return <p>Loading...</p>;
}

if (user === null) {
  // redirect or show login link
}
```

---

## Login Page

* GitHub OAuth login using Supabase:

```ts
await supabase.auth.signInWithOAuth({ provider: "github" });
```

* Button triggers login flow.
* Redirect URI must match one registered in Supabase GitHub OAuth settings.
* Styling example:

```tsx
<button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded">
  Sign in with GitHub
</button>
```

---

## Home Page (`page.tsx`)

* Displays:

  * Logged-in user info
  * Login / Logout button depending on `user` state
  * List of components from Supabase table `components`

* Logout functionality:

```ts
const handleLogout = async () => {
  await supabase.auth.signOut();
  setUser(null);
}
```

* Fetching table data:

```ts
const { data, error } = await supabase.from("components").select("*");
if (error) console.error(error);
else setRows(data || []);
```

---

## Dashboard Page (`Dashboard/page.tsx`)

* Only accessible to logged-in users.
* If `user === null` → redirect to `/login`
* If `user === undefined` → show loading
* Form for adding new components:

  * Controlled inputs using `useState`
  * `handleChange` updates state
  * `handleSubmit` inserts data into Supabase table

**Form Data Handling:**

```ts
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: name === "quantity" ? Number(value) : value
  }));
}
```

**Submit Example:**

```ts
const { error } = await supabase.from("components").insert([formData]);
if (!error) setFormData({ name: "", category: "", description: "", image_url: "", quantity: 0 });
```

---

## React / TypeScript Notes

* **State**: `useState` for dynamic values

* **Effects**: `useEffect` to run code on component lifecycle

* **Conditional Rendering**:

  * `user` state determines what to show (login/logout, loading, protected content)

* **JSX**:

  * `{}` used for embedding JavaScript expressions
  * `Link` for client-side navigation:

    ```tsx
    <Link href="/login">Login</Link>
    ```

* **Typescript Typing**:

```ts
type ComponentRow = {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  image_url: string | null;
  quantity: number;
}
```

* **Supabase Queries**:

```ts
const { data, error } = await supabase.from("components").select("*");
```

* **Error Handling**:

```ts
if (error) console.error(error);
```

---

## Notes on Flow

1. **Login** → User clicks GitHub button → Supabase OAuth → redirect → session stored → `useUser` updates `user`.
2. **Home Page** → Shows login/logout and component list.
3. **Dashboard** → Protected route → form submission adds components.
4. **Logout** → Supabase signs out → `setUser(null)` → state cleared.

