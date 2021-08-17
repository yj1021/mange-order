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

export interface ColumnsType {
    title: string;
    dataIndex: string;
    key: string;
    [propName: string]: any;
}

export interface DataType {
    key: string;
    [propName: string]:any;
}