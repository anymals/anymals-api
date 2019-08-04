// tslint:disable
// graphql typescript definitions

export declare namespace GQL {
    export interface IGraphQLResponseRoot {
        data?: IQuery | IMutation;
        errors?: Array<IGraphQLResponseError>;
    }

    export interface IGraphQLResponseError {
        /** Required for all errors */
        message: string;
        locations?: Array<IGraphQLResponseErrorLocation>;

        /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
        [propName: string]: any;
    }

    export interface IGraphQLResponseErrorLocation {
        line: number;
        column: number;
    }

    export interface IQuery {
        __typename: "Query";
        hello: string;
    }

    export interface IHelloOnQueryArguments {
        name?: string | null;
    }

    export interface IMutation {
        __typename: "Mutation";
        register: boolean | null;
    }

    export interface IRegisterOnMutationArguments {
        email: string;
        password: string;
    }
}

// tslint:enable
