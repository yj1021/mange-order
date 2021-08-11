export interface FormItem {
    type: string;
    name: string;
    label: string;
    [propName: string]: any;
}