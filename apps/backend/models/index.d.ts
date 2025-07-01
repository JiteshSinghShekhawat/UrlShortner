export declare const findLongUrl: (shortId: number) => Promise<(import("mongoose").Document<unknown, {}, {
    longUrl: string;
    shortId?: number | null | undefined;
}, {}> & {
    longUrl: string;
    shortId?: number | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}) | null>;
export declare const insertLongUrl: (longUrl: string) => Promise<import("mongoose").Document<unknown, {}, {
    longUrl: string;
    shortId?: number | null | undefined;
}, {}> & {
    longUrl: string;
    shortId?: number | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
