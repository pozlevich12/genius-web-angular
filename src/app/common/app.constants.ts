export class AppConstants {
  static API_BASE_URL = "http://localhost:8080/";
  static OAUTH2_URL = AppConstants.API_BASE_URL + "oauth2/authorization/";
  static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + "google";
  static GITHUB_AUTH_URL = AppConstants.OAUTH2_URL + "github";
  static AZURE_AUTH_URL = AppConstants.OAUTH2_URL + "azure";
}
