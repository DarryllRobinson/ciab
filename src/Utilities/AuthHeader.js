export function AuthHeader() {
  // return authorisation header with basic auth credentials
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.authdata) {
    return { 'Authorization': 'Basic ' + user.authdata };
  } else {
    return {};
  }
}
