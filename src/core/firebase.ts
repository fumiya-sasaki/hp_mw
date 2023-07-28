import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { Auth, NextOrObserver, Unsubscribe, User, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import 'firebase/firestore';
import {
  CollectionReference, DocumentData, DocumentReference, Firestore, OrderByDirection,
  Query, QueryConstraint, QueryLimitConstraint, QueryOrderByConstraint, QuerySnapshot,
  QueryStartAtConstraint, Timestamp, collection, doc, getDoc, getDocs, getFirestore,
  limit, orderBy, query, setDoc, startAfter
} from 'firebase/firestore';
import 'firebase/storage';
import {
  FirebaseStorage, StorageReference, UploadResult, getDownloadURL,
  getStorage, ref, uploadBytes
} from 'firebase/storage';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export namespace FireBase {
  const db: Firestore = getFirestore(app);
  const storage: FirebaseStorage = getStorage(app);
  const auth: Auth = getAuth(app);

  export type QuerySnapshotType = QuerySnapshot<DocumentData>;
  export type StorageReferenceType = StorageReference;
  export type DocumentDataType = DocumentData;
  export type UnsubscribeType = Unsubscribe;
  export type UserType = User;

  export const setCollection = (collectionName: string):
    CollectionReference<DocumentData> => collection(db, collectionName);

  export const setOrderBy = (field: string, direction?: OrderByDirection):
    QueryOrderByConstraint => orderBy(field, direction);

  export const setStartAfter = (startPoint: any):
    QueryStartAtConstraint => startAfter(startPoint);

  export const setLimit = (limitPoint: number):
    QueryLimitConstraint => limit(limitPoint);

  const getQueryData = (queryData: Query, ...queryConstraints: QueryConstraint[]):
    Query<DocumentData> => query(queryData, ...queryConstraints);

  export const getQuerySnapshot = async (queryData: Query, ...queryConstraints: QueryConstraint[]):
    Promise<QuerySnapshot<DocumentData>> => await getDocs(query(queryData, ...queryConstraints));

  export const getDocumentReference = (collectionName: string, uid: string):
    DocumentReference<DocumentData> => doc(db, collectionName, uid);

  export const getDocumentSnapshot = async (collectionName: string, uid: string) =>
    await getDoc(getDocumentReference(collectionName, uid))

  export const setDocumentData = async (documentReference: DocumentReference<DocumentData>, setData: any) =>
    await setDoc(documentReference, setData);

  export const getStorageReference = (path: string): StorageReference => ref(storage, path);

  export const uploadImage = async (storageRef: StorageReference, image: Blob | Uint8Array | ArrayBuffer):
    Promise<UploadResult> => await uploadBytes(storageRef, image);

  export const getStorageImageUrl = (storageRef: StorageReference):
    Promise<string> => getDownloadURL(storageRef).then((url) => url);

  export const convertTofromMillis = (millsecond: number) => Timestamp.fromMillis(millsecond);

  export const signInEmail = async (email: string, password: string) =>
    await signInWithEmailAndPassword(auth, email, password);

  export const getCurrentUser = (nextOrObserver: NextOrObserver<User>) => onAuthStateChanged(auth, nextOrObserver);

  export const signOutAuth = async () => await signOut(auth);
};