export declare const hashPassword: (plain: string) => Promise<string>;
export declare const isMatch: (plain: string, hash: string) => Promise<boolean>;
export declare const generateRecoveryToken: () => Promise<{
    plain: string;
    hash: string;
}>;
