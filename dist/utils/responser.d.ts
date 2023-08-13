type responseInterface<T> = {
    statusCode: number;
    message: string;
    devMessage: string;
    body: T;
};
export declare const Responser: ({ statusCode, message, devMessage, body, }: responseInterface<any>) => {
    meta: {
        success: boolean;
        message: string;
        devMessage: string;
    };
    body: any;
};
export {};
