export interface OptionItem {
    value: string;
    label: string;
}

export interface FormItem {
    type: string;
    name: string;
    label: string;
    optionList?: OptionItem[];
    [propName: string]: any;
}