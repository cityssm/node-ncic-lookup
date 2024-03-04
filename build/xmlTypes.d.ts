export interface XsdSimpleType {
    $: {
        name: `${string}CodeSimpleType`;
    };
    annotation: Array<{
        documentation: string[];
    }>;
    restriction: Array<{
        enumeration: Array<{
            $: {
                value: string;
            };
            annotation: Array<{
                documentation: string[];
            }>;
        }>;
    }>;
}
