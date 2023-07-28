import jwt_decode from "jwt-decode";

export function getAccessToken() {
  let accessToken = null;
  let accessClaims = null;
  let UserNameFromToken = null;
  const accessTokenLocal = localStorage.getItem("mercedes-autostarToken");

  if (accessTokenLocal !== null) {
    accessToken = JSON.parse(accessTokenLocal);
    const decoded: any = jwt_decode(accessToken);

    accessClaims =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    UserNameFromToken =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }
  return { accessToken, accessClaims, UserNameFromToken };
}
