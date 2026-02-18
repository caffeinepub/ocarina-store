import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface Product {
    title: string;
    imageReference: string;
    description: string;
    price: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createProduct(id: string, title: string, description: string, price: bigint, imageReference: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProduct(id: string): Promise<Product>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listProducts(): Promise<Array<[string, Product]>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProduct(id: string, title: string, description: string, price: bigint, imageReference: string): Promise<void>;
}
