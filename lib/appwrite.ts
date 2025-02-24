import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  OAuthProvider,
} from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';

export const config = {
  plaform: 'com.anonymous.eventify',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  datatabaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.plaform);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function googleLogin() {
  try {
    const redirectUri = Linking.createURL('/');
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error('Failed to login');

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== 'success') throw new Error('Failed to login');

    const url = new URL(browserResult.url);

    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();

    if (!secret || !userId) throw new Error('Failed to login');

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error('Failed to create a session');

    return true;
  } catch (error) {
    console.error(error);
  }
}

export async function createUser(
  fullName: string,
  email: string,
  password: string
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullName
    );

    if (!newAccount) throw new Error('Failed to create account');

    const avatarUrl = avatar.getInitials(fullName);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.datatabaseId!,
      config.userCollectionId!,
      ID.unique(),
      {
        fullName: fullName,
        email,
        avatar: avatarUrl,
        accountId: newAccount.$id,
      }
    );

    return newUser;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);

      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
  }
}
