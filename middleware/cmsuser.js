export default function ({ $auth, redirect }) {
  if (!$auth.user || ($auth.user.role_id != 1 && $auth.user.role_id != 2))
    return redirect('/');
}
