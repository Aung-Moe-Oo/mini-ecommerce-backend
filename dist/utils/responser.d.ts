type responseInterface<T> = {
    statusCode: number;
    message: string;
    devMessage: string;
    body: T;
};
declare const Responser: ({ statusCode, message, devMessage, body, }: responseInterface<any>) => {
    meta: {
        success: boolean;
        message: string;
        devMessage: string;
    };
    body: any;
};
export default Responser;
