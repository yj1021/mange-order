import React, { ReactElement, useState, useEffect, HTMLAttributes, FC } from 'react'
import FilterSearch from './components/FilterSearch'
import Table from '@/component/Table'
import { Switch, Space, Button, Form, InputNumber, Input } from 'antd'
import { ColumnsType, DataType } from '@/type'
import DelBtn from '@/component/DelBtn'
import { EditFilled, PlusOutlined } from '@ant-design/icons'

interface Props {

}

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: any;
    index: number;
    children: React.ReactNode;
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}: EditableCellProps): ReactElement => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default function ShopCategory({ }: Props): ReactElement {
    const [form] = Form.useForm()

    const [tabelData, setTableData] = useState({
        data: [],
        pageConfig: {
            total: 20,
            current: 1,
            pageSize: 10,
        },
        loading: false,
    })
    const [params, setParams] = useState<any>({})
    const [editingKey, setEditingKey] = useState<string>('');
    const isEditing = (record: any) => record.key === editingKey;

    const startSearch = (params: any) => {
        setParams(params)
        console.log(params)
    }

    const resetFn = () => {

    }

    const getData = (current: number, pageSize: number, params?: any) => {
        let list: any[] = []
        setTableData(pre => ({ ...pre, loading: true }))
        setTimeout(() => {
            for (let i = 0; i < pageSize; i++) {
                list.push({
                    key: i + '' + current,
                    catagoryName: '分类' + current,
                    status: Math.random() > 0.5 ? true : false
                })
            }
            setTableData({
                data: list,
                pageConfig: {
                    total: 100,
                    current,
                    pageSize
                },
                loading: false
            })
        }, 1000);

    }

    useEffect(() => {
        getData(1, 10)
    }, [])
    const changePage = (current, pageSize) => {
        getData(current, pageSize, params)
    }

    const changeStatus = (key, status) => {
        console.log(key)
        setTableData((data: any) => {
            let newData = { ...data }
            newData.data.forEach(item => {
                if (item.key === key) {
                    item.status = !status
                }
            })
            return newData
        })
    }

    const confirm = () => {
        //@ts-ignore
    }

    const save = async ({key}) => {
        const row = await form.validateFields()
        const newData = [...tabelData.data];
        const index = newData.findIndex(item => key === item.key);
        if(index > -1) {
            newData.splice(index, 1, {...newData[index], ...row})
            setTableData(data => {
                let tableData = {...data}
                tableData.data = newData
                return tableData
            })
            setEditingKey('')
        }
    }

    const cacel = () => {
        setEditingKey('')
    }

    const edit = (record: any) => {
        form.setFieldsValue({ ...record })
        setEditingKey(record.key)
    }

    const columns: ColumnsType[] = [
        {
            key: 'a',
            title: '序号',
            dataIndex: 'index',
            align: 'center',
            render: (text, record, index) => {
                let { current, pageSize } = tabelData.pageConfig
                return <div>{index + 1 + (current - 1) * pageSize}</div>
                console.log(record, index)
            }
        },
        {
            key: 'b',
            title: '分类名称',
            dataIndex: 'catagoryName',
            align: 'center',
            editable: true
        },
        {
            key: 'c',
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            render: (text, record) => {
                const editable = isEditing(record)
                let { status, key } = record
                return <Switch checked={status} disabled={!editable} onChange={() => changeStatus(key, status)} />
            }
        },
        {
            key: 'd',
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            render: (text, record, index): ReactElement => {
                const editable = isEditing(record)
                return (
                    <div>
                        {editable ? <Space>
                            <Button type="primary" onClick={() => save(record)}>保存</Button>
                            <DelBtn text="确定取消编辑吗？" confirm={cacel} type='cacel'/>
                        </Space> : <Space>
                            <Button type="link" shape="circle" block icon={<EditFilled />} onClick={() => edit(record)} />
                            <DelBtn text="确定删除商品分类吗？" confirm={confirm} />    
                        </Space>}
                    </div>
                )
            }
        },
    ]

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: any) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <div>
            <FilterSearch startSearch={startSearch} resetFn={resetFn} />
            <Form form={form} component={false}>
                <Table
                    //@ts-ignore
                    EditableCell={EditableCell}
                    columns={mergedColumns}
                    data={tabelData.data}
                    loading={tabelData.loading}
                    pageConfig={tabelData.pageConfig}
                    changePage={changePage}
                />
            </Form>

        </div>
    )
}
