/**
 * The user session of the current authenticated user
 */
export interface UserSession {
   /**
    * The session ID
    */
   sessionId: string;
   /**
    * The user ID of the `User` record stored in the database
    */
   userId: string;
   /**
    * The email address of the user used for authentication
    */
   email: string;
   /**
    * The full name of the user
    */
   userName: string;

   /**
    * Whether the user is a system administrator
    */
   systemAdmin: boolean;
}
